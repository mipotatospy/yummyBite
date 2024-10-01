class RemoteDataManager {
	remoteURL =  "https://customers.lineacontinua.net/api/node/";

	async delete (item) {
		if (item === null) {
			throw new Error("Can't delete null item");
		}

		if (item.guid === null || item.guid === "") { //global universal identifier
			throw new Error("Can't delete item without guid");
		}

		return fetch(this.remoteURL + "delete", {
			body : JSON.stringify(this.prepareRequest(null,item)),
			method : "POST"
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.payload;
		})
		.catch(error => {
			console.error(error);	
		});
	}

	async getList (filterData = null) {
		return fetch(this.remoteURL + "get-list", {
			body : JSON.stringify(this.prepareRequest(filterData)),
			method : "POST"
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.payload;
		})
		.catch(error => {
			console.error(error);	
		});
	}

	async getUserFromToken () {
		const request = this.prepareRequest();
		request.__nctoken__ = localStorage.getItem("__nctoken__");

		return fetch("https://customers.lineacontinua.net/api/session/get-user", {
			body : JSON.stringify(request),
			method : "POST"
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			localStorage.setItem("__nctoken__", data.__nctoken__);
			return data.payload;
		})
		.catch(error => {
			console.error(error);	
		});
	}
	
	async insert (item = null) {
		if (item === null) {
			throw new Error("Can't insert null item");
		}
		return fetch(this.remoteURL + "insert", {
			body : JSON.stringify(this.prepareRequest(null,item)),
			method : "POST"
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.payload;
		})
		.catch(error => {
			console.error(error);	
		});
	}

	async loginUser (user = null) {
		if (user === null) {
			throw new Error("Can't insert null item");
		}
		return fetch("https://customers.lineacontinua.net/api/user/login", {
			body : JSON.stringify(this.prepareRequest(null,user)),
			method : "POST"
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			localStorage.setItem("__nctoken__", data.__nctoken__);
			return data.payload;
		})
		.catch(error => {
			console.error(error);	
		});
	}

	async logoutUser () {
		const request = this.prepareRequest();
		request.__nctoken__ = localStorage.getItem("__nctoken__");
		
		return fetch("https://customers.lineacontinua.net/api/user/session/abandon", {
			body : JSON.stringify(request),
			method : "POST"
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			localStorage.setItem("__nctoken__", "");
			return data.payload;
		})
		.catch(error => {
			console.error(error);	
		});
	}

	async registerUser (user = null) {
		if (user === null) {
			throw new Error("Can't insert null item");
		}
		return fetch("https://customers.lineacontinua.net/api/user/register", {
			body : JSON.stringify(this.prepareRequest(null,user)),
			method : "POST"
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.payload;
		})
		.catch(error => {
			console.error(error);	
		});
	}

	prepareRequest (filterData, item = null) {
		const filters = {};
		if (filterData !== null) {
			filters["nodeType"] = filterData;
		}
		const request = {
			__nctoken__ : "",
			__ukey__ : "maddalena.zanchetta@ied.edu",
			payload : {}
		};
		if (item !== null) {
			request.payload.item = item;
		}
		if (filterData !== null) {
			request.payload.filters  = filters;
		}

		return request;
	}

	async update (item = null) {
		if (item === null) {
			throw new Error("Can't update null item");
		}
		if (item.guid === null || item.guid === "") {
			throw new Error("Can't update null without guid");
		}

		return fetch(this.remoteURL + "update", {
			body : JSON.stringify(this.prepareRequest(null,item)),
			method : "POST"
		})
		.then(response => {
			return response.json();
		})
		.then(data => {
			return data.payload;
		})
		.catch(error => {
			console.error(error);	
		});
	}
}

export default RemoteDataManager;