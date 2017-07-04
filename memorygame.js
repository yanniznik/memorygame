	// SETTING VARIABLES
	var allCards = [];
	var selectedCards = [];
	var toVictory = 0;
	var flipCounter = 0;

	// STARTING GAME

	function startGame() {
	    setUp();
	    randomize();
	}

	// CREATING CARDS

	function setUp() {
	    for (var i = 1; i < 12; i++) {
	        allCards[i] = new card(i);
	        allCards[i + 1] = new card(i);
	        allCards[i].create()
	        allCards[i + 1].create()
	        allCards[i].addClick();
	        allCards[i + 1].addClick();
	        i++
	    }
	}

	// RANDOMIZE BOARD

	function randomize() {
	    var cont = document.getElementById("container");
	    for (var i = cont.children.length; i >= 0; i--) {
	        cont.appendChild(cont.children[Math.random() * i | 0]);
	    }
	}

	// MAIN CARD OBJECT

	function card(id) {
	    var flipC = document.createElement("div");
	    this.id = id;
	    this.isFlipped = 0;
	    this.isFound = 0;

	    this.flip = function() {
	        this.isFlipped = 1;
	        flipC.classList.add("hover");
	        selectedCards.push(this.id);
	        gameHandler();
	    }
	    this.unflip = function() {
	        this.isFlipped = 0;
	        flipC.classList.remove("hover");
	    }

	    this.create = function() {
	        var mainC = document.createElement("div");
	        mainC.setAttribute("class", "col-md-3");
	        flipC.classList.add("flip-container");
	        flipC.setAttribute("class", "flip-container")
	        var flipper = document.createElement("div");
	        flipper.setAttribute("class", "flipper");
	        var front = document.createElement("div");
	        front.setAttribute("class", "front");
	        var back = document.createElement("div");
	        back.setAttribute("class", "front");
	        back.style.backgroundImage = "url('img/texture.jpg')";
	        front.style.backgroundImage = "url('img/" + id + ".jpg')";
	        flipper.appendChild(front);
	        flipper.appendChild(back);
	        flipC.appendChild(flipper);
	        mainC.appendChild(flipC);
	        document.getElementById("container").appendChild(mainC);
	    }
	    this.addClick = function() {
	        flipC.addEventListener('click', this.flip.bind(this), false)

	    }
	}

	// GAME HANDLER

	function gameHandler() {
	    flipCounter += 1;

	    if (selectedCards[0] == selectedCards[1] && flipCounter == 2) {
	        flipCounter = 0;
	        toVictory += 2;
	        allCards[selectedCards[0]].isFound = 1;
	        allCards[selectedCards[1] + 1].isFound = 1;
	        selectedCards = [];
	    }

	    if (toVictory == allCards.length - 1) {
	        console.log("WON");
	    } else if (selectedCards[0] != selectedCards[1] && flipCounter == 2) {
	        flipCounter = 0;
	        selectedCards = [];
	        setTimeout(function() {
	            for (var i = 1; i < allCards.length; i++) {
	                if (allCards[i].isFlipped == 1 && allCards[i].isFound == 0) {
	                    allCards[i].unflip();
	                }
	            }
	        }, 1000)
	    }
	}

	startGame();