import Api from "./Api.js";
import ParseCategory from "./ParseCategory.js";

class CardRecipes {
    cardInfo = [];

    async cardRender(name) {
		const cardApi = new Api();
		const card = await cardApi.getCategoryList(name);

		if(card){
			this.cardInfo = this.convertToDoList(card.meals);
			this.updateScreen();
		}
	}

    convertToDoList (recipe) {
        console.log(recipe)
		return recipe.map(recipe => { //non modifica i valori --> map copia l'arrei e ne crea uno nuovo modificato
			const cardRec = new ParseCategory();
			cardRec.parseRecipe(recipe);
			return cardRec;
		});
	}

    updateScreen(){
		const recipeCard = document.querySelector("#recipeCard");
		recipeCard.innerHTML = "";

		if (recipeCard) {
			let htmlSource = `<div class="row mt-1 justify-content-center">`;

			const listItems = this.cardInfo.map((category) => {
				console.log(category)
				return `<div class="card mb-3 m-2">
							<a href="recipe.html?s=${category.name}" class="text-decoration-none">
								<img class="card-img-top" src="${category.image}" alt="Food">
								<div class="card-body">
									<p class="card-title">${category.name}</p>
								</div>
							</a>
						</div>`;
			});
		
			htmlSource += listItems.join("");
			htmlSource += "</div>";

			recipeCard.innerHTML = htmlSource;
		}
	}
}

export default CardRecipes;