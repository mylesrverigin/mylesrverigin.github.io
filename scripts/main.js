import {ShowValue, ShowTagName, ShowId} from './puzzle.js';

//  ShowAllAttributes takes a long time to run through all print outs //

document.addEventListener('change',event => {
    ShowId(event.target);
    ShowValue(event.target);
})