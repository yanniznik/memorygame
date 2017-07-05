		var theme = 1;
		var allCards = [];
		var selectedCards = [];
		var toVictory = 0;
		var flipCounter = 0;
		var tryCounter = 0;
		var score = 0;
		var difficulty = 12;

	// STARTING GAME

	function startGame() {
		cleanUp();
		setUp();
		randomize();
		newGame();
		changeDifficulty();
	}

	// GENERAL CLEAN UP

	function cleanUp() {
		document.getElementById("container").innerHTML = '';
		document.getElementById("won").classList.remove("showme");
		allCards = [];
		selectedCards = [];
		toVictory = 0;
		flipCounter = 0;
		tryCounter = 0;
		score = 0;
	}

	// THEME HANDLER

	function themeHandler() {
		var sel = document.getElementById("select");
		theme = sel.options[sel.selectedIndex].value;
	}

	// COUNTERS 

	function counter() {
		document.getElementById("tries").innerHTML = tryCounter;
		document.getElementById("score").innerHTML = score;
	}

	// DIFFICULTY HANDLER

	function changeDifficulty() {
		var buttons = document.getElementsByClassName("difficulty");
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", function() {
				difficulty = this.value;
				var selectedElements = document.getElementsByClassName("selected");
				for (var i = 0; i < selectedElements.length; i++) {
					selectedElements[i].classList.remove("selected")
				}
				this.classList.add("selected")
			})
		}

	}

	// NEW GAME

	function newGame() {
		document.getElementById("newgame").addEventListener("click", function() {
			if (confirm("Are you sure you want to restart?")) {
				themeHandler();
				startGame();
			}
		})
	}

	// CREATING CARDS

	function setUp() {
		for (var i = 1; i < difficulty; i++) {
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
	var pauseThis = false;

	function card(id) {
		var flipC = document.createElement("div");
		this.id = id;
		this.isFlipped = 0;
		this.isFound = 0;

		this.flip = function() {
			
			if (flipCounter == 2) {
					pauseThis = true;
				}
			if (!pauseThis) {
				flipCounter += 1;
				this.isFlipped = 1;
				flipC.classList.add("hover");
				selectedCards.push(this.id);
				gameHandler();
			}
			else {
				console.log("testing");
			}
			
		}
		this.unflip = function() {
			this.isFlipped = 0;
			flipC.classList.remove("hover");
		}

		this.create = function() {
			var mainC = document.createElement("div");
			mainC.setAttribute("class", "col-md-3 col-sm-4 col-xs-6");
			flipC.classList.add("flip-container");
			flipC.setAttribute("class", "flip-container")
			var flipper = document.createElement("div");
			flipper.setAttribute("class", "flipper");
			var front = document.createElement("div");
			front.setAttribute("class", "front");
			var back = document.createElement("div");
			back.setAttribute("class", "front");
			back.style.backgroundImage = "url('img/" + theme + "/texture.jpg')";
			front.style.backgroundImage = "url('img/" + theme + "/" + id + ".jpg')";
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
		if (flipCounter == 2) {
			pauseThis = true;
		}
		if (selectedCards[0] == selectedCards[1] && flipCounter == 2) {
			flipCounter = 0;
			toVictory += 2;
			score += 1;
			allCards[selectedCards[0]].isFound = 1;
			allCards[selectedCards[1] + 1].isFound = 1;
			selectedCards = [];
			pauseThis = false;
		}

		if (toVictory == allCards.length - 1) {
			console.log("WON");
			document.getElementById("won").classList.add("showme");
		} 
		if (selectedCards[0] != selectedCards[1] && flipCounter == 2) {
			
			flipCounter = 0;
			tryCounter += 1;
			selectedCards = [];
			setTimeout(function() {
				for (var i = 1; i < allCards.length; i++) {
	                if (allCards[i].isFlipped == 1 && allCards[i].isFound == 0) { // unflip only flipped cards that are not found
	                	allCards[i].unflip();
	                }
	            }
	        pauseThis = false;
	        }, 500)
		}
		
		counter();
		console.log("updating counter");
	}

	startGame();