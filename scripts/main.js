// ------------------------------------------------
// Function that adds a new card picture to the specified hand in our html document...
//  it also calls our printPoints function that will update the html for the hands points...
//  unless of course it is the second card of the dealers off the deal, which will be a picture of the back of a deck, 
//  and the points will not be updated
function addCard(cardVal, suit, whichHand, hand, special){
 
  let container = document.querySelector(`#${whichHand}-hand`);
  let newCard = '';
  if (!special){
    newCard = `
    <img src="images/${cardVal}_of_${suit}.png" alt="Picture of the ${cardVal} of ${suit}"
    style="height: 50px; width: auto;" class="m-1">
    `
  }else{
    newCard = `
    <img src="images/back.svg" alt="Picture of the back of a deck of cards"
    style="height: 50px; width: auto;" class="m-1">
    `
  }

  container.innerHTML += newCard;

  printPoints(returnHandPoints(hand, special), whichHand);
}

// ------------------------------------------------
// Function that creates our deck or numbOfDecks of cards
// traditional blackjack is used with 6 different decks!
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

// ------------------------------------------------
// Function that deals the original hand
// notice the true argument on the second dealer addCard call, this will fire two things:
//  1. It will display the back of the card, not allowing the player to see the dealer's second card in his hand.
//  2. It will only calculate and display the points for the dealers first card, not his second.
function dealCards(deck, player, dealer){
  arrayToReturn = [];
  player.push(deck.pop());
  addCard(player[player.length - 1].type, player[player.length - 1].suit, 'player', player, false);
  dealer.push(deck.pop());
  addCard(dealer[dealer.length - 1].type, dealer[dealer.length - 1].suit, 'dealer', dealer, false);
  player.push(deck.pop());
  addCard(player[player.length - 1].type, player[player.length - 1].suit, 'player', player, false);
  dealer.push(deck.pop());
  addCard(dealer[dealer.length - 1].type, dealer[dealer.length - 1].suit, 'dealer', dealer, true);

  // console.log(player);
  // console.log(dealer);
  

  arrayToReturn.push(deck);
  arrayToReturn.push(player);
  arrayToReturn.push(dealer);

  return arrayToReturn;

}

// ------------------------------------------------
// Function that shuffles our deck (or decks) of cards
function shuffle(deck){
  newArray = deck;
  for (let index = deck.length - 1; index >= 0; index--){
    let randomIndex = Math.floor(Math.random() * index);      // returns a random integer from 0 to index
    // swaps the cards at the two indeces
    [newArray[index], newArray[randomIndex]] = [newArray[randomIndex], newArray[index]]; 
  }
  return newArray;
}

// ------------------------------------------------
// Function that adds a card from teh top of the deck to the players hand and then calls the function to display that new card
function hit(deck, player){
  let arrayToReturn = [];
  player.push(deck.pop());
  addCard(player[player.length - 1].type, player[player.length - 1].suit, 'player', player, false);
  arrayToReturn.push(deck);
  arrayToReturn.push(player);
  return arrayToReturn;
}

// ------------------------------------------------
// Function that calculates the given hands point value ...
// unless it is a special hand, in which it only calculates the first value 
// (i.e. the dealers hand off the original deal, before) the player is done hitting
function returnHandPoints(hand, special){
  let aces = 0;
  let points = [0, 0];
  for (let index = 0; index < hand.length; index++){
    if(!special || index == 0){
      if (hand[index].rank > 10){
        points[0] += 10;
        points[1] += 10;
      }else if(hand[index].rank === 1 && aces === 0){
        points[0] += 1;
        points[1] += 11;
        aces += 1;
      }else if(hand[index].rank === 1 && aces !== 0){
        points[0] += 1;
        points[1] += 1;
      }else{
        points[0] += hand[index].rank;
        points[1] += hand[index].rank;
      }
    }
  }

  return points
}

// ------------------------------------------------
// Function that prints the hand points for the given players hand
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

// ------------------------------------------------
// Function that shows both of the dealers initial cards after the main deal and:
// will add cards the dealers hand if their total is not greater than or equal to 17
function stand(delHand, delPoints, deck){
  let arrayToReturn = [];
  document.querySelector(`#dealer-hand`).innerHTML = '';
  addCard(delHand[delHand.length - 2].type, delHand[delHand.length - 2].suit, 'dealer', delHand, false);
  addCard(delHand[delHand.length - 1].type, delHand[delHand.length - 1].suit, 'dealer', delHand, false);
  while (delPoints[1] < 17){
    delHand.push(deck.pop());
    addCard(delHand[delHand.length - 1].type, delHand[delHand.length - 1].suit, 'dealer', delHand, false);
    delPoints = returnHandPoints(delHand);
  }
  if (delPoints[1] > 21 && delPoints[0] < 17){
    while (delPoints[0] < 17){
      delHand.push(deck.pop());
      addCard(delHand[delHand.length - 1].type, delHand[delHand.length - 1].suit, 'dealer', delHand, false);
      delPoints = returnHandPoints(delHand);
    }
  }

  arrayToReturn.push(deck);
  arrayToReturn.push(delHand);
  return arrayToReturn;
}

// ------------------------------------------------
// Function that calculates if the given hand is a bust
function bust(hand, whoseHand){
  let mess = document.querySelector('#messages');
  for(let index = 0; index < hand.length; index++){
    if (hand[index] <= 21){
      return true;
    }else{
      mess.innerHTML = ` ${whoseHand} busted`;
      return false;
    }
  }
}

// ------------------------------------------------
// Function that updates the scoreboard -----------
function updateScoreBoard(scoreBoard){
  let playerSB = document.querySelector('#player-sb');
  let dealerSB = document.querySelector('#dealer-sb');

  playerSB.innerHTML = scoreBoard.player;
  dealerSB.innerHTML = scoreBoard.dealer;
}


// ------------------------------------------------
// Function that figures out who won --------------
function whoWon(playHandPoints, delHandPoints, scoreBoard, betAmount){
  let mess = document.querySelector('#messages');

  document.querySelector('#deal-button').setAttribute('style', 'display: none;');
  document.querySelector('#hit-button').setAttribute('style', 'display: none;');
  document.querySelector('#stand-button').setAttribute('style', 'display: none;');
  document.querySelector('#reset-button').setAttribute('style', 'display: inline;');

  let highestPlayScore = 0;
  let highestDealerScore = 0;
  for(let playerScoreIndex = 0; playerScoreIndex < playHandPoints.length; playerScoreIndex++){
    if(playHandPoints[playerScoreIndex] > highestPlayScore && playHandPoints[playerScoreIndex] <= 21){
      highestPlayScore = playHandPoints[playerScoreIndex];
    }
  }  
  for(let dealerScoreIndex = 0; dealerScoreIndex < delHandPoints.length; dealerScoreIndex++){
    if(delHandPoints[dealerScoreIndex] > highestDealerScore && delHandPoints[dealerScoreIndex] <= 21){
      highestDealerScore = delHandPoints[dealerScoreIndex];
    }
  }
  console.log(highestPlayScore);
  console.log(highestDealerScore);
  if(highestPlayScore == highestDealerScore){
    document.querySelector('#messages').innerHTML += 'Push';
    scoreBoard.money += betAmount;
    document.querySelector('#player-bank').innerHTML = `$${scoreBoard.money}`;
  }else if(highestPlayScore > highestDealerScore){
    scoreBoard.player += 1;
    if (betAmount === 0){
      document.querySelector('#messages').innerHTML += ' Congratulations, you won!';
    }else{
      document.querySelector('#messages').innerHTML += ` Congratulations, you won $${betAmount}!`;
      scoreBoard.money += (betAmount * 2);
      document.querySelector('#player-bank').innerHTML = `$${scoreBoard.money}`;
    }
  }else{
    scoreBoard.dealer += 1;
    if (betAmount === 0){
      mess.innerHTML += ' You lost!';
    }else{
      mess.innerHTML += ` You lost $${betAmount}!`;
      
    }
  }

  updateScoreBoard(scoreBoard);
  return scoreBoard;

}
// End Function Section ---------------------------
// ------------------------------------------------

let playerHand = [],
  dealerHand = [],
  playingDecks,
  shuffledDeck,
  playerPoints,
  dealerPoints,
  keepDealing = true,
  betAmount = 0,
  scoreBoard = {player: 0, dealer: 0, money: 500};


  //Because our javascript link is that the top, we will only run stuff once the window
// is loaded.
window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
    playingDecks = buildDeck(1);
    // console.log(playingDecks)
    shuffledDeck = shuffle(playingDecks);
    // console.log(shuffledDeck);
  document.addEventListener('click', function(e){
    // we are using eventBubbling, so instead of adding a bunch of different event listeners for each button, 
    // we add one click eventListener to the page and the decide what we want to do based on teh target of that event
    // its called event bubbling becuase when a child event is fired, it will fire all respective parent and ancestor 
    // events (i.e. bubbling up to their parents and grandparents)
    if(e.target.id == "deal-button"){
      document.querySelector('#increase-bet').setAttribute('style', 'display: none;');
      document.querySelector('#decrease-bet').setAttribute('style', 'display: none;');
      if(playerHand.length > 0){
        alert('You cant do that!')
      }else{

        let returnArray = dealCards(shuffledDeck, playerHand, dealerHand);
        shuffledDeck = returnArray[0];
        playerHand = returnArray[1];
        dealerHand = returnArray[2];  
        playerPoints = returnHandPoints(playerHand);
        dealerPoints = returnHandPoints(dealerHand);
      }


    }else if(e.target.id == "hit-button"){
      if (playerHand.length > 0){
        if (keepDealing){
          let hitReturnArray = hit(shuffledDeck, playerHand);
          shuffledDeck = hitReturnArray[0];
          playerHand = hitReturnArray[1];
          playerPoints = returnHandPoints(playerHand);
          keepDealing = bust(playerPoints, "Player");
          if (keepDealing === false){
            scoreBoard = whoWon(playerPoints, dealerPoints, scoreBoard, betAmount);
          }
        }
      }else{
        alert('Can\'t do that!')
      }
 

    }else if(e.target.id == "stand-button"){
      dealerPoints = returnHandPoints(dealerHand);
      if (playerHand.length > 0){
        // stand function
        if(keepDealing){
          let standReturnArray = stand(dealerHand, dealerPoints, shuffledDeck);
          shuffledDeck = standReturnArray[0];
          dealerHand = standReturnArray[1];
          dealerPoints = returnHandPoints(dealerHand);
          keepDealing = bust(dealerPoints, "Dealer");
          scoreboard = whoWon(playerPoints, dealerPoints, scoreBoard, betAmount);
        }else{
          scoreboard = whoWon(playerPoints, dealerPoints, scoreBoard, betAmount);
        }
      }else{
        alert('Can\'t do that!')
      }
    }else if(e.target.id == 'increase-bet'){
      if (playerHand.length <= 0 && scoreBoard.money - 50 >= 0){
        betAmount += 50;
        scoreBoard.money -= 50;
        document.querySelector('#bet-amount').innerHTML = `$${betAmount}`;
        document.querySelector('#player-bank').innerHTML = `$${scoreBoard.money}`;
      }else{
        alert('Can\'t do that!')
      }
    }else if(e.target.id == 'decrease-bet'){
      if (playerHand.length <= 0 && betAmount - 50 >= 0){
        betAmount -= 50;
        scoreBoard.money += 50;
        document.querySelector('#bet-amount').innerHTML = `$${betAmount}`;
        document.querySelector('#player-bank').innerHTML = `$${scoreBoard.money}`;
      }else{
        alert('Can\'t do that!')
      }
    }else if(e.target.id == "reset-button"){
      document.querySelector('#increase-bet').setAttribute('style', 'display: inline;');
      document.querySelector('#decrease-bet').setAttribute('style', 'display: inline;');
      document.querySelector('#deal-button').setAttribute('style', 'display: inline;');
      document.querySelector('#hit-button').setAttribute('style', 'display: inline;');
      document.querySelector('#stand-button').setAttribute('style', 'display: inline;');
      document.querySelector('#reset-button').setAttribute('style', 'display: none;');
      document.querySelector('#dealer-hand').innerHTML = '';
      document.querySelector('#player-hand').innerHTML = '';
      document.querySelector('#messages').innerHTML = '';
      document.querySelector('#dealer-points').innerHTML = 0;
      document.querySelector('#player-points').innerHTML = 0;
      document.querySelector('#bet-amount').innerHTML = 0;
      playerHand = [];
      dealerHand = [];
      keepDealing = true;
      playingDecks = [];
      shuffledDeck = [];
      playerPoints = [];
      dealerPoints = [];
      playingDecks = buildDeck(1);
      betAmount = 0;
      // console.log(playingDecks)
      shuffledDeck = shuffle(playingDecks);
    }
  })
})