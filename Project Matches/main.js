var cardsArray = [
    {    'name': 'bird',    'img': "https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true",  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
  ];
 //Duplicating the cardArray
  var gameGrid = cardsArray.concat(cardsArray);
  //randomize cards
  gameGrid.sort(function() {
     return 0.5 - Math.random();
  })

  var game = document.getElementById('game-board');
  var grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  game.appendChild(grid);
  
 // store guesses 
 var firstGuess = '';
 var secondGuess = '';
 var delay = 1200; 

  // set count to 0
  var count = 0; 
  var previousTarget = null;

  // add match CSS
  var match = function(){
    var selected = document.querySelectorAll('.selected');

    for (i = 0; i < selected.length; i++){
        selected[i].classList.add('match');
    }
  };

  // reset guesses after two attempts 
  var resetGuesses = function() {
    firstGuess = '';
    secondGuess = '';
    count = 0; 
    previousTarget = null; 

    var selected = document.querySelectorAll('.selected');
    for (i = 0; i < selected.length; i ++){
        selected[i].classList.remove('selected');
    }
  };




  //loop though each item 
  for (i = 0; i < gameGrid.length; i++){
   // create a div element and assing to var cars 
   var card = document.createElement('div'); 
   // apply card class to that div 
   card.classList.add('card');
   // set the data-name attribute of the div to the gameGrid 
   card.dataset.name = gameGrid[i].name;
   
   // create front of card
   var front = document.createElement('div');
   front.classList.add('front');

   // create back of card 
   var back = document.createElement('div');
   back.classList.add('back');
   back.style.backgroundImage = `url(${gameGrid[i].img})`;

   // append card to grid
   grid.appendChild(card);
   card.appendChild(front);
   card.appendChild(back);

  }

  // add event listner to the grid
  grid.addEventListener('click', function(event){
    // declare variable to target clicked item 
    var clicked = event.target;
    //do not allow the grid selection itself to be selected
    // only select divs inside the grid 
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected') ){
        return;
    }

    if (count < 2 ){
        count++;
        
        if (count === 1){
            //assign first guess 
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            // assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
     // checking if both string are not empty 
     if (firstGuess !== '' && secondGuess !== ''){
        // check if they match 
        if (firstGuess === secondGuess){
            // run match function
            setTimeout(match, delay);
            setTimeout(resetGuesses, delay);
        
        } else {
            setTimeout(resetGuesses, delay);
        }
     }
     previousTarget = clicked;
    }
  });