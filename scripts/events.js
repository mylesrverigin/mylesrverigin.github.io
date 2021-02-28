import {insertElement} from './modify-dom.js';
import {Puzzle} from './puzzle.js';

var pzzle = new Puzzle();
pzzle.clearBoard();

class Events {
    /* Class used to handle events and call other methods based on what happens
    */
    constructor(){
        /* this.start makes it so input changes are not watched until after a button 
            it clicked then flag is changed and input it watched.
        */
        this.start = false;
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
        if type int Lets puzzle update 
        else resets cell
         */

        if (this.getTagName() === 'INPUT' && this.start){
            var filteredInput = this.filterInput();
            if (typeof(filteredInput) === 'number'){
                insertElement(this.getId(),filteredInput);
                if(p.updateBoard(this.getId(),filteredInput)){
                    //check solution
                };
            } else{
                insertElement(this.getId(),'');
                p.updateBoard(this.getId(),false);
            }
        }else if (this.getTagName() === 'BUTTON'){
            this.start = true;
            switch(this.getValue()){
                case 'solve':
                    console.log('puzzle solved');
                    break;
                case 'gen':
                    pzzle.newPuzzle();
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