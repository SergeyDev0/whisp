import { makeAutoObservable } from "mobx";

class AuthStore {
	phone = null;
	name = "";
	dob = "";

	constructor() {
		makeAutoObservable(this);
	}

	setPhone(phone) {
		this.phone = phone;
		localStorage.setItem("phone", phone);
	}

	setProfile(profile) {
		this.name = profile.name;
		this.dob = profile.dob;
		localStorage.setItem("profileName", this.name);
		localStorage.setItem("profileDob", this.dob);
	}

	logOut() {
		this.phone = null;
		localStorage.removeItem("profileName");
		localStorage.removeItem("profileDob");
		localStorage.removeItem("phone");
	}

	logIn() {
		this.phone = localStorage.getItem("phone");
		this.name = localStorage.getItem("profileName");
		this.dob = localStorage.getItem("profileDob");
	}
}

export const authStore = new AuthStore();