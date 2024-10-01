class Api {
	remoteURL = "https://www.themealdb.com/api/json/v1/1/"; //base URL 

	//fetch asincrono perchè indicativamente dal caricamento della pagina lui pesca i dati
	//metodo di js che serve per connetterci ad un database esterno

	async getCategories () {
		return fetch(this.remoteURL + "categories.php")   //chiamata specifica per categorie di ricette
		.then(response => { //then sviluppa la chiamata, una volta che ha preso i dati grazie all'URL
			return response.json();//response da le specifiche della chiamata
			//response.json() -> è una promise
		})
		.then(data => {
			return data; //ci da la promise sviluppata //inserisce i dati denttro data
		})
		.catch(error => {
			console.error(error); //prende gli errori all'interno della chiamata
		});
	}

	async getRecipe (string = '') {
		if (string === '') {
			throw new Error("Can't search");
		}

		return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${string}`, {
			method: "GET",
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {
			console.error(error);
		});
	}

	async getCategoryList (name) {
		return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`, {
			method: "GET",
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {
			console.error(error);
		});
	}

	async getRandomRecipe () {
		return fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {
			console.error(error);
		});
	}
}


export default Api; //rende disponibile il codice a chi carica il file //tratto lo script come un modulo --> serve type=module