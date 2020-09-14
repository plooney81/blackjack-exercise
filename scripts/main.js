function addCard(cardVal, suit, whichHand, hand){
 
  let container = document.querySelector(`#${whichHand}-hand`);

  let newCard = `
    <img src="images/${cardVal}_of_${suit}.png" alt="Picture of the ${cardVal} of ${suit}"
    style="height: 50px; width: auto;" class="m-1">
  `
  container.innerHTML += newCard;

  printPoints(returnHandPoints(hand), whichHand);
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
  addCard(player[player.length - 1].type, player[player.length - 1].suit, 'player', player);
  dealer.push(deck.pop());
  addCard(dealer[dealer.length - 1].type, dealer[dealer.length - 1].suit, 'dealer', dealer);
  player.push(deck.pop());
  addCard(player[player.length - 1].type, player[player.length - 1].suit, 'player', player);
  dealer.push(deck.pop());
  addCard(dealer[dealer.length - 1].type, dealer[dealer.length - 1].suit, 'dealer', dealer);

  console.log(player);
  console.log(dealer);
  

  arrayToReturn.push(deck);
  arrayToReturn.push(player);
  arrayToReturn.push(dealer);

  return arrayToReturn;

}

function shuffle(deck){
  newArray = deck;
  for (let index = deck.length - 1; index >= 0; index--){
    let randomIndex = Math.floor(Math.random() * index);      // returns a random integer from 0 to index
    // console.log(`Card at ${index} - ${newArray[index]} will be swapped with card at ${randomIndex} - ${newArray[randomIndex]}`);
    [newArray[index], newArray[randomIndex]] = [newArray[randomIndex], newArray[index]]; 
  }
  return newArray;
}

function hit(deck, player){
  let arrayToReturn = [];
  player.push(deck.pop());
  addCard(player[player.length - 1].type, player[player.length - 1].suit, 'player', player);
  arrayToReturn.push(deck);
  arrayToReturn.push(player);
  return arrayToReturn;
}

function returnHandPoints(hand){
  let points = [0, 0];
  for (let index = 0; index < hand.length; index++){
    if (hand[index].rank > 10){
      points[0] += 10;
      points[1] += 10;
    }else if(hand[index].rank === 1){
      points[0] += 1;
      points[1] += 11;
    }else{
      points[0] += hand[index].rank;
      points[1] += hand[index].rank;
    }
  }
  return points
}

function printPoints(points, whoseHand){
  let container = document.querySelector(`#${whoseHand}-points`);
  
  if (points[0] === points[1] || points[1] > 21){
    container.innerHTML = points[0];
  }else if (points[1] === 21){
    container.innerHTML = points[1];
  }else{
    container.innerHTML = `${points[0]} or ${points[1]}`;
  }

}

//Because our javascript link is that the top, we will only run stuff once the window
// is loaded.

let playerHand = [],
  dealerHand = [],
  playingDecks,
  shuffledDeck,
  playerPoints,
  dealerPoints;

window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
    playingDecks = buildDeck(1);
    console.log(playingDecks)
    shuffledDeck = shuffle(playingDecks);
    console.log(shuffledDeck);
  document.addEventListener('click', function(e){
    if(e.target.id == "deal-button"){
      if(playerHand.length > 0){
        alert('You cant do that!')
      }else{

        let returnArray = dealCards(shuffledDeck, playerHand, dealerHand);
        shuffledDeck = returnArray[0];
        playerHand = returnArray[1];
        dealerHand = returnArray[2];  
      }


    }else if(e.target.id == "hit-button"){
      let hitReturnArray = hit(shuffledDeck, playerHand);
      shuffledDeck = hitReturnArray[0];
      playerHand = hitReturnArray[1];
    }else if(e.target.id == "stand-button"){

    }
  })
})