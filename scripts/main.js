function addCard(cardVal, suit, whichHand){
  let container = document.querySelector(`#${whichHand}-hand`);

  let newCard = `
    <img src="images/${cardVal}_of_${suit}.png" alt="Picture of the ${cardVal} of ${suit}"
    style="height: 50px; width: auto;" class="m-1">
  `
  container.innerHTML += newCard;
}


//Because our javascript link is that the top, we will only run stuff once the window
// is loaded.

window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
  document.addEventListener('click', function(e){
    if(e.target.id == "deal-button"){
      addCard('2', "clubs", "player");
    }
  })
})