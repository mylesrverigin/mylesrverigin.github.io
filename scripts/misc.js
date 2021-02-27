export function ShowAllAttrributes(obj){
    for(var att in obj){
        alert(att);
    }
}
export function ShowTagName(obj){
    alert(obj.tagName);
}
export function ShowValue(obj){
    alert(parseInt(obj.value));
}
export function ShowId(obj){
    alert(obj.id);
}