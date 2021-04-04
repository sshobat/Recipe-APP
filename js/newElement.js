// create HTML component
export const newEl = (tag, text, css, imgSrc) => {
    var component = document.createElement(tag);
    text ? component.textContent = text : null;
    css ? component.classList.add(css) : null;
    imgSrc ? component.setAttribute('src', imgSrc) : null;
    return component;
}