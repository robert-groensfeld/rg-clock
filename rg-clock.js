import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `rg-clock`
 * An analog clock.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class RgClock extends PolymerElement {
  static get template() {
    const date = new Date();
    return html`
      <style>
        :host {
          display: block;
        }

        .clock {
          /* Center clock */
          display: block;
          margin-left: auto;
          margin-right: auto;

          border: 4px solid black;
          border-radius: 50%;
          background: #fff url(https://cssanimation.rocks/images/posts/clocks/ios_clock.svg) no-repeat center;
          background-size: 88%;
          height: 20em;
          position: relative;
          width: 20em;
        }

        .clock:after {
          background: #000;
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
          background: #000;
          height: 20%;
          left: 48.75%;
          position: absolute;
          top: 30%;
          transform-origin: 50% 100%;
          width: 2.5%;
          border-radius: 40%
        }

        .minutes {
          background: #000;
          height: 40%;
          left: 49%;
          position: absolute;
          top: 10%;
          transform-origin: 50% 100%;
          width: 2%;
        }

        .seconds {
          background: #000;
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

<<<<<<< HEAD
        <div class="seconds-container">
          <div class="seconds pointer"
               style$="transform: rotateZ([[_secondAngle]]deg);">
=======
        <template is="dom-if" if="[[!noSeconds]]">
          <div class="seconds-container">
            <div class="seconds"
                style$="transform: rotateZ([[_secondAngle]]deg);">
            </div>
>>>>>>> Allow removing the seconds pointer
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
        computed: "_parseTime(time)",
      },

      /** Do not display the seconds pointer. */
      noSeconds: {
        type: Boolean,
        value: false,
      },

      /** Angle of the hour pointer. */
      _hourAngle: {
        type: Number,
        computed: '_getHourAngle(_time)',
      },

      /** Angle of the minute pointer. */
      _minuteAngle: {
        type: Number,
        computed: '_getMinuteAngle(_time)',
      },

      /** Angle of the seconds pointer. */
      _secondAngle: {
        type: Number,
        computed: '_getSecondAngle(_time)',
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
