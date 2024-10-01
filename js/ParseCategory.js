class ParseCategory {

	parse (data) {
		if (data.strCategoryThumb) {
			this.image = data.strCategoryThumb;
		}

		if (data.strCategory) {
			this.name = data.strCategory;
		}
		if (data.strCategoryDescription) {
			this.description = data.strCategoryDescription;
		}
		if (data.idCategory) {
			this.id = data.idCategory;
		}
	}

	parseRecipe (recipe) {
		if (recipe.strMealThumb) {
			this.image = recipe.strMealThumb
		}
		if(recipe.strMeal) {
			this.name = recipe.strMeal
		}
	}
}

export default ParseCategory;