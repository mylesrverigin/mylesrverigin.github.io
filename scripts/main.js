import {Events} from './events.js';

var ev = new Events();

// Add event listener looking for changes in input
document.addEventListener('change',event => {
    ev.updateEvent(event);
    ev.handleClick();
})

// add event listener for button clicks
for (var bt of document.getElementsByTagName("BUTTON")){
    bt.addEventListener('click', event => {
        ev.updateEvent(event);
        ev.handleClick();
    })
}
