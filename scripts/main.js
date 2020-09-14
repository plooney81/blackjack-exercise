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
        if (rankIndex !== 1 && rankIndex < 11){
          deck.push({rank: rankIndex, suit: suits[suitsIndex], type: `${rankIndex}`});
        } else if (rankIndex === 1){
          deck.push({rank: rankIndex, suit: suits[suitsIndex], type: 'ace'});
        } else if (rankIndex === 11){
          deck.push({rank: rankIndex, suit: suits[suitsIndex], type: 'jack'});
        } else if (rankIndex === 12){
          deck.push({rank: rankIndex, suit: suits[suitsIndex], type: 'queen'});
        } else if (rankIndex === 13){
          deck.push({rank: rankIndex, suit: suits[suitsIndex], type: 'king'});
        }
        
      }
    }
  }

  return deck;
}

function dealCards(deck, player, dealer){
  arrayToReturn = [];
  player.push(deck.pop());
  dealer.push(deck.pop());
  player.push(deck.pop());
  dealer.push(deck.pop());

  console.log(player);
  console.log(dealer);
  
  window.setTimeout(addCard(player[0].type, player[0].suit, 'player'), 3000);
  window.setTimeout(addCard(dealer[0].type, dealer[0].suit, 'dealer'), 3000);
  window.setTimeout(addCard(player[1].type, player[1].suit, 'player'), 3000);
  window.setTimeout(addCard(dealer[1].type, dealer[1].suit, 'dealer'), 3000);

  // ;
  // addCard(dealer[0].type, dealer[0].suit, 'dealer');
  // addCard(player[1].type, player[1].suit, 'player');
  // addCard(dealer[1].type, dealer[1].suit, 'dealer');


  arrayToReturn.push(deck);
  arrayToReturn.push(player);
  arrayToReturn.push(dealer);

  return arrayToReturn;

}

//Because our javascript link is that the top, we will only run stuff once the window
// is loaded.

let playerHand = [],
  dealerHand = [],
  playingDecks;

window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
    playingDecks = buildDeck(1);
    console.log(playingDecks)
  document.addEventListener('click', function(e){
    if(e.target.id == "deal-button"){
      let returnArray = dealCards(playingDecks, playerHand, dealerHand);
      playingDecks = returnArray[0];
      playerHand = returnArray[1];
      dealerHand = returnArray[2];

    }else if(e.target.id == "hit-button"){
      // hit function call
    }else if(e.target.id == "stand-button"){

    }
  })
})