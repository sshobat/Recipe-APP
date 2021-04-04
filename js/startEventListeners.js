import * as globalVar from './globalVar.js';

// enable search button
const enableSearch = () => {

    var cal;

    if (!globalVar.minCal.value && !globalVar.maxCal.value) {
        cal = true;
    } else if (globalVar.minCal.value || globalVar.maxCal.value) {
        cal = true;
    } else if (globalVar.minCal.value && globalVar.maxCal.value && globalVar.minCal.value < globalVar.maxCal.value) {
        cal = true;
    }

    (globalVar.input.value && cal) ? globalVar.searchBttn.removeAttribute('disabled') : null;

};
// disable search button
const disableSearch = () => {

    var cal;

    (globalVar.minCal.value && globalVar.maxCal.value && globalVar.minCal.value >= globalVar.maxCal.value) ? cal = true : cal = false;
    
    (!globalVar.input.value || cal) ? globalVar.searchBttn.setAttribute('disabled', '') : null;
    
};

// event listeners for enableing search
export const inputEnableSearch = () => {
    [globalVar.input, globalVar.minCal, globalVar.maxCal].forEach(item => {
        item.addEventListener('keyup', enableSearch);
    });
    [globalVar.health, globalVar.diet].forEach(item => {
        item.addEventListener('change', enableSearch);
    });
};
// event listeners for disableing search
export const inputDisableSearch = () => {
    [globalVar.input, globalVar.minCal, globalVar.maxCal].forEach(item => {
        item.addEventListener('keyup', disableSearch);
    });
};


