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

// getting player name, high score and number of cards from session storage
let numberCards = sessionStorage.getItem('numberCards');
let playerName = sessionStorage.getItem('playerName');
let highScore = sessionStorage.getItem('highScore');
$('#player_name').val(playerName);
$('#player').text(playerName);
$('#high_score').text(highScore);

// ------------------------------------------------------------

// variables

const cardsArray = []; // an array of all card images
let indexArray = []; // an index of random indexes for the cards
let randomizedCardArray = []; // array of image src for the flip side of cards
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
        randomizedCardArray.push(cardsArray[randomNumber]);
        indexArray.push(randomNumber);
    };
} while (randomizedCardArray.length < numberCards);

console.log(randomizedCardArray);

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
let blankCards = 0; // count the cards out of play
let successCount = 0; // count the successsful mathches
let failCount = 0; // count the unsuccessful mathches
let children = $('#cards').children(); // array of cards displayed in the game

// ------------------------------------------------------------

// game logic functions

// change the image source of the card to blank or back card
function changeBack (image, card1, card2) {
    setTimeout(() => {
        // change the image source of the card to back card with fade animations
        if (image == 'images/back.png') {

            children.eq(card1).fadeOut(500, function() {
                children[card1].src = image;
                children.eq(card1).fadeIn(500);
            });

            children.eq(card2).fadeOut(500, function() {
                children[card2].src = image;
                children.eq(card2).fadeIn(500);
            });
        }
        // change the image source of the card to blank card with fade/slide animations
        if (image == 'images/blank.png') {

            children.eq(card1).animate({ height: "toggle" }, 500, function() {
                children[card1].src = image;
                children.eq(card1).animate({ height: "toggle" }, 500);
            });

            children.eq(card2).animate({ height: "toggle" }, 500, function() {
                children[card2].src = image;
                children.eq(card2).animate({ height: "toggle" }, 500);
            });
        }
        clickCount = 0;
        clickArray = [];
    }, "2000")
}

// game over check and display
function gameOverCheck() {
    if (blankCards == numberCards) {
        setTimeout(() => {
            document.getElementById('game-over').classList.remove('hidden');
            document.getElementById('cards').classList.add('hidden');
        }, "3000");
        let correct = parseInt($('#correct').text());
        if(highScore < correct) {
            highScore = correct;
            sessionStorage.setItem('highScore', highScore);
        }
    }
}   

// Success percentage check and display
function correctPercentage() {
    let successPercent = (successCount / (successCount+failCount)) * 100
    if (isNaN(successPercent)) {
        $('#correct').text('0%');
    } else {
        $('#correct').text(`${successPercent.toFixed()}%`);
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
            $(this).fadeOut(500, function() {
                $(this).attr('src', randomizedCardArray[card]);
                $(this).fadeIn(500);
            });

        // if click count is 1 run the following code
        } else if (clickCount === 1) {
            clickArray[clickCount] = card;
            clickCount++;

            // change the image source of the clicked card to the card image
            $(this).fadeOut(500, function() {
                $(this).attr('src', randomizedCardArray[card]);
                $(this).fadeIn(500);
            });

                // if cards match, display blank card and reset click counter and array
                if (randomizedCardArray[clickArray[0]] === randomizedCardArray[clickArray[1]] && clickArray[0] !== clickArray[1]) {
                    console.log('match');
                    changeBack('images/blank.png', clickArray[0], clickArray[1]);
                    blankCards += 2;
                    successCount++;

                // if cards do not match, display blank card and reset click counter and array
                } else {
                    console.log('no match');
                    changeBack('images/back.png', clickArray[0], clickArray[1]);
                    failCount++;
                }
                correctPercentage(); // display the correct percentage
        } else {
            clickCount = 0;
            clickArray = [];
        }
    }
    
    gameOverCheck();

});

