import {Events} from './events.js';

document.addEventListener('change',event => {
    let temp = new Events(event);
    temp.handleClick();
})