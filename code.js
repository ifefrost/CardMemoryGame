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
    }

}

// create a class for the game
class Game {
    constructor() {
        this.cards = [];
        this.cardsInPlay = [];
        this.index = [];
        this.successCount = 0;
        this.attempts = 0;
        this.percent = 0;
        this.createCards();
        this.shuffleCards();
        this.createBoard();
        this.scoreBoard();
        this.gameOver();
    }

    // create the cards
    createCards() {
        const cardImages = [];
        const cardNames = [];
        for (let i = 1; i <= 24; i++) {
            cardImages.push(`images/card_${i}.png`);
            cardNames.push(`card_${i}`);
        };
       
        for (let i = 0; i < (sessionStorage.getItem('numberCards'))/2; i++) {
            const card1 = new Card(cardNames[i], cardImages[i]);
            const card2 = new Card(cardNames[i], cardImages[i]);
            this.cards.push(card1);
            this.cards.push(card2);
        }
    }

    // shuffle the cards
    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[r]] = [this.cards[r], this.cards[i]];
        }
    }


    // create the board
    createBoard() {
        const board = document.getElementById("cards");
        const game_over = document.getElementById("game-over");
        board.classList.remove("hidden");
        game_over.classList.add("hidden");
        board.innerHTML = "";
        for (let i = 0; i < this.cards.length; i++) {
            const backCard = new Image();
            const card = document.createElement("div");
            card.classList.add("card");
            backCard.src = this.cards[i].back;
            backCard.setAttribute('id', i);
            card.appendChild(backCard);
            card.addEventListener("click", this.flipCard.bind(this));
            board.appendChild(card);
        }
    }

    // create the score board
    scoreBoard() {
        const playerName = document.getElementById("player");
        playerName.innerHTML = sessionStorage.getItem('playerName');
        const percentCorrect = document.getElementById("correct");
        this.percent = ((this.successCount / this.attempts) * 100).toFixed();

        if (isNaN(this.percent)) {
            percentCorrect.innerHTML = "0%";
        } else {
            percentCorrect.innerHTML = `${this.percent}%`;
        }
       
    }

    // flip the card
    flipCard(event) {
        if (this.cardsInPlay.length < 2 && !event.target.src.includes("blank.png")) {
            const index = event.target;
            const card = this.cards[index.id];

            $(`#${index.id}`).fadeOut(500, function() {
                event.target.src = card.image;
                $(`#${index.id}`).fadeIn(500);
            });
            this.cardsInPlay.push(card);
            this.index.push(index);
            
            if (this.cardsInPlay.length === 2 && this.index[0].id != this.index[1].id) {
                this.checkForMatch();
            }
        }
    }

    // check for a match
    checkForMatch() {
        this.attempts++;

        if (this.cardsInPlay[0].name === this.cardsInPlay[1].name) {

            this.successCount++;
            setTimeout(this.flipCardsBack.bind(this, 'images/blank.png'), 2000);
            
        } else {
            setTimeout(this.flipCardsBack.bind(this, 'images/back.png'), 2000);
        }

        this.scoreBoard();

    }

    // flip the cards back
    flipCardsBack(card) {

        const firstID = this.index[0].id;
        const secondID = this.index[1].id;

        if (card === 'images/blank.png') {
            const board = document.getElementById("cards");

            $(`#${this.index[0].id}`).animate({ height: "toggle" }, 500, function() {
                board.children[firstID].firstChild.src = card;
                $(`#${firstID}`).animate({ height: "toggle" }, 500);
            });

            
            $(`#${this.index[1].id}`).animate({ height: "toggle" }, 500, function() {
                board.children[secondID].firstChild.src = card;
                $(`#${secondID}`).animate({ height: "toggle" }, 500);
            });

            setTimeout(() => {
                this.gameOver();
            }, 5000);

        } 
        if (card === 'images/back.png') {
            const board = document.getElementById("cards");

            $(`#${firstID}`).fadeOut(500, function() {
                board.children[firstID].firstChild.src = card;
                $(`#${firstID}`).delay(200).fadeIn(500);
            });

            $(`#${secondID}`).fadeOut(500, function() {
                board.children[secondID].firstChild.src = card;
                $(`#${secondID}`).delay(200).fadeIn(500);
            });
            
        }

        this.index = [];
        this.cardsInPlay = [];
    }

    gameOver() {
        if (this.successCount === (this.cards.length / 2)) {

            const board = document.getElementById("cards");
            const game_over = document.getElementById("game-over");
            board.classList.add("hidden");
            game_over.classList.remove("hidden");

            if (this.percent > sessionStorage.getItem('highscore')) {
                sessionStorage.setItem('highscore', this.percent);
                const highScore = document.getElementById("high_score");
                highScore.innerHTML = `${this.percent}%`;
            }
        }
    }
}

$('#save_settings').click(function() {
    const playerName = $('#player_name').val();
    const numberCards = $('#num_cards').val();
    sessionStorage.setItem('playerName', playerName);
    sessionStorage.setItem('numberCards', numberCards);
    new Game();
    $("#tabs").tabs('option', 'active', 0);
});

// create a new game onclick
$("#new_game").click(function() {
    if (sessionStorage.getItem('numberCards') !== null) {
        new Game();
    } else {
        alert("Please set your settings first");
        $("#tabs").tabs('option', 'active', 2);
    }
});





