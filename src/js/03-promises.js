import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let getEl = selector => document.querySelector(selector);

getEl('.form').addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
  event.preventDefault();
  const count = Number(event.currentTarget.amount.value)
  const delayEl = Number(event.currentTarget.delay.value)
  const step = Number(event.currentTarget.step.value)
  
  for (let i = 0; i < count; i += 1) {
    let position = i+1;
    let delay = delayEl + i * step;
        
    createPromise(position, delay)
      .then(onSuccess)
      .catch(onError);       
  }
}

function onSuccess(result, position, delay) {
      Notiflix.Notify.success(result);
  // console.log(result)
  }

function onError(error, position, delay) {
     Notiflix.Notify.failure(error);
  // console.log(error)
  }

function createPromise(position, delay) {
    
  return new Promise((resolve, reject) => {

   const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
     
   if (shouldResolve) {
     resolve(`✅ Fulfilled promise ${position} in ${delay}ms`)
  } else {
    reject(`❌ Rejected promise ${position} in ${delay}ms`)
  }
}, delay)
  }) 
 
}



