const registrants = [];
const handleSubmit = () => {
	const name = document.getElementById("name").value;
	const age = document.getElementById("age").value;
	const money = document.getElementById("money").value;

	if (name.length < 10) {
		alert("Name must be at least 10 characters");
	} else if (age < 25) {
		alert("Minimum age 25 years");
	} else if (money < 100000 || money > 1000000) {
		alert("Money must be between 100.000 - 1.000.000");
	} else {
		const greet = document.getElementById("status_submit");
		if (money < 300000) {
			const frugalStudent = new FrugalStudent(name, age, money);
			greet.innerHTML = frugalStudent.greet();
		} else if (money < 600000) {
			const normalStudent = new NormalStudent(name, age, money);
			greet.innerHTML = normalStudent.greet();
		} else {
			const wastefulStudent = new WastefulStudent(name, age, money);
			greet.innerHTML = wastefulStudent.greet();
		}
		const registrant = {
			nama: name,
			umur: +age,
			uang_sangu: +money,
		};
		registrants.push(registrant);
		const arrow = document.getElementById("arrow");
		setTimeout(() => {
			arrow.style.transitionDuration = "2s";
			requestAnimationFrame(() => {
				arrow.style.opacity = "1";
			});
		}, 5000);

		setTimeout(() => {
			const element = document.getElementById("list_registrants");
			window.scrollTo({
				top: element.offsetTop,
				behavior: "smooth",
			});
			requestAnimationFrame(() => {
				arrow.style.opacity = "0";
			});
		}, 10000);
	}

	document.getElementById("name").value = "";
	document.getElementById("age").value = "";
	document.getElementById("money").value = "";
	console.log(registrants);
};

const scrollToElement = idElement => {
	const element = document.getElementById(idElement);
	if (element) {
	}
};

class Registrant {
	constructor(name, age, money) {
		this.name = name;
		this.age = age;
		this.money = money;
	}
}

class FrugalStudent extends Registrant {
	constructor(name, age, money) {
		super(name, age, money);
	}

	greet() {
		return `Hallo <strong>${this.name}!</strong> Umur kamu <strong>${this.age}</strong>, dan uang sangu kamu <strong>Rp${this.money}</strong>. Kamu termasuk pelajar yang hemat, itu bagus pertahankan ya.`;
	}
}

class NormalStudent extends Registrant {
	constructor(name, age, money) {
		super(name, age, money);
	}

	greet() {
		return `Hallo <strong>${this.name}!</strong> Umur kamu <strong>${this.age}</strong>, dan uang sangu kamu <strong>Rp${this.money}</strong>. Kamu termasuk pelajar yang normal, tapi jangan lupa ya untuk menabung.`;
	}
}

class WastefulStudent extends Registrant {
	constructor(name, age, money) {
		super(name, age, money);
	}

	greet() {
		return `Hallo <strong>${this.name}!</strong> Umur kamu <strong>${this.age}</strong>, dan uang sangu kamu <strong>Rp${this.money}</strong>. Kamu termasuk pelajar yang boros nih, kamu harus menyisihkan uang saku kamu untuk ditabung.`;
	}
}