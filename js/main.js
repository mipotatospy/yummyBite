import RemoteDataManager from "./RemoteDataManager.js";
import RegisterComponent from "./RegisterComponent.js";
import Api from "./Api.js";
import CardCategories from "./CardCategories.js";

const _app = {}; //OGGETTO
//oggetto -> funziona a chiave valore (dati strutturati); vettore -> funziona per posizioni (dati ordinati)


_app.cardCategoriesStartUp = async () => { //funzione che applicata ad un oggetto è definita metodo
	const cardCategories = new CardCategories();
	const card = await cardCategories.cardRender();
}

_app.checkLoggedUser = async () => {
	const loggedUserData = localStorage.getItem("loggedUser");
	const rdm = new RemoteDataManager();
	const loggedUserCheck = await rdm.getUserFromToken();
	
	if (loggedUserCheck.rc == 1 && loggedUserCheck.errors.length == 0) {
		const loggedUser = JSON.parse(loggedUserData);

		const logInBtn = document.querySelector("#logInBtn");	
		logInBtn.classList.add("d-none");

		const logoutBtn = document.querySelector("#logOutBtn");
		logoutBtn.classList.remove("d-none");
		if (logoutBtn) {
			logoutBtn.addEventListener("click", _app.logOutBtn_clickHandler);
		}

		_app.loggedUser = loggedUser;
	} else {
		if (!["/","/index.html"].includes(document.location.pathname)) {
			document.location = "index.html";
		}
		_app.setUpLoginPage();
	}
};

_app.logOutBtn_clickHandler = async () => {
	const rdm = new RemoteDataManager();
	const userListResponse = await rdm.logoutUser();
	logInBtn.classList.remove("d-none");
	logOutBtn.classList.add("d-none");
};


_app.logInForm_submitHandler = (event) => {
	event.preventDefault();

	const password = document.querySelector("#loginPasswordField").value.trim();

	const user = {
		email : document.querySelector("#loginEmailField").value,
		password,
		nodeType : "user",
	};

	_app.logInUser(user);

	event.target.reset();
	return false;
};

_app.logInUser = async (user) => {     //metodo asincrono= fetch asincrono perchè indicativamente dal caricamento della pagina lui pesca i dati
	const rdm = new RemoteDataManager();

	const userListResponse = await rdm.loginUser(user);
	
	if (userListResponse.rc === 1) {
		const loggedUser = userListResponse.items.find(item => item.email === user.email);
		if (loggedUser !== undefined) {
			delete loggedUser.password;
			localStorage.setItem("loggedUser",JSON.stringify(loggedUser)); //salva qualcosa con etichetta "loggedUser" che conserva il valore passato
			//localstorange salva i dati in stringa
			//set item --> salvo qualcosa (chiave e dato stesso)
			//memoria locale di salvataggio del browser locale --> nel local st. si salvano solo stringhe
			//elementi non stringhe -> vanno resi stringhe
			//JSON classe data da js
			//con il metodo stingify facciamo diventare stringa l'array
			_app.checkLoggedUser();
		}
	}
};

_app.renderCategories = async () => {
	const api = new Api();
}

_app.searchBarStartUp = async () => {
	console.log("1 - searchBarStartUp")
	const searchBtn = document.querySelector("#mainSearchBtn");	
	if (searchBtn) {
		searchBtn.addEventListener("click", _app.searchBtn_clickHandler);
	}
}

_app.searchBtn_clickHandler = async () => {
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

_app.setUpLoginPage = () => {
	const registerComponent = new RegisterComponent("#registerForm");

	const logInForm = document.querySelector("#logInForm");
	if (logInForm) { //controlla che la costante non sia rimasta vuota
		logInForm.addEventListener("submit", _app.logInForm_submitHandler);
		_app.logInForm = logInForm;
	}
};

_app.startUp = () => {
	_app.checkLoggedUser();
	_app.cardCategoriesStartUp();
	_app.searchBarStartUp();
};

_app.startUp();

export {_app};