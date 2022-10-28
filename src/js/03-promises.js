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

function onSuccess({position, delay}) {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
  }

function onError({position, delay}) {
     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  // console.log(`❌ Rejected promise ${position} in ${delay}ms`)
  }

function createPromise(position, delay) {
    
  return new Promise((resolve, reject) => {

   const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
     
   if (shouldResolve) {
     resolve({position, delay})
  } else {
    reject({position, delay})
  }
}, delay)
  }) 
 
}




