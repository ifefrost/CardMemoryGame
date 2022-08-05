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

// an array of all card images
const cardsArray = [];
// push 2 of each card image to array
for (let i = 1; i < 48; i++) {
    cardsArray.push(`images/card_${i}.png`);
    cardsArray.push(`images/card_${i}.png`);
};

// getting player name and number of cards from session storage
let numberCards = sessionStorage.getItem('numberCards');
let playerName = sessionStorage.getItem('playerName');
$('#player_name').val(playerName);
$('#player').text(playerName);

// create image array for back of cards
let indexArray = [];
let cardBackArray = [];

const setImages = () => {
    do { let randomNumber = randomIndex();
        if (!indexArray.includes(randomNumber)) {
           cardBackArray.push(cardsArray[randomNumber]);
           indexArray.push(randomNumber);
       };
   } while (cardBackArray.length < numberCards);
}

setImages();

console.log(cardBackArray);

// random index generator between 0 
// and number of cards specified by user in settings
function randomIndex() {
    return Math.floor(Math.random() * numberCards);
};

const backCards = [];
// display a back card for each card to be displayed in the game
for (let i = 0; i < numberCards; i++) {
    backCards[i] = new Image(); // create image object for blank card
    backCards[i].src = 'images/back.png'; // set image source to back card
    backCards[i].setAttribute('id', i); // set id to index of card in array
}
$('#cards').append(backCards); // append back cards to game board

// create click counter and array to store clicked card values
let clickCount = 0;
let clickArray = [];

// create array to store displayed cards
let children = $('#cards').children();

let gameOver = 0;

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
                    gameOver += 2;
                    console.log(gameOver);

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
    if (gameOver == numberCards) {
        setTimeout(() => {
            document.getElementById('game-over').classList.remove('hidden');
            document.getElementById('cards').classList.add('hidden');
        }, "1000")
    }
}




