import * as globalVar from './globalVar.js';
import {key, ID} from './apiKey.js';
import {state} from './main.js';
import {printRecepies, printResultCount} from './printRecipes.js';
import {stopLoader} from './loader.js';
import {pageButtons} from './pagination.js';


export const getData = () => {
    
    const fromResult = (state.page - 1) * state.resNum;
    const toResult = fromResult + state.resNum;
    let diet, health, calories;
    
    globalVar.diet.value ? diet = `&diet=${globalVar.diet.value}` : diet = "";
    globalVar.health.value ? health = `&health=${globalVar.health.value}` : health = "";

    if(globalVar.minCal.value && globalVar.maxCal.value) {
        calories = `&calories=${globalVar.minCal.value}-${globalVar.maxCal.value}`;
    } else if(globalVar.minCal.value && !globalVar.maxCal.value) {
        calories = `&calories=${globalVar.minCal.value}+`;
    } else if(!globalVar.minCal.value && globalVar.maxCal.value) {
        calories = `&calories=${globalVar.maxCal.value}`;
    } else {
        calories = "";
    }

    var url = `https://api.edamam.com/search?app_id=${ID}&app_key=${key}&q=${globalVar.input.value}${diet}${health}${calories}&from=${fromResult}&to=${toResult}`;
    
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }
    })
    .then(data => {
        console.log(data);
        if (data.count != 0) {
            printRecepies(data);
            printResultCount(data);
            pageButtons(data);
        }
        stopLoader();
    })
};
