import Notiflix from 'notiflix';

//Находим элементы form, input, textarea, button
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

btnDisable();

function onFormSubmit(evt) {
  evt.preventDefault();
  const STARTDELAY = +inputDelayEl.value;
  const STEP = +inputStepEl.value;
  const AMOUNT = +inputAmountEl.value;

  for (let i = 0; i < AMOUNT; i += 1) {
    const currentPosition = i+1;
    const currentDelay = STARTDELAY + i * STEP;
    
    createPromise(currentPosition, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`,
          {
            timeout: 15000,
          },);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay} ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`,
          {
            timeout: 15000,
          },);
      });
  };

  evt.currentTarget.reset();
  btnDisable();
};

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

function onInputChange(evt) {
  if (!+evt.currentTarget.value || !Number.isInteger(+evt.currentTarget.value)) {
    Notiflix.Report.warning('ВНИМАНИЕ!', 'Введите целое число не меньше 0!', 'Ok');
    evt.currentTarget.value = "";
    btnDisable();
  } else { btnDisable(); };
    
};

function btnDisable() {
    btnEl.disabled = inputDelayEl.value === "" || inputStepEl.value === "" || inputAmountEl.value === "";
};
