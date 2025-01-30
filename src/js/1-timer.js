// icon: '<svg class="icon" width="24" height="24"><use xlink:href="./img/symbol-defs.svg#icon-cross"></use></svg>',
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timer = {
    startButton: document.querySelector('button'),
    input: document.querySelector('#datetime-picker'),
    userSelectedDate: null,
    intervalId: null,
    elements: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
        },

    init() {
        this.startButton.disabled = true;
        this.startButton.addEventListener('click', () => this.start());
        flatpickr("#datetime-picker", this.options);
    },
    
    start() {
        this.startButton.disabled = true;
        this.input.disabled = true;
        this.intervalId = setInterval(() => {
            const diff = this.userSelectedDate - Date.now();
            const timeComponents = this.convertMs(diff);

            if (diff <= 0) {
                this.stop();

                return;
            }

            this.elements.days.textContent = this.pad(timeComponents.days);
            this.elements.hours.textContent = this.pad(timeComponents.hours);
            this.elements.minutes.textContent = this.pad(timeComponents.minutes);
            this.elements.seconds.textContent = this.pad(timeComponents.seconds);
        }, 1000);
    },
    
    stop() {
        this.startButton.disabled = false;
        this.input.disabled = false;
        clearInterval(this.intervalId);
    },
    
convertMs(diff) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(diff / day);
  
  const hours = Math.floor((diff % day) / hour);
  
  const minutes = Math.floor(((diff % day) % hour) / minute);
  
  const seconds = Math.floor((((diff % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
    },

     options: {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
         minuteIncrement: 1,
        
        onClose(selectedDates) {
            if (selectedDates[0] <= new Date()) {
                iziToast.show({
                    // iconUrl: './src/img/icon-cross.svg#icon-cross', // Use a separate SVG file
                    title: '',
                    backgroundColor: 'red',
                    messageColor: 'white',
                    position: 'topRight',
                    message: `<div id="message"><svg class="icon" width="24" height="24" style="margin-right: 10px"><use xlink:href="./img/symbol-defs.svg#icon-cross"></use></svg> Please choose a date in the future</div>`
});
                timer.startButton.disabled = true;
                timer.userSelectedDate = null;
            } else {
                timer.userSelectedDate = selectedDates[0];
                timer.startButton.disabled = false;
            };
        },
    },
    
    pad(value) {
        return String(value).padStart(2, '0');
    },
};

timer.init();