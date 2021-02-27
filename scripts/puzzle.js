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
// new Set() .add(1) .has(1) .size
// var quotient = Math.floor(y/x);
// var remainder = y % x;