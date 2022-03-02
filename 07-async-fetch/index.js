const pokeContainer = document.querySelector("#poke-container");
const pokeForm = document.querySelector("#poke-form");

pokeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.querySelector("#name-input").value;
  const img = document.querySelector("#img-input").value;
  renderPokemon(newChar);
  pokeForm.reset();
});

function getPokemon () {
  return fetch("http://localhost:3000/characters")
  .then(resp => resp.json())
  .then(characters => {
    characters.forEach(char => {
      return renderPokemon(char)
    })
  })
}


function renderPokemon(char) {
  const pokeCard = document.createElement("div");
  pokeCard.id = `poke-${char.id}`;
  pokeCard.className = "poke-card";

  pokeCard.addEventListener("click", () => showCharacter(char));

  const pokeImg = document.createElement("img");
  pokeImg.src = char.img;
  pokeImg.alt = `${char.name} image`;

  const pokeName = document.createElement("h3");
  pokeName.textContent = char.name;

  const pokeLikes = document.createElement("h3");
  pokeLikes.textContent = "Likes: ";

  const likeNum = document.createElement("h3");
  likeNum.className = "likes-num";
  likeNum.textContent = char.likes;

  const likesBttn = document.createElement("button");
  likesBttn.className = "like-bttn";
  likesBttn.textContent = "♥";
  likesBttn.addEventListener("click", function () {
    ++char.likes;
    likeNum.textContent = char.likes;
  });

  const deleteBttn = document.createElement("button");
  deleteBttn.className = "delete-bttn";
  deleteBttn.textContent = "delete";
  deleteBttn.addEventListener("click", function () {
    pokeCard.remove();
  });

  pokeCard.append(pokeImg, pokeName, pokeLikes, likeNum, likesBttn, deleteBttn);

  pokeCard.addEventListener('click', () => showCharacter(char))
  pokeContainer.appendChild(pokeCard);
}

function showCharacter (character) {
  fetch(`http://localhost:3000/characters/${character}`)
  .then(resp => resp.json())
  .then(char => console.log(char))
}

