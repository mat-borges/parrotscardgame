// Parametros globais
let parameter = 0;
let cardsQty = 0;
let resto;
let flippedCards = 0;
let plays = 0;
let flippedACard = false;
let firstCard, secondCard;
let innerGame = [];
let minutes = 0;
let seconds = 0;
let intervalID = 0;
const theGame = document.querySelector('.game');
const timerMin = document.querySelector('.minutes');
const timerSec = document.querySelector('.seconds');
// timer
function timer() {
	if (seconds == 60) {
		seconds = 0;
		minutes++;
	} else {
		seconds++;
	}

	if (minutes < 10) {
		timerMin.innerHTML = `0${minutes}`;
	} else {
		timerMin.innerHTML = `${minutes}`;
	}

	if (seconds < 10) {
		timerSec.innerHTML = `0${seconds}`;
	} else {
		timerSec.innerHTML = `${seconds}`;
	}
}

// Cartas
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
// fim cartas

let cards = [bobross, explody, fiesta, metal, revertit, triplets, unicorn];

resetVariables();
function resetVariables() {
	parameter = 0;
	cardsQty = 0;
	flippedCards = 0;
	plays = 0;
	resto = 0;
	flippedACard = false;
	cards.sort(comparador);
	theGame.innerHTML = ``;
	innerGame = [];
	clearInterval(intervalID);
	minutes = 0;
	seconds = 0;
}
// Perguntar com quantas cartas deseja jogar
startGame();
function startGame() {
	while (parameter === 0) {
		if (cardsQty < 4 || cardsQty > 14 || resto !== 0) {
			cardsQty = Number(prompt('Com quantas cartas quer jogar? (4 a 14)'));
			parameter = 0;
			resto = cardsQty % 2;
		} else {
			parameter = 1;
		}
	}
}

// Randomizador
function comparador() {
	return Math.random() - 0.5;
}

// Montar jogo de acordo com número de cartas

arrangeCards();
function arrangeCards() {
	for (let i = 0; i < cardsQty / 2; i++) {
		innerGame.push(`
        <div class="card" onclick="flipCard(this)">
            <div class="card-inner">
                <div class="card-front">
                    <img src="media/front.png" alt="Parrot" />
                </div>
                ${cards[i]}
            </div>
        </div>
        `);
		innerGame.push(`
        <div class="card" onclick="flipCard(this)">
            <div class="card-inner">
                <div class="card-front">
                    <img src="media/front.png" alt="Parrot" />
                </div>
                ${cards[i]}
            </div>
        </div>
        `);
	}

	innerGame.sort(comparador);

	for (let i = 0; i < innerGame.length; i++) {
		theGame.innerHTML += innerGame[i];
	}

	//Timer
	intervalID = setInterval(timer, 1000);
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
		setTimeout(winGame, 700);
	}
}

// Confere se são um par e realiza ações dependendo do resultado
function checkMatch() {
	if (firstCard.querySelector('.card-back img').src === secondCard.querySelector('.card-back img').src) {
		disableCards();
	} else {
		unflipCards();
		const pause = document.querySelector('.big-box');
		pause.classList.add('pause-box');
		setTimeout(() => {
			pause.classList.remove('pause-box');
		}, 1000);
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
	}, 1000);
}

function winGame() {
	const winner = document.querySelectorAll('.right');
	if (winner.length === cardsQty) {
		alert(`Parabéns, você ganhou em ${plays} jogadas (${flippedCards} clicks) \n\n ${minutes} min e ${seconds} s`);
		const restart = prompt('Quer jogar de novo? (sim/não)');
		if (restart === 'sim') {
			resetVariables();
			startGame();
			arrangeCards();
		} else if (restart === 'não') {
			const pause = document.querySelector('.big-box');
			pause.classList.add('pause-box');
			clearInterval(intervalID);
		}
	}
}
