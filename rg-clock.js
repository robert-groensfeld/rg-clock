define(["./node_modules/@polymer/polymer/polymer-element.js"], function (_polymerElement) {
  "use strict";

  /**
   * `rg-clock`
   * An analog clock.
   *
   * @customElement
   * @polymer
   * @demo demo/index.html
   */
  class RgClock extends _polymerElement.PolymerElement {
    static get template() {
      const date = new Date();
      return _polymerElement.html`
      <style>
        :host {
          display: block;
        }

        .clock {
          /* Centers clock. */
          display: block;
          margin-left: auto;
          margin-right: auto;
          
          /** Border around the clock face. */
          border: var(--border, 4px solid black);
          border-radius: 50%;

          /** Backround color of the clock face. */
          background-color: var(--bg-color, white);
          
          /** Image containing the clock face. */
          background-image: var(--bg-img, none);
          background-repeat: no-repeat;
          background-position: center;
          background-size: 88%;
          
          position: relative;

          /** Clock size. */
          width: var(--size, 20em);
          height: var(--size, 20em);
        }

        .clock:after {
          /* Draw a dot in the middle of the clock face. */
          background: var(--dot-color, black);
          border-radius: 50%;
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 5%;
          height: 5%;
          z-index: 10;
        }

        .minutes-container, .hours-container, .seconds-container {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .pointer {
          /* Round the edges of the pointers. */
          border-top-left-radius: 50%;
          border-top-right-radius: 50%;
          border-bottom-left-radius: 30%;
          border-bottom-right-radius: 30%;
        }

        .hours {
          /** Color of the hours pointer. */
          background: var(--hrs-color, black);
          height: 20%;
          left: 48.75%;
          position: absolute;
          top: 30%;
          transform-origin: 50% 100%;
          width: 2.5%;
          border-radius: 40%
        }

        .minutes {
          /** Color of the minutes pointer. */
          background: var(--min-color, black);
          height: 40%;
          left: 49%;
          position: absolute;
          top: 10%;
          transform-origin: 50% 100%;
          width: 2%;
        }

        .seconds {
          /** Color of the seconds pointer. */
          background: var(--sec-color, black);
          height: 45%;
          left: 49.5%;
          position: absolute;
          top: 14%;
          transform-origin: 50% 80%;
          width: 1%;
          z-index: 8;
        }

        @keyframes rotate {
          100% {
            transform: rotateZ(360deg);
          }
        }

        .hours-container {
          animation: rotate 43200s infinite linear;
        }
        .minutes-container {
          animation: rotate 3600s infinite linear;
        }
        .seconds-container {
          animation: rotate 60s infinite linear;
        }

      </style>
      
      <div class="clock">
        <div class="hours-container">
          <div class="hours pointer"
               style$="transform: rotateZ([[_hourAngle]]deg);"></div>
        </div>

        <div class="minutes-container">
          <div class="minutes pointer" 
               style$="transform: rotateZ([[_minuteAngle]]deg);">
          </div>
        </div>

        <template is="dom-if" if="[[!noSeconds]]">
          <div class="seconds-container">
            <div class="seconds"
                style$="transform: rotateZ([[_secondAngle]]deg);">
            </div>
          </div>
        </template>
      </div>
    `;
    }

    static get properties() {
      return {
        /** Time on the clock. Format: "15:03:42". */
        time: String,

        /** Time on the clock. */
        _time: {
          type: Date,
          value: new Date(),
          computed: "_parseTime(time)"
        },

        /** Do not display the seconds pointer. */
        noSeconds: {
          type: Boolean,
          value: false
        },

        /** Angle of the hour pointer. */
        _hourAngle: {
          type: Number,
          computed: '_getHourAngle(_time)'
        },

        /** Angle of the minute pointer. */
        _minuteAngle: {
          type: Number,
          computed: '_getMinuteAngle(_time)'
        },

        /** Angle of the seconds pointer. */
        _secondAngle: {
          type: Number,
          computed: '_getSecondAngle(_time)'
        }
      };
    }
    /** Gets the angle of the hour pointer for the given time. */


    _getHourAngle(time) {
      const degreesPerHour = 360 / 12;
      const degreesPerMinute = degreesPerHour / 60;
      const hours = time.getHours();
      const minutes = time.getMinutes();
      return hours * degreesPerHour + minutes * degreesPerMinute;
    }
    /** Gets the angle of the minute pointer for the given time. */


    _getMinuteAngle(time) {
      const degreesPerMinute = 360 / 60;
      return degreesPerMinute * time.getMinutes();
    }
    /** Gets the angle of the seconds pointer for the given time. */


    _getSecondAngle(time) {
      const degreesPerSecond = 360 / 60;
      return degreesPerSecond * time.getSeconds();
    }
    /** Converts a time string to a Date. */


    _parseTime(time) {
      const date = new Date();
      const [hours, minutes, seconds] = time.split(':');
      date.setHours(hours, minutes, seconds);
      return date;
    }

  }

  window.customElements.define('rg-clock', RgClock);
});