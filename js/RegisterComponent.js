import RemoteDataManager from "./RemoteDataManager.js";

class RegisterComponent {
	constructor (cssSelector) {
		const registerForm = document.querySelector(cssSelector);
		if (registerForm) {
			registerForm.addEventListener("submit", this.registerForm_submitHandler.bind(this));
			this.registerForm = registerForm;
			this.emailField = registerForm.querySelector(`[type="email"]`);
			const passwordFields = registerForm.querySelectorAll(`[type="password"]`);
			if (passwordFields.length !== 2) {
				throw new Error("Servono 2 campi password per proseguire");
			}
			this.passwordField = passwordFields[0];
			this.passwordConfirmField = passwordFields[1];

			const modalElement = registerForm.closest(".modal");
			if (modalElement) {
				this.registerModal = new bootstrap.Modal(modalElement);
			}

		} else {
			throw new Error("Non trovo il form richiesto.");
		} 
	}

	closeModal () {
		this.registerModal.hide();
	}

	registerForm_submitHandler (event) {
		event.preventDefault();
	
		const password = this.passwordField.value.trim();
		const passwordConfirm = this.passwordConfirmField.value.trim();
	
		if (password !== passwordConfirm) {
			this.resetRegisterForm();
			return;
		}
		
		const user = {
			firstName: this.registerForm.querySelector("#firstNameField").value,
			lastName: this.registerForm.querySelector("#lastNameField").value,
			email : this.registerForm.querySelector("#registerEmailField").value,
			password,
		};

		this.saveUser(user);
	
		return false;
	}

	resetRegisterForm = () => {
		if (this.registerForm) {
			this.registerForm.reset();
		}
	};

	async saveUser (user) {
		const rdm = new RemoteDataManager();
		const insertResult = await rdm.registerUser(user); //await=rimani in ascolto di questa chiamata/funzione; 
		//per avere risultato del metodo asincrono, senza await da una promise perche cerca di dare un risultato immediatamente

		if (insertResult.rc === 1) {
			this.closeModal();
			this.resetRegisterForm();
		} else {
			let errors = "";
			insertResult.errors.forEach(error => { //elaborare ognuno degli elementi dell'array per farci qualcosa 
				//elemento, posizione in cui si trova e lista completa
				errors += `${error.error}\n`;
			});
			console.error("Non è possibile registrare l'utente")
		} 
	}

}

export default RegisterComponent;