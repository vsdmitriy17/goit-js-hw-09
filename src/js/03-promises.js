//Подключение библиотеки Notiflix
import Notiflix from 'notiflix';

//Находим элементы form, input, button
const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');
const btnEl = document.querySelector('button');

//Слушатели событий
formEl.addEventListener('submit', onFormSubmit);
inputDelayEl.addEventListener('input', onInputChange);
inputStepEl.addEventListener('input', onInputChange);
inputAmountEl.addEventListener('input', onInputChange);

// Отключает кнопку
btnDisable();

//Ф-ция:
//    1) отменяет действия браузера по умолчанию (отменяет перезагрузку)
//    2) создает amount промисов, каждый из -которых имеет отсрочку вызова ф-ции startdelay, которая увеличивается на step, для каждого следующего промиса
//      - метод then(callback) - вызывает callback(выводит соотв. сообщение на екран и в консоль), если промис Fulfilled
//      - метод catch(callback) - вызывает callback(выводит соотв. сообщение на екран и в консоль), если промис Rejected
//    3) очищает все поля формы
//    4) отключает кнопку
function onFormSubmit(evt) {
  evt.preventDefault();
  const startdelay = +inputDelayEl.value; // перваяотсрочка вызова ф-ции
  const step = +inputStepEl.value; // шаг изменения отсрочки
  const amount = +inputAmountEl.value; // кол-во создаваемых промисов

  for (let i = 0; i < amount; i += 1) {
    const currentPosition = i+1; // текущая позиция промиса (номер промиса)
    const currentDelay = startdelay + i * step; // текущая отсрочка вызова ф-ции
    
    createPromise(currentPosition, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`,
          {
            timeout: 8000,
          },);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay} ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`,
          {
            timeout: 8000,
          },);
      });
  };

  evt.currentTarget.reset();
  btnDisable();
};

// Ф-ция принимает аргументы position, delay:
//  1) создает промис в кот по условию выполнения ф - ции shouldResolve, отложенно, с отсрочкой delay
//     - вызывает метод resolve(кот.возвращает { position, delay }) - если промис Fulfilled
//     - вызывает метод reject(кот.возвращает { position, delay }) - если промис Rejected
//  2) возвращает промис
function createPromise(position, delay) {
  const promises = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      };
    }, delay);
  });
  return promises;
};

// Ф-ция проверяет введенные данные в input - являются ли они целым числом
//    - если нет - выводят на экран предупреждение "ВНИМАНИЕ! Введите целое число не меньше 0!", очищают поле input и выключает кнопку
//    - если да - включает кнопку
function onInputChange(evt) {
  if (!+evt.currentTarget.value || !Number.isInteger(+evt.currentTarget.value)) {
    Notiflix.Report.warning('ВНИМАНИЕ!', 'Введите целое число не меньше 0!', 'Ok');
    evt.currentTarget.value = "";
    btnDisable();
  } else { btnDisable(); };
    
};

// Ф-ция проверяет заполнение полей формы, если все поля заполнены - кнопка активна, если хотя бы одно поле пусто - кнопка неактивна
function btnDisable() {
    btnEl.disabled = inputDelayEl.value === "" || inputStepEl.value === "" || inputAmountEl.value === "";
};
