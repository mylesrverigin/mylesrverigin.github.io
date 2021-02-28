export function insertElement(id,value){
    /* Updates the value of TD html elements
    Args: 
        id: the id to insert value at 
        value: the value to insert
    */
   document.getElementById(id).value = value;
   document.getElementById(id).disabled = false;
}

export function insertElementWriteProtect(id,value){
    /* Updates the value of TD html elements
    Args: 
        value: the value to insert
        id: the id to insert value at 
    */
   document.getElementById(id).value = value;
   document.getElementById(id).disabled = true;
}

export function insertElementColor(id,value,color){
    /* Insert element into cell and set background color before making it disable
    args:
        id: if of cell
        value: value to insert
        color: color to change it to
    */
   document.getElementById(id).value = value;
   document.getElementById(id).style.backgroundColor = color;
   document.getElementById(id).disabled = true;
}


