const registrants = [];
function handleSubmit() {
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
		const registrant = {
			nama: name,
			umur: age,
			uang_sangu: money,
		};
		registrants.push(registrant);

		let status_submit = document.getElementById("status_submit");
		status_submit.innerText = "Data submitted successfully!";
		status_submit.style.color = "green";
	}

	document.getElementById("name").value = "";
	document.getElementById("age").value = "";
	document.getElementById("money").value = "";

	// console.log(name.value);
	// console.log(age.value);
	// console.log(money.value);
	console.log(registrants);
}
