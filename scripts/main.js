function addCard(cardVal, suit, whichHand){
  let container = document.querySelector(`#${whichHand}-hand`);

  let newCard = `
    <img src="images/${cardVal}_of_${suit}.png" alt="Picture of the ${cardVal} of ${suit}"
    style="height: 50px; width: auto;" class="m-1">
  `
  container.innerHTML += newCard;
}

//create our deck of cards
function buildDeck(numbOfDecks){
  let deck = [];
  let suits = ['diamonds', 'hearts', 'spades', 'clubs'];

  
  for (let numDeckIndex = 0; numDeckIndex < numbOfDecks; numDeckIndex++){
    for (let suitsIndex = 0; suitsIndex < suits.length; suitsIndex++){
      for (let rankIndex = 1; rankIndex <= 13; rankIndex++){
        deck.push({rank: rankIndex, suit: suits[suitsIndex]});
      }
    }
  }

  return deck;
}

//Because our javascript link is that the top, we will only run stuff once the window
// is loaded.

let playerHand = [],
  dealerHand = [],
  playingDecks;

window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
    playingDecks = buildDeck(1);
  document.addEventListener('click', function(e){
    if(e.target.id == "deal-button"){
      
    }else if(e.target.id == "hit-button"){
      // hit function call
    }else if(e.target.id == "stand-button"){

    }
  })
})