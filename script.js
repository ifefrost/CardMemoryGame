"use strict"

$( function() {
    $( "#tabs" ).tabs();
});

$('#save_settings').click(function() {
    const playerName = $('#player_name').val();
    const numberCards = $('#num_cards').val();
    sessionStorage.setItem('playerName', playerName);
    sessionStorage.setItem('numberCards', numberCards);
    location.reload();
});

// an array of images
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
const imagesArray = [];
let numberCards = sessionStorage.getItem('numberCards');
let playerName = sessionStorage.getItem('playerName');
$('#player_name').val(playerName);
$('#player').text(playerName);

for (let i = 0; i < numberCards; i++) {
    const image = new Image();
    image.src = cardsArray[i];
    imagesArray.push(image);
}

// random index generator between 0 and number of card
function randomIndex() {
    return Math.floor(Math.random() * numberCards);
};

let indexArray = [];
do {
    let randomNum = randomIndex();
    if (!indexArray.includes(randomNum)) {
        let card = imagesArray[randomNum];
        indexArray.push(randomNum);
        $('#cards').append(card);
    }
}
while (indexArray.length < numberCards);

let clickCount = 0;
let clickArray = [];

let children = $('#cards').children();

for (let child of children) {
    child.addEventListener('click', function() {
        if (clickCount === 0) {
            clickCount ++;
            clickArray.push(child);
        } else if (clickCount === 1) {
            clickCount ++;
            clickArray.push(child);
            if (clickArray[0].src === clickArray[1].src) {
                clickArray[0].src = 'images/blank.png';
                clickArray[1].src = 'images/blank.png';
                clickArray = [];
                clickCount = 0;
            } else {
                setTimeout(function() {
                    clickArray[0].src = 'images/back.png';
                    clickArray[1].src = 'images/back.png';
                    clickArray = [];
                    clickCount = 0;
                }, 1000);
            }
        } 
        else {
            clickCount = 0;
            clickArray = [];
        }
    });
}
