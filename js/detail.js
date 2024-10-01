import Api from "./Api.js";
import ParseCategory from "./ParseCategory.js";
import CardRecipes from "./CardRecipes.js";

const _detail = {};

_detail.getName = () => {
    var id = window.location.search;
    const params = new URLSearchParams(id);
    const name = params.get("s");
    console.log(params);
    return name
}

_detail.getRecipe = async () => {
    var api = new Api;
    const name = _detail.getName();
    const recipe = await api.getRecipe(name);
    console.log(recipe);
    console.log(recipe.meals[0]);
    _detail.renderPage(recipe.meals[0]);
}

_detail.renderPage = (recipe) => {
    const pageBody = document.querySelector("#pageBody");

    if (pageBody) {
        let htmlSource = `
        <a id="titleRecipe" class="text-center mt-5">${recipe.strMeal}</a><br>
        <img class="mt-3" src="${recipe.strMealThumb}"></img><br>
        <a class="categoryRecipe">Category: ${recipe.strCategory}</a><br>
        <p class="recipeText">${recipe.strInstructions}</p>
            `;
        pageBody.innerHTML = htmlSource;
    }
}

_detail.searchBarStartUp = async () => {
	console.log("1 - searchBarStartUp")
	const searchBtn = document.querySelector("#mainSearchBtn");	
	if (searchBtn) {
		searchBtn.addEventListener("click", _detail.searchBtn_clickHandler);
	}
}

_detail.searchBtn_clickHandler = async () => {
	console.log("2 - Search click")
	const searchBar = document.querySelector('#mainSearchBar');
	const searchBarValue = searchBar.value;
	const api = new Api();
	const recipeResults = await api.getRecipe(searchBarValue);
	console.log(recipeResults);
	if (!["/recipe.html"].includes(document.location.pathname)) {
		document.location = "/recipe.html?s=" + searchBarValue;
	}
}

_detail.startUp = () => {
    _detail.getRecipe();
    _detail.searchBarStartUp();
}

_detail.startUp();