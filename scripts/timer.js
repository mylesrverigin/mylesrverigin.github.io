import {insertTextHTML} from './modify-dom.js';

export class Timer {
    constructor() {
        /* Makes the start time the current time on instaniation */
        this.current = false;
        this.start = false;
    }

    setStartTime() {
        /* Makes a timestamp when called saves as this.start */
        this.start = Date.now();
    }

    setCurrentTime() {
        /* Grabs current time and saves it */
        this.current = Date.now();
    }

    startTimer() {
        /* Starts the Timer counting */
        this.setStartTime();
        this.timerobj = setInterval(() => {
            this.setCurrentTime();
            this.timeSplit();
            insertTextHTML('seconds',this.seconds);
            insertTextHTML('minutes',this.minutes);
            insertTextHTML('hours',this.hours);
        },1000);
    }

    stopTimer() {
        /* Stops timer obj */
        clearInterval(this.timerobj);
    }

    clearTimer() {
        /* Resets on screen timer back to 00:00:00 */
        insertTextHTML('seconds','00');
        insertTextHTML('minutes','00');
        insertTextHTML('hours','00');
    }

    timeSplit() {
        /* Takes start-current time and splits it into hour min seconds 
        ret:
            bool false if no times
        */
        if (!this.current) {
            return false;
        }
        if (!this.start) {
            return false;
        }
        const timeGap = this.current - this.start;
        const totalSeconds = timeGap/1000;
        var seconds = Math.floor(totalSeconds%60);
        this.seconds = this.zeroPadded(seconds);
        var minutes = Math.floor(totalSeconds/60);
        if (minutes >= 60) {
            minutes -= 60;
        }
        this.minutes = this.zeroPadded(minutes);
        var hours = Math.floor(totalSeconds/3600);
        if (hours >= 99) {
            alert('What are you doing with your life')
            hours -= 99;
        }
        this.hours = this.zeroPadded(hours);
    }

    zeroPadded(value) {
        /* Adds a zero if < 10 or if num is undefined
        args:
            value: the value to check 
        
        returns:
            str = zero padded number
        */
       if (value != value) {
           return true;
       }
       if (value < 10){
           return '0'+value;
       } else {
           return value;
       }
    }
}