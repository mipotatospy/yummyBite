import Api from "./Api.js";
import ParseCategory from "./ParseCategory.js";
import CardRecipes from "./CardRecipes.js";

const _detail = {};

_detail.getName = () => {
    var id = window.location.search;
    const params = new URLSearchParams(id);
    const name = params.get("s");
    return name
}

_detail.renderCards = async () => {
    var cardRecipe = new CardRecipes;
    const name = _detail.getName();
    const card = await cardRecipe.cardRender(name);
    console.log(card)
}

_detail.startUp = () => {
    _detail.renderCards();
}

_detail.startUp();