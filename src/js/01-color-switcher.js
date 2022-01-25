// Находим элементы button[data-start], button[data-stop], body
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

// Добавляем слушателя события 'click' на btnStartEl, кот. вызывает колбек ф-цию onBtnStartClick
btnStartEl.addEventListener('click', onBtnStartClick);
// Добавляем слушателя события 'click' на btnStopEl, кот. вызывает колбек ф-цию onBtnStopClick
btnStopEl.addEventListener('click', onBtnStopClick);

// Идентификатор интервала таймера
let timerId;

// Ф-ция для генерации случайного цвета (из условия задачи)
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Ф-ция:
//    1) вызывает метод setInterval(callback, interval) - вызывает ф-цию callback с интервалом interval (callback - присваивает значение-результат getRandomHexColor(),  на backgroundColor элемента bodyEl )
//    2) Выключает кнопку Start и включает кнопку Stop
function onBtnStartClick(event) {
    timerId = setInterval(() => {bodyEl.style.backgroundColor = getRandomHexColor();}, 1000);
    btnStartEl.disabled = true;
    btnStopEl.disabled = false;
};

// Ф-ция:
//    1) отменяет вызов callback внутри интервала (метод clearInterval(timerId))
//    2) Выключает кнопку Stop и включает кнопку Start
function onBtnStopClick(evt) {
    clearInterval(timerId);
    btnStartEl.disabled = false;
    btnStopEl.disabled = true;
};
