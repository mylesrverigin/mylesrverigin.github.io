import {insertElement} from './modify-dom.js';
import {Puzzle} from './puzzle.js';
import {Solver} from './solver.js';
import { Timer } from './timer.js';

var pzzle = new Puzzle();
var solved = new Solver();
var timer = new Timer();
timer.setStartTime();
timer.startTimer();

class Events {
    /* Class used to handle events and call other methods based on what happens
    */
    constructor(){
        /* Generates a blank board to start and capture user input right away
        */
        pzzle.clearBoard();
    }

    updateEvent(event){
        /* Updates the current event of class
        */
        this.event = event;
    }

    getTagName(){
        /* Returns the events Tag as str */
        return this.event.target.tagName;
    }

    getValue(){
        /* Return the events Value as str */
        return this.event.target.value;
    }

    getId(){
        /* Returns the events Id as str */
        return this.event.target.id;
    }

    filterInput(){
        /* Checks if value is number 
        Ret: false if NaN else number
        */
        var userInput = this.getValue();
        if (isNaN(userInput)){
            return false;
        }else if (userInput == '' || userInput == ' '){
            return false;
        }
        var parsed = parseInt(userInput);
        if (parsed == 0){
            return false;
        }
        return parsed;
    }

    handleClick(){
        /* Filters Click event
        if input
            if type int Lets puzzle update 
            else resets cell
        if button 
            turns on flag to allow in put watching
            can also reset or solve puzzle
         */

        if (this.getTagName() === 'INPUT'){
            var filteredInput = this.filterInput();
            if (typeof(filteredInput) === 'number'){
                insertElement(this.getId(),filteredInput);
                if(pzzle.updateBoard(this.getId(),filteredInput)){
                    // board full flag fired check solution
                    solved.addPuzzle(pzzle);
                    solved.isSolved();
                };
            } else{
                insertElement(this.getId(),'');
                pzzle.updateBoard(this.getId(),false);
            }
        }else if (this.getTagName() === 'BUTTON'){
            this.start = true;
            switch(this.getValue()){
                case 'solve':
                    solved.addPuzzle(pzzle);
                    solved.run();
                    break;
                case 'gen':
                    var start = performance.now();
                    pzzle.newPuzzle();
                    console.log((performance.now()-start)+' millisecond runtime to generate');
                    break;
                case 'clear': 
                    pzzle.clearBoard();
                    break;
                default:
                    console.log('default');
                    break;
            }
        }
    }
}

export {Events};