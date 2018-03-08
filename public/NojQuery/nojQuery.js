//Version of app without using jQuery. Also uses fetch instead of AJAX 

const tHead = document.getElementById("tHead");
const tBody = document.getElementById("tBody");
const searchPoke = document.getElementById("searchPoke");

let checks = [];

function searchPokemon(){
	let pokeName = searchPoke.value;
	if(pokeName == "") {
		alert("Enter a pokemon!");
	} else {
		while (tHead.firstChild) {
            tHead.removeChild(tHead.firstChild);
		}
		while (tBody.firstChild) {
            tBody.removeChild(tBody.firstChild);
		}
		let url = 'https://pokeapi.co/api/v2/pokemon/' + pokeName
		fetch(url)
		.then(response => {
			console.log(response)
			return response.json();
		}).then(data => {
			console.log(data)
			fillTable(data);
		})
	}
}

function capFirstLetter(x) {
	for (let j in x) {
		if (j == 0) {
			x = x.replace(x[j], x[j].toUpperCase());
		}
		if (x[j-1] == "-") {
			x = x.replace(x[j], x[j].toUpperCase());
			x = x.replace(x[j-1], " ");
		}
	}
	return x;
}
	
function fillTable(pokeObj){
	if (checks.length == 0) {
		alert("Please select at least one option");
	} else {
		tHead.innerHTML = '<tr><td><b>'+ "Pokémon:" + '</b></td><td><b>' + 
			capFirstLetter(pokeObj.name) + '</b></td></tr>';
		if (checks.includes("id")) {
			tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "PokéDex ID #:" + '</td><td>' + 
				pokeObj.id + '</td></tr>');
		}
		if (checks.includes("height")) {
			tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Height:" + '</td><td>' + 
				pokeObj.height + "cm" + '</td></tr>');
		}
		if (checks.includes("weight")) {
			tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Weight:" + '</td><td>' + 
				pokeObj.weight + "Kg" + '</td></tr>');
		}
		if (checks.includes("xp")) {
			tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Base Experience:" + '</td><td>' + 
				pokeObj.base_experience + "XP" + '</td></tr>');
		}
		if (checks.includes("stats")) {
			tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Base Stats (HP/Attack/Defense/Special Attack/Special Defense/Speed):" + '</td><td>' +
			 pokeObj.stats[5].base_stat + "/" +
			 pokeObj.stats[4].base_stat + "/" +
			 pokeObj.stats[3].base_stat + "/" +
			 pokeObj.stats[2].base_stat + "/" +
			 pokeObj.stats[1].base_stat + "/" +
			 pokeObj.stats[0].base_stat + '</td></tr>');
		}
		if (checks.includes("types")) {
			if (pokeObj.types.length == 2) {
				tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Types" + '</td><td>' + 
					capFirstLetter(pokeObj.types[1].type.name) + "/" + 
					capFirstLetter(pokeObj.types[0].type.name) + '</td></tr>');
			} else {
				tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Type" + '</td><td>' + capFirstLetter(pokeObj.types[0].type.name) + '</td></tr>');
			}
		}
		if (checks.includes("abilities")) {
			if (pokeObj.abilities.length == 3) {
				tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Abilities" + '</td><td>' + 
					capFirstLetter(pokeObj.abilities[2].ability.name) + "/" + 
					capFirstLetter(pokeObj.abilities[1].ability.name) + "/" + 
					capFirstLetter(pokeObj.abilities[0].ability.name) + '</td></tr>');
			} else if (pokeObj.abilities.length == 2) {
				tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Abilities" + '</td><td>' + 
					capFirstLetter(pokeObj.abilities[1].ability.name) + "/" + 
					capFirstLetter(pokeObj.abilities[0].ability.name )+ '</td></tr>');
			} else {
				tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Ability" + '</td><td>' + 
					capFirstLetter(pokeObj.abilities[0].ability.name) + '</td></tr>');
			}
		}
		if (checks.includes("sprites")) {
			tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Sprites:" + '</td><td>' + 
				`<img src=${pokeObj.sprites.front_default} />` +
				`<img src=${pokeObj.sprites.back_default} />` + '</td></tr>');
		}
	}
}

function checkBoxes(box) {
	if (box.checked) {
		checks.push(box.id);
	} else {
		if (checks.includes(box.id)) {
			checks.splice(checks.indexOf(box.id), 1);
		}
	}
}