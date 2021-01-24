const simple = document.querySelector('.simple');
const medium = document.querySelector('.medium');
const hard = document.querySelector('.hard');
const newGame = document.querySelector('.newGame');
const main = document.querySelector('.main');
const cardsField = document.querySelector('.game');
let renderedCards = [];
let choice = 1;
let bugCard = 0;

class Card {
	renderCard(isBug) {
		const card = document.createElement('div');
		card.classList.add('card');
		if (isBug) {
			card.innerHTML = `
        <img class="card-back" src="img/reverse.png">
        <img class="card-front" src="img/bug.png">
      `;
		} else {
			card.innerHTML = `
        <img class="card-front" src="img/game_over.png">
        <img class="card-back" src="img/reverse.png">
      `;
		};
		cardsField.append(card);
	};

	generateCards(cards, level) {
		bugCard = Math.floor(Math.random() * cards);
		for (let i = 0; i < cards; i++) {
			if (i === bugCard) {
				this.renderCard(true);
			} else {
				this.renderCard(false);
			};
		}
		cardsField.className = `game-${level}`;
	};

	renderCards(choice) {
		switch (choice) {
			case 1:
				this.generateCards(3, 'simple');
				break;

			case 2:
				this.generateCards(6, 'medium');
				break;

			case 3:
				this.generateCards(10, 'hard');
				break;
		}
	};
};

const cards = new Card();

const goToMenu = function () {
	cardsField.innerHTML = '';
	cardsField.className = '';
	document.body.classList.remove('flex');
	main.classList.remove('none');
};

simple.addEventListener('click', () => {
	choice = 1;
	medium.classList.remove('selected');
	simple.classList.add('selected');
	hard.classList.remove('selected');
});

medium.addEventListener('click', () => {
	choice = 2;
	medium.classList.add('selected');
	simple.classList.remove('selected');
	hard.classList.remove('selected');
});

hard.addEventListener('click', () => {
	choice = 3;
	hard.classList.add('selected');
	simple.classList.remove('selected');
	medium.classList.remove('selected');
});

newGame.addEventListener('click', () => {
	cardsField.removeEventListener('click', goToMenu);
	main.classList.add('none');
	document.body.classList.add('flex');
	cards.renderCards(choice);
	renderedCards = document.querySelectorAll('.card');
	for (let i = 0; i < renderedCards.length; i++) {
		renderedCards[i].addEventListener('click', function () {
			renderedCards[i].classList.add('rotate');
			setTimeout(function () {
				cardsField.addEventListener('click', goToMenu, { once: true });
			}, 400);
		});
	};
});