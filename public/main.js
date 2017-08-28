$(document).ready(function(){
	localStorage.clear();
});

function searchPokemon(){
	let pokeName = "";
	pokeName = $(searchPoke).val();
	if(pokeName == "") {
		alert("Enter a pokemon!");
	} else {
		let pokeObj = {
				name: "",
				id: "",
				height: "",
				baseXP: "",
				types: [],
				frontSprite: "",
				backSprite: ""
		};
		$.ajax({
			type:'GET',
			url: 'https://pokeapi.co/api/v2/pokemon/' + pokeName
		}).done(function(data){
			pokeObj.name = data.name;
			pokeObj.id = data.id;
			pokeObj.height = data.height;
			pokeObj.baseXP = data.base_experience;
			pokeObj.frontSprite = data.sprites.front_default;
			pokeObj.backSprite = data.sprites.back_default;
			for (let i = 0; i < data.types.length; i++) {
				pokeObj.types.push(data.types[i]);
			}
		fillTable(pokeObj);
	})
	}
}
	
function fillTable(pokeObj2){
	console.log(pokeObj2);
	$(pokemonName).html(pokeObj2.name);
	$("#pokemonTable").append('<tr><td>'+ "PokeDex ID #:" + '</td><td>' + pokeObj2.id + '</td></tr>');
	$("#pokemonTable").append('<tr><td>'+ "Height:" + '</td><td>' + pokeObj2.height + "cm" + '</td></tr>');
	$("#pokemonTable").append('<tr><td>'+ "Base Experience:" + '</td><td>' + pokeObj2.baseXP + "XP" + '</td></tr>');
	if (pokeObj2.types.length == 2) {
		$("#pokemonTable").append('<tr><td>'+ "Types" + '</td><td>' + pokeObj2.types[1].type.name + "/" + pokeObj2.types[0].type.name + '</td></tr>');
	}	else {
			$("#pokemonTable").append('<tr><td>'+ "Types" + '</td><td>' + pokeObj2.types[0].type.name + '</td></tr>');
		}
	$("#pokemonTable").append('<tr><td>'+ "Sprites:" + '</td><td>' + `<img src=${pokeObj2.frontSprite} />` + `<img src=${pokeObj2.backSprite} />` + '</td></tr>');

	// let table = document.getElementById('pokemonTable');
	// let row = document.createElement('tr');
	// let cell = document.createElement('td');
	// row.appendChild(cell.innerHTML = "PokeDex ID #");
	// row.appendChild(cell.innerHTML = pokeObj.id);
	// $(pokemonTable).append(row);
	// if ($(idBox) == true) {
	// 	table.appendChild(row.appendChild(cell.appendChild(document.createTextNode("PokeDex ID #:"))));
	// 	table.appendChild(row.appendChild(cell.appendChild(document.createTextNode(pokeObj.id))));
	// }
	// if ($('#heightBox') == true) {
	//	table.append('<tr><td>' + "Height:" +'</td></tr>')	
	// 	table.appendChild(row.appendChild(cell.appendChild(document.createTextNode(pokeObj.height))));
	// }
	// if ($('#baseXPBox') == true) {
	//	table.append('<tr><td>' + "Base XP Yield:" +'</td></tr>')
	// 	table.appendChild(row.appendChild(cell.appendChild(document.createTextNode(pokeObj.baseXP))));
	// }
	// if ($('#typeBox') == true) {
	//	 for (let i = 0; i < pokeObj.types.length; i++){
		//	table.append('<tr><td>' + "Type:" +'</td></tr>')
		//	table.appendChild(row.appendChild(cell.appendChild(document.createTextNode(pokeObj.types[i]))));
	//	}
	// }
	// if ($('#spriteBox') == true) {
	//	table.append('<tr><td>' + "Sprites:" +'</td></tr>')
	// 	table.appendChild(row.appendChild(cell.appendChild(pokeObj.front_sprite, pokeObj.back_sprite))));
	// }
	}
