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
        setInterval(() => {
            this.setCurrentTime();
            this.timeSplit();
            insertTextHTML('seconds',this.seconds);
            insertTextHTML('minutes',this.minutes);
            insertTextHTML('hours',this.hours);
        },1000);
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
        this.minutes = this.zeroPadded(minutes);
        var hours = Math.floor(totalSeconds/360);
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