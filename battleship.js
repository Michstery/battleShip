var view = {
  displayMsg: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  hit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  miss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};

// view.hit("00");
// view.hit("11");
// view.hit("22");
// view.miss("60");
// view.miss("51");
// view.miss("42");
// view.displayMsg("test test check !!!");

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [
    { locations: ["06", "16", "26"], hits: ["", "", ""] },
    { locations: ["24", "34", "44"], hits: ["", "", ""] },
    { locations: ["10", "11", "12"], hits: ["", "", ""] }
  ],
  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var locations = ship.locations;
      var index = locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.hit(guess);
        // view.displayMsg("we have a hit !!!");
        if (this.isSunk(ship)) {
          // view.displayMsg("YOU SANK MY BATTLESHIP !!!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.miss(guess);
    view.displayMsg("YOU MISSED !!!");
    return false;
  },
  // this isSunk method is a helper method for fire method, it returns true or false based on what fire feeds it and update the state
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      } else {
        return true;
      }
    }
  }
};

// model.fire("53");
// model.fire("06");
// model.fire("16");
// model.fire("26");
// model.fire("34");
// model.fire("24");
// model.fire("44");
// model.fire("12");
// model.fire("11");
// model.fire("10");

var controller = {
  guesses: 0,
  processGuess: function(guess) {
    var location = this.parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMsg(
          "YOU SANK ALL MY BATTLESHIPS, IN " + this.guesses + " GUESSES"
        );
      }
    }
  },
  parseGuess: function(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F"];
    if (guess === null || guess.length != 2) {
      alert("This Isn't On The Board !!!");
    } else {
      var firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);
      if (isNaN(row) || isNaN(column)) {
        alert("OOPS !!! THAT ISN'T ON THE BOARD");
      } else if (
        row < 0 ||
        row >= model.boardSize ||
        column < 0 ||
        column >= model.boardSize
      ) {
        alert("OOPS !!! THAT'S OFF THE BOARD ");
      } else {
        return row + column;
      }
    }
    return null;
  }
};

// console.log(controller.parseGuess("A0"));
// console.log(controller.parseGuess("B6"));
// console.log(controller.parseGuess("G3"));
// console.log(controller.parseGuess("H0"));
// console.log(controller.parseGuess("A7"));
// controller.processGuess("A0");
// controller.processGuess("A6");
// controller.processGuess("B6");
// controller.processGuess("C6");
// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");
// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");

function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;

  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
}

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";
}

function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();

    return false;
  }
}

window.onload = init;
