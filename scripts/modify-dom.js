

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

function writeProtect(id){
    /* Makes an element disabled*/
    document.getElementById(id).disabled = true;
}

function unWriteProtect(id){
    /* Makes an element undisabled*/
    document.getElementById(id).disabled = false;
}

export function insertElement(id,value){
    /* Updates the value of TD html elements
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
    writeProtect(id);
    addPlaced(id,add);
}
