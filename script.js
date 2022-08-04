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
const cardsArray = [
    'images/card_1.png',
    'images/card_1.png',
    'images/card_2.png',
    'images/card_2.png',
    'images/card_3.png',
    'images/card_3.png',
    'images/card_4.png',
    'images/card_4.png',
    'images/card_5.png',
    'images/card_5.png',
    'images/card_6.png',
    'images/card_6.png',
    'images/card_7.png',
    'images/card_7.png',
    'images/card_8.png',
    'images/card_8.png',
    'images/card_9.png',
    'images/card_9.png',
    'images/card_10.png',
    'images/card_10.png',
    'images/card_11.png',
    'images/card_11.png',
    'images/card_12.png',
    'images/card_12.png',
    'images/card_13.png',
    'images/card_13.png',
    'images/card_14.png',
    'images/card_14.png',
    'images/card_15.png',
    'images/card_15.png',
    'images/card_16.png',
    'images/card_16.png',
    'images/card_17.png',
    'images/card_17.png',
    'images/card_18.png',
    'images/card_18.png',
    'images/card_19.png',
    'images/card_19.png',
    'images/card_20.png',
    'images/card_20.png',
    'images/card_21.png',
    'images/card_21.png',
    'images/card_22.png',
    'images/card_22.png',
    'images/card_23.png',
    'images/card_23.png',
    'images/card_24.png',
    'images/card_24.png',
    'images/back.png',
    'images/blank.png'
];


let numberCards = sessionStorage.getItem('numberCards');
let playerName = sessionStorage.getItem('playerName');
$('#player_name').val(playerName);
$('#player').text(playerName);

// create image array
let indexArray = [];
let imagesArray = [];

const setImages = () => {
    do { let randomNumber = randomIndex();
        if (!indexArray.includes(randomNumber)) {
           imagesArray.push(cardsArray[randomNumber]);
           indexArray.push(randomNumber);
       };
   } while (imagesArray.length < numberCards);
}

// random index generator between 0 
// and number of cards specified by user in settings
function randomIndex() {
    return Math.floor(Math.random() * numberCards);
};

// display a back card for each card to be displayed in the game
for (let i = 0; i < numberCards; i++) {
    let backCard = new Image(); // create image object for blank card
    backCard.src = 'images/back.png'; // set image source to back card 
    $('#cards').append(backCard); // append back card to cards div
}

// create click counter and array to store clicked card values
let clickCount = 0;
let clickArray = [];

// create array to store displayed cards
let children = $('#cards').children();
setImages();













































// for each card displayed on the page, add a click event listener
// for (let i= 0; i < children.length; i++) {
//     children[i].addEventListener('click', function() {
//         // on click if no card has been clicked yet, increment clickCount by 1
//         if (clickCount === 0) {
//             clickCount ++;
//             // set back card image to the random image number at the same index in the indexArray
//             children[i].src = imagesArray[indexArray[i]].src;
//             // push the card value to the clickArray
//             clickArray.push(children[i]);
//         } else if (clickCount === 1) { 
//             // if a card has already been clicked, increment clickCount
//             clickCount ++;
//             // set back card image to the random image number at the same index in the indexArray
//             children[i].src = imagesArray[indexArray[i]].src;
//             // push the card value to the clickArray
//             clickArray.push(children[i]);

//             // if the two card values are the same, remove them from the page by changing their src to blank.png
//             if (clickArray[0].src === clickArray[1].src) {
//                 setTimeout(function() {
//                     clickArray[0].src = 'images/blank.png';
//                     clickArray[1].src = 'images/blank.png';
                    
//                     // reset clickCount and clickArray
//                     clickArray = [];
//                     clickCount = 0;
//                 }, 1000);
//             } else {
//                 // if the two cards are different, change their src to back.png over a second
//                 setTimeout(function() {
//                     clickArray[0].src = 'images/back.png';
//                     clickArray[1].src = 'images/back.png';
//                     // reset clickCount and clickArray
//                     clickArray = [];
//                     clickCount = 0;
//                 }, 1000);
//             }
//         } 
//         else {
//             // if two cards have already been clicked, reset clickCount and clickArray
//             clickCount = 0;
//             clickArray = [];
//         }

//     });
// }
