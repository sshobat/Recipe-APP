import * as globalVar from './globalVar.js';
import {addLoader} from './loader.js';
import {getData} from './request.js';
import {inputEnableSearch, inputDisableSearch } from './startEventListeners.js';

//current state for pagination and request
export const state = {
    page: 1, //current page
    resNum: 12, //number of results per page
    bttnNum: 5 //number of pages buttons
};

// start new search
const startSearch = () => {
    addLoader();
    getData();
    state.page = 1;
};
// setup event listeners
const init = () => {
    inputEnableSearch()
    inputDisableSearch()

    globalVar.searchBttn.addEventListener('click', () => {
        startSearch()
    });
    document.addEventListener('keypress', (e) => {
        if(e.key === 'Enter' && !globalVar.searchBttn.hasAttribute('disabled')) {
            startSearch();
        }
    });
};

init();