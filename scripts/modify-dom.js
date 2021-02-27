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