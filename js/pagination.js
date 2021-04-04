import {state} from './main.js';
import {addLoader} from './loader.js';
import {getData} from './request.js';

// insert pagination
export const pageButtons = data => {
    // calculate maximum pages that can be displayed
    const pages = Math.ceil(data.count / (state.resNum));

    // delete previous pagination
    const wrapper = document.querySelector('.pagination-wrapper');
    wrapper.innerHTML = "";

    // define max left page number and max right page number
    let maxLeft = (state.page - Math.floor(state.bttnNum / 2)); //state.page = 1 (at start)
    let maxRight = (state.page + Math.floor(state.bttnNum / 2)); //state.bttnNum = 5

    if(maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.bttnNum;
    }
    if(maxRight > pages) {
        maxLeft = pages - (state.bttnNum - 1);
        maxRight = pages;
        if(maxLeft < 1) {
            maxLeft = 1;
        }
    }
    // insert pages buttons
    for(let page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += '<button value="' + page + '">' + page + '</button>';
    }
    // insert << first page button
    if(state.page != 1) {
        wrapper.innerHTML = '<button value="1">&#171; First</button>' + wrapper.innerHTML;
    }
    // insert last >> page button
    if(state.page != pages) {
        wrapper.innerHTML += '<button value="' + pages + '">Last &#187;</button>'
    }
    // add click events on the page buttons
    const buttons = document.querySelectorAll('.pagination-wrapper button');

    pagesClickEvent(buttons);
    
    // mark active page
    document.querySelector('button[value="' + state.page + '"]').classList.add('active');
}

// add click events on the pages
const pagesClickEvent = el => {
    el.forEach(item => {
        item.addEventListener('click', event => {
            state.page = Number(event.currentTarget.value);
            window.scrollTo(0, 0);
            addLoader();
            getData();
        });
    });
}