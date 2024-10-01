
import Api from "./Api.js";
import ParseCategory from "./ParseCategory.js";

class CardCategories {
    cardInfo = [];

    async cardRender() {
		const cardApi = new Api();
		const card = await cardApi.getCategories();

		if(card){
			this.cardInfo = this.convertInfo(card.categories);
			this.updateScreen();
		}
	}

    convertInfo (categoriesCard) {
        console.log(categoriesCard)
		return categoriesCard.map(category => {
			const cardCat = new ParseCategory();
			cardCat.parse(category);
			return cardCat;
		});
	}

    updateScreen(){
		const recipeCard = document.querySelector("#recipeCard");

		if (recipeCard) {
			let htmlSource = `<div class="row mt-1 justify-content-center">`;

			const cards = this.cardInfo.map((category) => {
				console.log(category)
				return `<div class="card mb-3 m-2" id="card">
							<a href="/category.html?s=${category.name}" class="text-decoration-none">
								<img class="card-img-top" src="${category.image}" alt="Food">
								<div class="card-body">
									<p class="card-title">${category.name}</p>
									<p class="card-text">${category.description}</p>
								</div>
							</a>
						</div>`;
			});
		
			htmlSource += cards.join("");
			htmlSource += "</div>";

			recipeCard.innerHTML = htmlSource;
		}
	}
}

export default CardCategories;