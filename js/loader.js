import {newEl} from './newElement.js';

// add loader spining icon
const addLoader = () => {
    document.querySelector('.loader').appendChild(newEl('img', '', '', './img/loader.gif'));
}
// stop loader
const stopLoader = () => {
    document.querySelector('body > main > div > img').remove();
}

export {addLoader, stopLoader};