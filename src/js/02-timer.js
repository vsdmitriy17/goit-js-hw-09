// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

// Выбираем елементы input, button, span [data-days], span [data-hours], span [data-minutes], span [data-seconds]
const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button[data-start]');
const spanDaysEl = document.querySelector('span[data-days]');
const spanHoursEl = document.querySelector('span[data-hours]');
const spanMinutesEl = document.querySelector('span[data-minutes]');
const spanSecondsEl = document.querySelector('span[data-seconds]');

// Объект параметров (из ТЗ)
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {  // Проверяет является ли выбранная дата - позднее чем текущая
        console.log(selectedDates[0]);
        const nowDate = Date.now();
        if (selectedDates[0] <= nowDate) {
            return alert("Please choose a date in the future");
        };
        buttonEl.disabled = false; 
        return eventDate = selectedDates[0];
    },
};

let eventDate; // выбранная дата
let timerId; 
buttonEl.disabled = true;

// Ставим слушателей событий на элементы inputEl и buttonEl
inputEl.addEventListener('focus', onInputChange);
buttonEl.addEventListener('click', onButtonClick);

// Колбек ф-ция на событие "focus", элмента inputEl:
//    - инициализирует библиотеку flatpickr с параметрами options
function onInputChange(evt) {
    flatpickr(inputEl, options);
};

// Колбек ф-ция на событие "click", элмента buttonEl:
//   1) устанавливает интервал вызова колбек ф-ции "timeCount", каждые 1000 мс
//   2) выключает кнопку
function onButtonClick(evt) {
    timerId = setInterval(timeCount, 1000);
    buttonEl.disabled = true;
};

// Ф-ция:
//   если выбранная дата, больше текущей - возвращает результат выполнения ф-ции "spanChange" на объекте расчетных данных (результат ф-ции "convertMs");
//   иначе - удаляет интервал 
function timeCount() {
    const currentDate = Date.now();
    if (eventDate > currentDate) {
        return spanChange(convertMs(eventDate - currentDate));
    };

    clearInterval(timerId);
};

// Ф-ция принимает объект данных { days, hours, minutes, seconds } и присваивает соотв. значения свойствам textContent, соотв. элементов span 
function spanChange({ days, hours, minutes, seconds }) {
    spanDaysEl.textContent = `${days}`;
    spanHoursEl.textContent = `${hours}`;
    spanMinutesEl.textContent = `${minutes}`;
    spanSecondsEl.textContent = `${seconds}`;
};

// Ф-ция (из ТЗ) конвертирует Unix время, возвращает объект { days, hours, minutes, seconds }, в котором значение свойств - строки из двух символов
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
};

// Ф-ция принимает параметр value (время), возвращает строку из двух символов
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};