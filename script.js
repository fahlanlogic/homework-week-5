const registrants = []; // array pendaftar
const handleSubmit = () => {
	const name = document.getElementById("name").value; // input nama
	const age = document.getElementById("age").value; // input umur
	const money = document.getElementById("money").value; // input uang sangu
	const greet = document.getElementById("status_submit"); // ucapan saat submit
	const button = document.getElementById("button"); // button submit
	const arrow = document.getElementById("arrow"); // icon arrow

	// kondisi untuk validasi proses submit
	if (name.length < 10) {
		alert("Name must be at least 10 characters");
	} else if (age < 25) {
		alert("Minimum age 25 years");
	} else if (money < 100000 || money > 1000000) {
		alert("Money must be between 100.000 - 1.000.000");
	} else {
		button.setAttribute("disabled", true); // meng-disable button submit sampai window menunjukan table list pendaftar
		button.classList.add("opacity-70"); // mengurangi opasitas agar user tau bahwa button sedang di-disable

		// kondisi untuk greet menggunakan class inheritance
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

		// variable objek pendaftar
		const registrant = {
			nama: name,
			umur: +age,
			uang_sangu: +money,
		};
		registrants.push(registrant); // push ke array para pendaftar
		showRegistrantOnTable(); // trigger fungsi menampilkan pendaftar ditable saat user sukses melakukan submit

		// fungsi asynchronus dengan waktu tertentu untuk menampilkan icon arrow yg belum muncul menjadi muncul secara smooth
		setTimeout(() => {
			arrow.style.transitionDuration = "1s"; // mengatur durasi transisi, semakin tinggi semakin lambat
			requestAnimationFrame(() => {
				// attribute dari window untuk mengatur animasi saat rendering window
				arrow.style.opacity = "1"; // memberi nilai opacity ke 1 agar kembali opacity 100%
			});
		}, 6000); // dilakukan 6 detik setelah klik submit sukses

		// fungsi asynchronus dengan waktu tertentu untuk meng-scroll window secara otomatis ke element tertuju
		setTimeout(() => {
			const element = document.getElementById("list_registrants"); // element list pendaftar
			// mengatur scrolling
			window.scrollTo({
				top: element.offsetTop,
				behavior: "smooth",
			});
			requestAnimationFrame(() => {
				arrow.style.opacity = "0"; // memberi nilai icon arrow yang aktif kembali menghilang karena proses selesai
			});
			button.removeAttribute("disabled"); // mengaktifkan kembali tombol submit dg menghapus attr disable
			button.classList.remove("opacity-70"); // mengembalikan opacity menjadi 100% dg menghapus class dari tailwindcss opacity-70
		}, 10000); // dilakukan 10 detik setelah klik submit sukses karena user perlu membaca pesan greet terlebih dahulu
	}

	document.getElementById("name").value = ""; // membuat input menjadi kosong
	document.getElementById("age").value = ""; // membuat input menjadi kosong
	document.getElementById("money").value = ""; // membuat input menjadi kosong
	console.log(registrants);
};

// fungsi menampilkan list pendaftar pada table
const showRegistrantOnTable = () => {
	const tBody = document.getElementById("table_body"); // table body
	const tRow = document.createElement("tr"); // membuat table row

	// mapping/looping list pendaftar
	registrants.map(registrant => {
		// mengisi table row dengan array registrants, sekaligus styling
		tRow.innerHTML = `
		<td class="py-3 border-r border-zinc-300 px-4">${registrant.nama}</td>
		<td class="text-center border-r border-zinc-300 px-2">${registrant.umur} tahun</td>
		<td class="text-center flex justify-between items-center py-3 px-4"><span>Rp</span> ${registrant.uang_sangu}</td>
		`;
		tRow.style.borderBottom = "1px solid #d4d4d8";
		tBody.appendChild(tRow); // memasukan table row ke table body
	});

	resume(); // trigger fungsi resume saat table sukses ditampilkan
};

// fungsi ringkasan/resume
const resume = () => {
	const avrMoneyElement = document.getElementById("avr_money"); // rata-rata uang sangu
	const avrAgeElement = document.getElementById("avr_age"); // rata-rata umur
	const dotMoney = document.getElementById("dot_money"); // titik-titik uang sangu
	const dotAge = document.getElementById("dot_age"); // titik-titik umur

	dotMoney.classList.add("hidden"); // menyembunyikan dot
	dotAge.classList.add("hidden"); // menyembunyikan dot
	// menghitung total uang sangu
	const calculateMoney = registrants.reduce(
		(acc, curr) => acc + curr.uang_sangu,
		0
	);
	const calcAvrMoney = Math.floor(calculateMoney / registrants.length); // menghitung rata-rata uang sangu
	avrMoneyElement.innerText = `Rp ${calcAvrMoney}`; // inject ke html

	// menghitung total umur
	const calculateAge = registrants.reduce(
		(acc, curr) => acc + curr.umur,
		0
	);
	const calcAvrAge = Math.floor(calculateAge / registrants.length); // menghitung rata-rata umur
	avrAgeElement.innerText = calcAvrAge; // inject ke html
};

// class pendaftar
class Registrant {
	// constructor yg akan diisi dengan input name, age, dan money pada fungsi handleSubmit
	constructor(name, age, money) {
		this.name = name;
		this.age = age;
		this.money = money;
	}
}

// class pelajar hemat pewarisan dari pendaftar
class FrugalStudent extends Registrant {
	constructor(name, age, money) {
		super(name, age, money);
	}

	// method yg akan dipanggil didalam fungsi handleSubmit saat kondisi tertentu terpenuhi
	greet() {
		return `Hallo <strong>${this.name}!</strong> Umur kamu <strong>${this.age}</strong> tahun, dan uang sangu kamu <strong>Rp${this.money}</strong>. Kamu termasuk pelajar yang hemat, itu bagus pertahankan ya.`;
	}
}

// class pelajar normal pewarisan dari pendaftar
class NormalStudent extends Registrant {
	constructor(name, age, money) {
		super(name, age, money);
	}

	// method yg akan dipanggil didalam fungsi handleSubmit saat kondisi tertentu terpenuhi
	greet() {
		return `Hallo <strong>${this.name}!</strong> Umur kamu <strong>${this.age}</strong> tahun, dan uang sangu kamu <strong>Rp${this.money}</strong>. Kamu termasuk pelajar yang normal, tapi jangan lupa ya untuk menabung.`;
	}
}

// class pelajar boros pewarisan dari pendaftar
class WastefulStudent extends Registrant {
	constructor(name, age, money) {
		super(name, age, money);
	}

	// method yg akan dipanggil didalam fungsi handleSubmit saat kondisi tertentu terpenuhi
	greet() {
		return `Hallo <strong>${this.name}!</strong> Umur kamu <strong>${this.age}</strong> tahun, dan uang sangu kamu <strong>Rp${this.money}</strong>. Kamu termasuk pelajar yang boros nih, kamu harus menyisihkan uang saku kamu untuk ditabung.`;
	}
}
