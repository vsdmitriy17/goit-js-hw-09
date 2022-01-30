// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button[data-start]');
const spanDaysEl = document.querySelector('span[data-days]');
const spanHoursEl = document.querySelector('span[data-hours]');
const spanMinutesEl = document.querySelector('span[data-minutes]');
const spanSecondsEl = document.querySelector('span[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        const nowDate = Date.now();
        if (selectedDates[0] <= nowDate) {
            return alert("Please choose a date in the future");
        };
        buttonEl.disabled = false;
        return eventDate = selectedDates[0];
    },
};

let eventDate;
buttonEl.disabled = true;

inputEl.addEventListener('focus', onInputChange);
buttonEl.addEventListener('click', onButtonClick);

function onInputChange(evt) {
    flatpickr(inputEl, options);
};

function onButtonClick(evt) {
    setInterval(timeCount, 1000);
    buttonEl.disabled = true;
};

function timeCount() {
    const currentDate = Date.now();
    spanChange(convertMs(eventDate - currentDate));
};

function spanChange({ days, hours, minutes, seconds }) {
    spanDaysEl.textContent = `${days}`;
    spanHoursEl.textContent = `${hours}`;
    spanMinutesEl.textContent = `${minutes}`;
    spanSecondsEl.textContent = `${seconds}`;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};