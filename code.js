"use strict"
// tabs jquery
$( function() {
    $( "#tabs" ).tabs();
});

// a matching memory card game built with classes and objects

// create a class for the cards
class Card {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.back = 'images/back.png';
        this.blank = 'images/blank.png';
    }

    getBack() {
        return this.back;
    }

    getBlank() {
        return this.blank;
    }

}

// create a class for the game
class Game {
    constructor() {
        this.cards = [];
        this.cardsInPlay = [];
        this.index = [];
        this.score = 0;
        this.matches = 0;
        this.attempts = 0;
        this.gameOver = false;
        this.createCards();
        this.shuffleCards();
        this.createBoard();
        //this.createScoreBoard();
    }

    // create the cards
    createCards() {
        const cardImages = [];
        const cardNames = [];
        for (let i = 1; i <= 24; i++) {
            cardImages.push(`images/card_${i}.png`);
            cardNames.push(`card_${i}`);
        };
       
        for (let i = 0; i < cardNames.length; i++) {
            const card1 = new Card(cardNames[i], cardImages[i]);
            const card2 = new Card(cardNames[i], cardImages[i]);
            this.cards.push(card1);
            this.cards.push(card2);
        }
        console.log("cards", this.cards);
    }

    // shuffle the cards
    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[r]] = [this.cards[r], this.cards[i]];
        }
        console.log("shuffled");
    }


    // create the board
    createBoard() {
        const board = document.getElementById("cards");
        board.innerHTML = "";
        for (let i = 0; i < this.cards.length; i++) {
            const backCard = new Image();
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.index = i;
            backCard.src = this.cards[i].back;
            backCard.setAttribute('id', i);
            card.appendChild(backCard);
            card.addEventListener("click", this.flipCard.bind(this));
            board.appendChild(card);
            console.log("card added");
        }
    }

    // create the score board
    createScoreBoard() {
        // const scoreBoard = document.getElementById("scoreBoard");
        // scoreBoard.innerHTML = "";
        // const score = document.createElement("div");
        // score.id = "score";
        // score.innerHTML = "Score: " + this.score;
        // scoreBoard.appendChild(score);
        // const matches = document.createElement("div");
        // matches.id = "matches";
        // matches.innerHTML = "Matches: " + this.matches;
        // scoreBoard.appendChild(matches);
        // const attempts = document.createElement("div");
        // attempts.id = "attempts";
        // attempts.innerHTML = "Attempts: " + this.attempts;
        // scoreBoard.appendChild(attempts);
    }

    // flip the card
    flipCard(event) {
        if (this.gameOver) {
            return;
        }
        const index = event.target;
        const card = this.cards[index.id];
        event.target.src = card.image;
        this.cardsInPlay.push(card);
        this.index.push(index);
        if (this.cardsInPlay.length === 2) {
            this.checkForMatch();
        }
    }

    // check for a match
    checkForMatch() {
        this.attempts++;
        if (this.cardsInPlay[0].name === this.cardsInPlay[1].name) {
            this.matches++;
            this.score += 10;

            console.log(this.cards[this.index[0].id]);

            console.log(this.cardsInPlay);
            this.cardsInPlay = [];
            if (this.matches === 8) {
                this.gameOver = true;
            }
            
            
        } else {
            this.score -= 5;
            setTimeout(this.flipCardsBack.bind(this), 1000);
        }
        this.createScoreBoard();
    }

    // flip the cards back
    flipCardsBack() {
        const board = document.getElementById("cards");
        for (let i = 0; i < board.children.length; i++) {
            board.children[i].firstChild.src = this.cards[i].back;
            console.log(board.children[i]);
        }
        this.cardsInPlay = [];
    }

    // reset the game
    resetGame() {
        this.cardsInPlay = [];
        this.score = 0;
        this.matches = 0;
        this.attempts = 0;
        this.gameOver = false;
        this.shuffleCards();
        this.createBoard();
       // this.createScoreBoard();
    }
}

// create a new game onclick
$("#new_game").click(function() {
    new Game();
});








