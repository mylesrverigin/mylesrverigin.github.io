import {insertElement} from './modify-dom.js';

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
        if (isNaN(this.getValue())){
            return false;
        }
        var parsed = parseInt(this.getValue());
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
            var temp = this.filterInput();
            if (typeof(temp) === 'number'){
                insertElement(temp,this.getId());
            } else{
                insertElement('',this.getId());
            }
        }
    }
}

export {Events};