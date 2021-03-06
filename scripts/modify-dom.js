

function removeplaced(id){
    /* Removes the placed unplaced classes
    */
    document.getElementById(id).classList.remove('sudoku-board__cell--placed');
    document.getElementById(id).classList.remove('sudoku-board__cell--unplaced');
}

function addPlaced(id,selected){
    /* Adds the placed class to element 
    Args: 
        selected: bool > selects placed or unplaced class 
    */
    if (selected){
        var classAdd = 'sudoku-board__cell--placed';
    } else {
        var classAdd = 'sudoku-board__cell--unplaced';
    }
    document.getElementById(id).classList.add(classAdd);
}

export function addBlock(on) {
    /* Adds a screen Block for computationally intensive calls

    args:
        on: bool >> to turn on or off block
    */
    var id = 'screen-block-1';
    var blockClass = 'block-screen--blocked';

    if (on){
        document.getElementById(id).classList.add(blockClass);
    }else {
        document.getElementById(id).classList.remove(blockClass);
    }
   
}

function writeProtect(id){
    /* Makes an element disabled*/
    document.getElementById(id).disabled = true;
}

function unWriteProtect(id){
    /* Makes an element undisabled*/
    document.getElementById(id).disabled = false;
}

export function insertElement(id,value){
    /* Updates the value of html elements
    Args: 
        id: the id to insert value at 
        value: the value to insert
    */
    document.getElementById(id).value = value;
    removeplaced(id);
    unWriteProtect(id);
}

export function insertElementWriteProtect(id,value){
    /* Updates the value of html elements
    Args: 
        value: the value to insert
        id: the id to insert value at 
    */
    insertElement(id,value);
    writeProtect(id);
}

export function insertElementColor(id,value,add){
    /* Insert element into cell and set background color before making it disable
    args:
        id: if of cell
        value: value to insert
        color: color to change it to
        add: bool selects what class we add
    */
    insertElement(id,value);
    addPlaced(id,add);
}

export function insertTextHTML(id,value){
    /* Adds value to html id using .innerHTML 
    
    args:
        id: id of element 
        value: what to insert into innerHTML
    */
    document.getElementById(id).innerText = value;
}