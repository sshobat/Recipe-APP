import * as globalVar from './globalVar.js';
import {newEl} from './newElement.js';

// display recipes in the recipes section
export const printRecepies = data => {
    globalVar.recipesSection.innerHTML = "";
    data.hits.forEach(item => {
        createRecipe(item);
    });
};

// create one recipe article
const createRecipe = element => {

    var article = newEl('article', '', 'recipe-element', '');
    article.prepend(newEl('h3', element.recipe.label));
    article.prepend(newEl('img', '', '', element.recipe.image));
    article.prepend(newEl('p', Math.round(element.recipe.calories/element.recipe.yield), 'calories', ''));

    var labels = article.appendChild(newEl('div', '', 'labels', ''));
    var labelList = element.recipe.healthLabels;

    labelList.forEach(item => {
        labels.prepend(newEl('p', item, 'label'));
    });

    globalVar.recipesSection.prepend(article);
};

// display the number of recipes found 
export const printResultCount = info => {
    var countNum = document.querySelector('span.recipe-count-number');
    countNum.textContent = info.count;
};