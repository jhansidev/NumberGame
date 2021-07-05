function submitData() {
  const min_value = document.getElementById("minnumber").value;
  const max_value = document.getElementById("maxnumber").value;

  if (min_value == "" || max_value == "") {
    updateDOM("Data is not valid! please enter value in both the inputs", "red");
    return;
  }

  if (!Number.isInteger(+min_value) || !Number.isInteger(+max_value)) {
    updateDOM("Please include a valid number for both the inputs above", "red");
    return
  }

  if (min_value >= max_value) {
    updateDOM("Low range should be lesser than high range.. Crazy you know!", "red");
    return
  }
  numberGuessGame(parseInt(min_value), parseInt(max_value))

}


function updateDOM(value, color) {
  document.getElementById("output").innerHTML = value; // make sure you have a div in html file with id of output.
  document.getElementById("output").style.color = color;
  // update color of div as well
}

function numberGuessGame(min_value, max_value) {
  let random,randomHintMsg = "I am thinking of a number between " + min_value + " and " + max_value,rangeError=false,
    randomNumberGenerated = randomNumber(+min_value, +max_value), guessedItems = [],guessedItemsString="Guessed integers - ",
    attempts = 0;
  do {
    if(rangeError){
      randomHintMsg = random + " is invalid number for given range";
      rangeError=false;
    }else{

      attempts++;
      if(random && random > randomNumberGenerated){
        randomHintMsg = random + " is high. Please enter another integer";
      }
      if(random && random < randomNumberGenerated){
        randomHintMsg = random+ " is low. Please enter another integer";
      }
    }
    random = prompt(randomHintMsg +".\n Try to guess it!\n Please enter an integer between " + min_value + " and " + max_value + ".", '');

    if (random == null) {
      return;
    }else{
      if(random<min_value || random>max_value){
        rangeError = true;
      }else{
        guessedItems.push(random)
      }
    }
    if (random == randomNumberGenerated) {
      guessedItems.forEach(function(item,index){
        let comma = "";
        if(index < guessedItems.length-1){comma=","}
        guessedItemsString = guessedItemsString+item+comma;
      })
      updateDOM("Congratulations!! " + randomNumberGenerated + " is correct! It only took you " + attempts + " guesses.<br />"+guessedItemsString, "green");
    }
  } while (random != randomNumberGenerated)
}


function randomNumber(min, max) {
  let randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum);
}


