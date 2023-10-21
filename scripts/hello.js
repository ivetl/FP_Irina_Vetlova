function hello() {
	// Запрос имени пользователя
	let name = prompt("Введите Ваше имя:");

	// Приведение имени к верхнему регистру
	name = name.charAt(0).toUpperCase() + name.slice(1);

	let age;

	// Запрос возраста пользователя
	do {
		age = parseInt(prompt("Введите Ваш возраст:"));
		if (age < 0 || isNaN(age)) {
			alert("Введите корректный возраст");
		}
	} while (age < 0 || isNaN(age));

	// Вывод информации о пользователе
	alert("Привет, " + name + ", тебе уже " + age + " лет!");
}

