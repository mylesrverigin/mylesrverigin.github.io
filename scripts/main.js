import {ShowValue, ShowTagName, ShowId} from './misc.js';

//  ShowAllAttributes takes a long time to run through all print outs //

document.addEventListener('change',event => {
    ShowId(event.target);
    ShowValue(event.target);
})