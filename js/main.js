// ***** JS PROJECT *****

// WHAT SHOULD YOU DO ?
// Use provided app structure in order to create an app that will search Food recipes. 
// API you should use is https://developer.edamam.com (you have to register).
// You will need both, app_id and app_key, as per documentation. app_id should be before app_key when used in URL.

var input = document.querySelector('#food-form input');
var health = document.querySelector('#food-form > select:nth-child(2)');
var diet = document.querySelector('#food-form > select:nth-child(3)');
var minCal = document.querySelector('#food-form > input:nth-child(4)');
var maxCal = document.querySelector('#food-form > input:nth-child(5)');
var searchBttn = document.querySelector('#food-form > button');
var recipesSection = document.getElementById('recipes');

var state = {
    page: 1, //current page
    resNum: 12, //number of results per page
    bttnNum: 5 //number of pages buttons
}
// setup event listeners
function init() {
    inputEnableSearch()
    inputDisableSearch()

    searchBttn.addEventListener('click', function() {
        startSearch()
    });
    document.addEventListener('keypress', function(e) {
        if(e.key === 'Enter' && !searchBttn.hasAttribute('disabled')) {
            startSearch();
        }
    });
}
// start new search
function startSearch() {
    addLoader();
    getData();
    state.page = 1;
}
// event listeners for enableing search
function inputEnableSearch() {
    [input, minCal, maxCal].forEach(function(item) {
        item.addEventListener('keyup', enableSearch);
    });
    [health, diet].forEach(function(item) {
        item.addEventListener('change', enableSearch);
    });
}
// event listeners for disableing search
function inputDisableSearch() {
    [input, minCal, maxCal].forEach(function(item) {
        item.addEventListener('keyup', disableSearch);
    })
}
// enable search button
function enableSearch() {
    if(input.value && health.value && diet.value && minCal.value && maxCal.value && minCal.value < maxCal.value) {
        searchBttn.removeAttribute('disabled');
    }
}
// disable search button
function disableSearch() {
    if(!input.value || !minCal.value || !maxCal.value || minCal.value >= maxCal.value) {
        searchBttn.setAttribute('disabled', '');
    }
}
// add loader spining icon
function addLoader() {
    var loader = document.querySelector('.loader');
    loader.appendChild(newEl('img', '', '', './img/loader.gif'));
    // da li je bolje ovako ili u jednom redu??:
    // document.querySelector('.loader').appendChild(newEl('img', '', '', './img/loader.gif'));
}
// stop loader
function stopLoader() {
    var image = document.querySelector('body > main > div > img');
    image.remove();
    // da li je bolje ovako ili u jednom redu??
}
// send request
function getData() {
    var key = '67fbbc9b6efae16b4ef0baad52211188';
    var ID = '259e672e';

    var fromResult = (state.page - 1) * state.resNum;
    var toResult = fromResult + state.resNum;

    var url = 'https://api.edamam.com/search?app_id=' + ID + '&app_key=' + key + '&q=' + input.value + '&diet=' + diet.value + '&health=' + health.value + '&calories=' + minCal.value + '-' + maxCal.value + '&from=' + fromResult + '&to=' + toResult;
    console.log(url);
    
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
        if(req.status === 200) {
            var reqInfo = JSON.parse(req.responseText);
            if(reqInfo.count != 0) {
                printRecepies(reqInfo);
                printResultCount(reqInfo);
                pageButtons(reqInfo);
            }
        }
        stopLoader();
    }
    req.send();
}
// insert pagination
function pageButtons(data) {
    // calculate maximum pages that can be displayed
    var pages = Math.ceil(data.count / (state.resNum));

    // delete previous pagination
    var wrapper = document.querySelector('.pagination-wrapper');
    wrapper.innerHTML = "";

    // define max left page number and max right page number
    var maxLeft = (state.page - Math.floor(state.bttnNum / 2)); //state.page = 1 (at start)
    var maxRight = (state.page + Math.floor(state.bttnNum / 2)); //state.bttnNum = 5

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
    for(var page = maxLeft; page <= maxRight; page++) {
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
    var buttons = document.querySelectorAll('.pagination-wrapper button');
    pagesClickEvent(buttons);
    // mark active page
    document.querySelector('button[value="' + state.page + '"]').classList.add('active');
}
// add click events on the pages
function pagesClickEvent(el) {
    el.forEach(function(item) {
        item.addEventListener('click', function(event) {
            state.page = Number(event.currentTarget.value);
            addLoader();
            getData();
        });
    });
}
// display recipes in the recipes section
function printRecepies(data) {
    recipesSection.innerHTML = "";
    data.hits.forEach(function(item) {
        createRecipe(item);
    });
}
// create one recipe article
function createRecipe(element) {

    var article = newEl('article', '', 'recipe-element', '');
    article.prepend(newEl('h3', element.recipe.label));
    article.prepend(newEl('img', '', '', element.recipe.image));
    article.prepend(newEl('p', Math.round(element.recipe.calories/element.recipe.yield), 'calories', ''));

    var labels = article.appendChild(newEl('div', '', 'labels', ''));
    var labelList = element.recipe.healthLabels;

    labelList.forEach(function(item) {
        labels.prepend(newEl('p', item, 'label'));
    });

    recipesSection.prepend(article);
}
// create HTML component
function newEl(tag, text, css, imgSrc) {
    var component = document.createElement(tag);
    if(text) {
        component.textContent = text;
    }
    if(css) {
        component.classList.add(css);
    }
    if(imgSrc) {
        component.setAttribute('src', imgSrc);
    }
    return component;
}
// display the number of recipes found 
function printResultCount(info) {
    var countNum = document.querySelector('span.recipe-count-number');
    countNum.textContent = info.count;
}
init();