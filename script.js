"use strict"
// tabs jquery
$( function() {
    $( "#tabs" ).tabs();
});
// save player name and number of cards to session storage
$('#save_settings').click(function() {
    const playerName = $('#player_name').val();
    const numberCards = $('#num_cards').val();
    sessionStorage.setItem('playerName', playerName);
    sessionStorage.setItem('numberCards', numberCards);
    location.reload();
});

// ------------------------------------------------------------

// getting player name and number of cards from session storage
let numberCards = sessionStorage.getItem('numberCards');
let playerName = sessionStorage.getItem('playerName');
$('#player_name').val(playerName);
$('#player').text(playerName);

// ------------------------------------------------------------

// variables

const cardsArray = []; // an array of all card images
let indexArray = []; // an index of random indexes for the cards
let cardBackArray = []; // array of image src for the flip side of cards
const backCards = []; // an array of back card images

// ------------------------------------------------------------

// push 2 of each card image to array

for (let i = 1; i < 48; i++) {
    cardsArray.push(`images/card_${i}.png`);
    cardsArray.push(`images/card_${i}.png`);
};

// ------------------------------------------------------------

// assign a random index for the flip side of the cardback

function randomIndex() {
    return Math.floor(Math.random() * numberCards);
};

do { 
    let randomNumber = randomIndex();
    if (!indexArray.includes(randomNumber)) {
        cardBackArray.push(cardsArray[randomNumber]);
        indexArray.push(randomNumber);
    };
} while (cardBackArray.length < numberCards);

console.log(cardBackArray);

// ------------------------------------------------------------

// display a back card for each card to be displayed in the game

for (let i = 0; i < numberCards; i++) {
    backCards[i] = new Image();
    backCards[i].src = 'images/back.png';
    backCards[i].setAttribute('id', i); // set id to index of card in array
}

$('#cards').append(backCards); // append back cards to game board

// ------------------------------------------------------------

// game logic variables

let clickCount = 0; // count the number of clicks
let clickArray = []; // array to compare the cards clicked
let gamePoints = 0; // count the game points

let children = $('#cards').children(); // array of cards displayed in the game

// ------------------------------------------------------------

// game logic functions

// change the image source of the card to blank or back card
function changeBack (image, card1, card2) {
    setTimeout(() => {
        children[card1].src = image;
        children[card2].src = image;
        clickCount = 0;
        clickArray = [];
    }, "1000")
}

// game over check and display
function gameOverCheck() {
    if (gamePoints == numberCards) {
        setTimeout(() => {
            document.getElementById('game-over').classList.remove('hidden');
            document.getElementById('cards').classList.add('hidden');
        }, "1000")
    }
}

// ------------------------------------------------------------

// game logic

// when user clicks a card this function is called
$('#cards').on('click', 'img', function() {

    // get the image source of the clicked card
    let cardSRC = this.src;
    cardSRC = cardSRC.split("1/").pop();
    // get the id of the clicked card
    let card = this.id;

    // if the card is not blank run the following code
    if (cardSRC != 'images/blank.png') {

        // if click count is 0 run the following code
        if (clickCount === 0) {
            clickArray[clickCount] = card;
            clickCount++;
            // change the image source of the clicked card to the card image
            $(this).attr('src', cardBackArray[card]);

        // if click count is 1 run the following code
        } else if (clickCount === 1) {
            clickArray[clickCount] = card;
            clickCount++;
            // change the image source of the clicked card to the card image
            $(this).attr('src', cardBackArray[card]); 

                // if cards match, display blank card and reset click counter and array
                if (cardBackArray[clickArray[0]] === cardBackArray[clickArray[1]] && clickArray[0] !== clickArray[1]) {
                    console.log('match');
                    changeBack('images/blank.png', clickArray[0], clickArray[1]);
                    gamePoints += 2;
                    console.log(gamePoints);

                // if cards do not match, display blank card and reset click counter and array
                } else {
                    console.log('no match');
                    changeBack('images/back.png', clickArray[0], clickArray[1]);
                }

        } else {
            clickCount = 0;
            clickArray = [];
        }
    }

    gameOverCheck();

});

