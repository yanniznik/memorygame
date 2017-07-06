	var MemoryGame = {};

	MemoryGame.theme = 1 
	MemoryGame.allCards = [];
	MemoryGame.selectedCards = [];
	MemoryGame.toVictory = 0;
	MemoryGame.flipCounter = 0;
	MemoryGame.tryCounter = 0;
	MemoryGame.score = 0;
	MemoryGame.difficulty = 12;
	MemoryGame.pauseThis = false;
	document.getElementById("newgame").addEventListener("click", function() {
		MemoryGame.startGame();
	});

	// STARTING GAME

	MemoryGame.startGame = function() {
		MemoryGame.cleanUp();
		MemoryGame.themeHandler();
		MemoryGame.changeDifficulty();
		MemoryGame.setUp();
		MemoryGame.randomize();
	}

	// GENERAL CLEAN UP

	MemoryGame.cleanUp = function() {
		document.getElementById("container").innerHTML = '';
		document.getElementById("won").classList.remove("showme");
		MemoryGame.allCards = [];
		MemoryGame.selectedCards = [];
		MemoryGame.toVictory = 0;
		MemoryGame.flipCounter = 0;
		MemoryGame.tryCounter = 0;
		MemoryGame.score = 0;
	}

	// THEME HANDLER

	MemoryGame.themeHandler = function() {
		var sel = document.getElementById("select");
		theme = sel.options[sel.selectedIndex].value;
	}

	// COUNTERS 

	MemoryGame.counter = function() {
		document.getElementById("tries").innerHTML = MemoryGame.tryCounter;
		document.getElementById("score").innerHTML = MemoryGame.score;
	}

	// DIFFICULTY HANDLER

	MemoryGame.changeDifficulty = function() {
		var buttons = document.getElementsByClassName("difficulty");
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener("click", function() {
				MemoryGame.difficulty = this.value;
				var selectedElements = document.getElementsByClassName("selected");
				for (var i = 0; i < selectedElements.length; i++) {
					selectedElements[i].classList.remove("selected")
				}
				this.classList.add("selected")
			})
		}
	}

	// CREATING CARDS

	MemoryGame.setUp = function() {
		for (var i = 1; i < MemoryGame.difficulty; i++) {
			MemoryGame.allCards[i] = new MemoryGame.card(i);
			MemoryGame.allCards[i + 1] = new MemoryGame.card(i);
			MemoryGame.allCards[i].create()
			MemoryGame.allCards[i + 1].create()
			MemoryGame.allCards[i].addClick();
			MemoryGame.allCards[i + 1].addClick();
			i++;
		}
	}

	// RANDOMIZE BOARD

	MemoryGame.randomize = function() {
		var cont1 = document.getElementById("container");
		for (var i = cont1.children.length; i >= 0; i--) {
			cont1.appendChild(cont1.children[Math.random() * i | 0]);
		}
	}

	// MAIN CARD OBJECT

	MemoryGame.card = function(id) {
		var flipC = document.createElement("div");
		this.id = id;
		this.isFlipped = 0;
		this.isFound = 0;
		this.flip = function() {			
			if (MemoryGame.flipCounter == 2) {
					MemoryGame.pauseThis = true;
				}
			if (!MemoryGame.pauseThis) {
				MemoryGame.flipCounter += 1;
				this.isFlipped = 1;
				flipC.classList.add("hover");
				MemoryGame.selectedCards.push(this.id);
				flipC.style.pointerEvents = "none";
				MemoryGame.gameHandler();	
			}		
		}
		this.unflip = function() {
			this.isFlipped = 0;
			flipC.classList.remove("hover");
			flipC.style.pointerEvents = "auto";
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

	MemoryGame.gameHandler = function() {
		if (MemoryGame.flipCounter == 2) {
			MemoryGame.pauseThis = true;
		}
		if (MemoryGame.selectedCards[0] == MemoryGame.selectedCards[1] && MemoryGame.flipCounter == 2) {
			MemoryGame.flipCounter = 0;
			MemoryGame.toVictory += 2;
			MemoryGame.score += 1;
			MemoryGame.allCards[MemoryGame.selectedCards[0]].isFound = 1;
			MemoryGame.allCards[MemoryGame.selectedCards[1] + 1].isFound = 1;
			MemoryGame.selectedCards = [];
			MemoryGame.pauseThis = false;
		}

		if (MemoryGame.toVictory == MemoryGame.allCards.length - 1) {
			document.getElementById("won").classList.add("showme");
		} 
		if (MemoryGame.selectedCards[0] != MemoryGame.selectedCards[1] && MemoryGame.flipCounter == 2) {
			
			MemoryGame.flipCounter = 0;
			MemoryGame.tryCounter += 1;
			MemoryGame.selectedCards = [];
			setTimeout(function() {
				for (var i = 1; i < MemoryGame.allCards.length; i++) {
	                if (MemoryGame.allCards[i].isFlipped == 1 && MemoryGame.allCards[i].isFound == 0) { // unflip only flipped cards that are not found
	                	MemoryGame.allCards[i].unflip();

	                }
	            }
	        MemoryGame.pauseThis = false;
	        }, 500)
		}
		MemoryGame.counter();
	}

	MemoryGame.startGame();