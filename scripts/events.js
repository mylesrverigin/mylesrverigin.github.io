import {insertElement} from './modify-dom.js';
import {Puzzle} from './puzzle.js';

var p = new Puzzle();
p.run();
p.writePuzzle();


class Events {
    /* Class used to handle events and call other methods based on what happens
    
    Args: 
        event: when page changes the change event gets passed in here
    */
    constructor(event){
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
        if (this.getTagName() === 'INPUT'){
            var filteredInput = this.filterInput();
            if (typeof(filteredInput) === 'number'){
                insertElement(this.getId(),filteredInput);
                p.updateBoard(this.getId(),filteredInput);
            } else{
                insertElement(this.getId(),'');
                p.updateBoard(this.getId(),false);
            }
        }
    }
}

export {Events};