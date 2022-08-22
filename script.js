// Parametros globais
let parameter = 0;
let cardsQty = 0;
let resto;
let flippedCards = 0;
let plays = 0;
let flippedACard = false;
let firstCard, secondCard;

const bobross = `
	<div class="card-back">
		<img src="media/bobrossparrot.gif" alt="Memory" />
	</div>
`;

const explody = `
	<div class="card-back">
		<img src="media/explodyparrot.gif" alt="Memory" />
	</div>
`;

const fiesta = `
	<div class="card-back">
		<img src="media/fiestaparrot.gif" alt="Memory" />
	</div>
`;

const metal = `
	<div class="card-back">
		<img src="media/metalparrot.gif" alt="Memory" />
	</div>
`;

const revertit = `
	<div class="card-back">
		<img src="media/revertitparrot.gif" alt="Memory" />
	</div>
`;

const triplets = `
	<div class="card-back">
		<img src="media/tripletsparrot.gif" alt="Memory" />
	</div>
`;

const unicorn = `
	<div class="card-back">
		<img src="media/unicornparrot.gif" alt="Memory" />
	</div>
`;

let cards = [
	bobross,
	bobross,
	explody,
	explody,
	fiesta,
	fiesta,
	metal,
	metal,
	revertit,
	revertit,
	triplets,
	triplets,
	unicorn,
	unicorn,
];

// Perguntar com quantas cartas deseja jogar
while (parameter === 0) {
	if (cardsQty < 4 || cardsQty > 14 || resto !== 0) {
		cardsQty = Number(prompt('Com quantas cartas quer jogar? (4 a 14)'));
		parameter = 0;
		resto = cardsQty % 2;
	} else {
		parameter = 1;
	}
}

// Montar jogo de acordo com número de cartas
const theGame = document.querySelector('.game');
for (let i = 0; i < cardsQty; i += 2) {
	theGame.innerHTML += `
        <div class="card" onclick="flipCard(this)">
            <div class="card-inner">
                <div class="card-front">
                    <img src="media/front.png" alt="Parrot" />
                </div>
                ${cards[i]}
            </div>
        </div>
        <div class="card" onclick="flipCard(this)">
            <div class="card-inner">
                <div class="card-front">
                    <img src="media/front.png" alt="Parrot" />
                </div>
                ${cards[i + 1]}
            </div>
        </div>
        `;
}

// Funções ao clicar as cartas
function flipCard(thisCard) {
	const flippingCard = thisCard.querySelector('.card-inner');

	flippingCard.classList.add('clicked');
	flippingCard.classList.add('right');

	flippedCards++;
	plays = Math.ceil(flippedCards / 2);

	if (!flippedACard) {
		flippedACard = true;
		firstCard = thisCard;
	} else {
		secondCard = thisCard;
		flippedACard = false;
		checkMatch();
	}
}

// Confere se são um par e realiza ações dependendo do resultado
function checkMatch() {
	if (firstCard.querySelector('.card-back img').src === secondCard.querySelector('.card-back img').src) {
		disableCards();
	} else {
		unflipCards();
	}
}

// Remove a classe clicada e mantém a classe "certo" caso sejam um par
function disableCards() {
	const reset = document.querySelectorAll('.clicked');
	reset.forEach((clicked) => clicked.classList.remove('clicked'));
}

// Remove as classes e desvira as cartas caso não sejam um par
function unflipCards() {
	const reset = document.querySelectorAll('.clicked');
	reset.forEach((clicked) => clicked.classList.remove('clicked'));
	setTimeout(() => {
		reset.forEach((right) => right.classList.remove('right'));
	}, 2000);
}
