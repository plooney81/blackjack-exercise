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

  // console.log(player);
  // console.log(dealer);
  

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
  let aces = 0;
  let points = [0, 0];
  for (let index = 0; index < hand.length; index++){
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

function stand(delHand, delPoints, deck){
  let arrayToReturn = [];
  while (delPoints[1] < 17){
    delHand.push(deck.pop());
    addCard(delHand[delHand.length - 1].type, delHand[delHand.length - 1].suit, 'dealer', delHand);
    delPoints = returnHandPoints(delHand);
  }
  arrayToReturn.push(deck);
  arrayToReturn.push(delHand);
  return arrayToReturn;
}

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

function updateScoreBoard(scoreBoard){
  let playerSB = document.querySelector('#player-sb');
  let dealerSB = document.querySelector('#dealer-sb');

  playerSB.innerHTML = scoreBoard.player;
  dealerSB.innerHTML = scoreBoard.dealer;
}

function whoWon(playHandPoints, delHandPoints, scoreBoard){
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
    if(delHandPoints[dealerScoreIndex] > highestPlayScore && delHandPoints[dealerScoreIndex] <= 21){
      highestDealerScore = delHandPoints[dealerScoreIndex];
    }
  }
  
  if(highestPlayScore == highestDealerScore){
    mess.innerHTML += 'Push';
  }else if(highestPlayScore > highestDealerScore){
    mess.innerHTML += ' Congratulations, you won!';
    scoreBoard.player += 1;
  }else{
    mess.innerHTML += ' You lost!';
    scoreBoard.dealer += 1;
  }

  updateScoreBoard(scoreBoard);
  return scoreBoard;

}



//Because our javascript link is that the top, we will only run stuff once the window
// is loaded.

let playerHand = [],
  dealerHand = [],
  playingDecks,
  shuffledDeck,
  playerPoints,
  dealerPoints,
  keepDealing = true,
  money = 500,
  betAmount = 0,
  scoreBoard = {player: 0, dealer: 0};

window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
    playingDecks = buildDeck(1);
    // console.log(playingDecks)
    shuffledDeck = shuffle(playingDecks);
    // console.log(shuffledDeck);
  document.addEventListener('click', function(e){
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
            scoreBoard = whoWon(playerPoints, dealerPoints, scoreBoard);
          }
        }
      }else{
        alert('Can\'t do that!')
      }
 

    }else if(e.target.id == "stand-button"){
      if (playerHand.length > 0){
        // stand function
        if(keepDealing){
          let standReturnArray = stand(dealerHand, dealerPoints, shuffledDeck);
          shuffledDeck = standReturnArray[0];
          dealerHand = standReturnArray[1];
          dealerPoints = returnHandPoints(dealerHand);
          keepDealing = bust(dealerPoints, "Dealer");
          scoreboard = whoWon(playerPoints, dealerPoints, scoreBoard);
        }else{
          scoreboard = whoWon(playerPoints, dealerPoints, scoreBoard);
        }
      }else{
        alert('Can\'t do that!')
      }
    }else if(e.target.id == 'increase-bet'){
      if (playerHand.length <= 0 && money - 50 >= 0){
        betAmount += 50;
        money -= 50;
        document.querySelector('#bet-amount').innerHTML = `$${betAmount}`;
        document.querySelector('#player-bank').innerHTML = `$${money}`;
      }else{
        alert('Can\'t do that!')
      }
    }else if(e.target.id == 'decrease-bet'){
      if (playerHand.length <= 0 && betAmount - 50 >= 0){
        betAmount -= 50;
        money += 50;
        document.querySelector('#bet-amount').innerHTML = `$${betAmount}`;
        document.querySelector('#player-bank').innerHTML = `$${money}`;
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
      // console.log(playingDecks)
      shuffledDeck = shuffle(playingDecks);
    }
  })
})