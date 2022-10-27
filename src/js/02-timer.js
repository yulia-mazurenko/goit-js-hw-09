import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]')
};

refs.startBtn.disabled = true;

class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.onTick = onTick;
    this.calendar = null;

   this.init();
  }

  init() {
  const calendar = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
            
    const currentTime = Date.now();
    const referenceTime = selectedDates[0].getTime();
    
      if (currentTime > referenceTime) {
        Notify.failure('Please choose a date in the future');
        // window.alert("Please choose a date in the future");
    } else refs.startBtn.disabled = false;
    
     },
  })
        
  }  
  
  start() {
      
    refs.startBtn.disabled = true;
    const referenceTime = Date.parse(refs.input.value)
   
    const intervalId = setInterval(() => { 
    
    const currentTime = Date.now();   
    const deltaTime = referenceTime - currentTime;
       
    if (deltaTime < 0) {
      this.stop(intervalId);
      refs.startBtn.disabled = false;
      return;
    };

    const time = this.convertMs(deltaTime);

    this.onTick(time);          
        
  }, 1000)  
  
 
  }
  
  convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = this.addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes =this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  }
  
  addLeadingZero(value) {
  return String(value).padStart(2, '0');
  }
  
  stop(intervalId) {

  clearInterval(intervalId);
} 
}

const timer = new Timer({
  onTick: updateTimer,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateTimer({ days, hours, minutes, seconds }) {
   refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;

}




