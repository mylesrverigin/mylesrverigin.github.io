export function insertElement(value,id){
    /* Updates the value of TD html elements
    Args: 
        value: the value to insert
        id: the id to insert value at 
    */
   document.getElementById(id).value = value;
}

export function insertElementWriteProtect(value,id){
    /* Updates the value of TD html elements
    Args: 
        value: the value to insert
        id: the id to insert value at 
    */
   document.getElementById(id).value = value;
   document.getElementById(id).disabled = true;
}