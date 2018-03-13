$(document).ready(function(){
	localStorage.clear();
});

let checks = [];

function searchPokemon(){
	let pokeName = "";
	pokeName = $(searchPoke).val();
	if(pokeName == "") {
		alert("Enter a pokemon!");
	} else {
		$("#pokemonTable").empty();
		let pokeObj = {
				name: "",
				id: "",
				height: "",
				weight: "",
				baseXP: "",
				types: [],
				stats: [],
				frontSprite: "",
				backSprite: "",
				abilities: []
		};
		$.ajax({
			type:'GET',
			url: 'https://pokeapi.co/api/v2/pokemon/' + pokeName
		}).done(function(data){
			pokeObj.name = capFirstLetter(data.name);
			pokeObj.id = data.id;
			pokeObj.height = data.height;
			pokeObj.weight = data.weight;
			pokeObj.baseXP = data.base_experience;
			pokeObj.frontSprite = data.sprites.front_default;
			pokeObj.backSprite = data.sprites.back_default;
			for (let i = 0; i < data.types.length; i++) {
				pokeObj.types.unshift(capFirstLetter(data.types[i].type.name));
			}
			for (let i = 0; i < data.abilities.length; i++) {
				pokeObj.abilities.unshift(capFirstLetter(data.abilities[i].ability.name));
			}
			for (let i = 0; i < data.stats.length; i++) {
				pokeObj.stats.unshift(data.stats[i].base_stat);
			}
		fillTable(pokeObj);
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
	
function fillTable(pokeObj2){
	if (checks.length == 0) {
		alert("Please select at least one option");
	} else {
		$("#pokemonTable").append('<tr><td><b>'+ "Pokémon:" + '</b></td><td><b>' + pokeObj2.name + '</b></td></tr>');
		if (checks.includes("id")) {
			$("#pokemonTable").append('<tr><td>'+ "PokéDex ID #:" + '</td><td>' + pokeObj2.id + '</td></tr>');
		}
		if (checks.includes("height")) {
			$("#pokemonTable").append('<tr><td>'+ "Height:" + '</td><td>' + pokeObj2.height + "cm" + '</td></tr>');
		}
		if (checks.includes("weight")) {
			$("#pokemonTable").append('<tr><td>'+ "Weight:" + '</td><td>' + pokeObj2.weight + "Kg" + '</td></tr>');
		}
		if (checks.includes("xp")) {
			$("#pokemonTable").append('<tr><td>'+ "Base Experience:" + '</td><td>' + pokeObj2.baseXP + "XP" + '</td></tr>');
		}
		if (checks.includes("stats")) {
			$("#pokemonTable").append('<tr><td>'+ "Base Stats (HP/Attack/Defense/Special Attack/Special Defense/Speed):" + '</td><td>' +
			 pokeObj2.stats[0] + "/" +
			 pokeObj2.stats[1] + "/" +
			 pokeObj2.stats[2] + "/" +
			 pokeObj2.stats[3] + "/" +
			 pokeObj2.stats[4] + "/" +
			 pokeObj2.stats[5] + '</td></tr>');
		}
		if (checks.includes("types")) {
			if (pokeObj2.types.length == 2) {
				$("#pokemonTable").append('<tr><td>'+ "Types" + '</td><td>' + pokeObj2.types[0] + "/" + pokeObj2.types[1]+ '</td></tr>');
			} else {
				$("#pokemonTable").append('<tr><td>'+ "Type" + '</td><td>' + pokeObj2.types[0]+ '</td></tr>');
			}
		}
		if (checks.includes("abilities")) {
			if (pokeObj2.abilities.length == 3) {
				$("#pokemonTable").append('<tr><td>'+ "Abilities" + '</td><td>' + pokeObj2.abilities[0] + "/" + pokeObj2.abilities[1] + "/" + pokeObj2.abilities[2] + '</td></tr>');
			} else if (pokeObj2.abilities.length == 2) {
				$("#pokemonTable").append('<tr><td>'+ "Abilities" + '</td><td>' + pokeObj2.abilities[0] + "/" + pokeObj2.abilities[1] + '</td></tr>');
			} else {
				$("#pokemonTable").append('<tr><td>'+ "Ability" + '</td><td>' + pokeObj2.abilities[0] + '</td></tr>');
			}
		}
		if (checks.includes("sprites")) {
			if (pokeObj2.backSprite == null) {
				$("#pokemonTable").append('<tr><td>'+ "Sprites:" + '</td><td>' + `<img src=${pokeObj2.frontSprite} />` + '</td></tr>')
			} else {
				$("#pokemonTable").append('<tr><td>'+ "Sprites:" + '</td><td>' + `<img src=${pokeObj2.frontSprite} />` + `<img src=${pokeObj2.backSprite} />` + '</td></tr>');
			}
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