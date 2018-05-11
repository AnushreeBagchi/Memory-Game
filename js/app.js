/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var count=0, moveCount=0, a, list=[] , matchedGrid=[] ; 

var moves= function() {
                  moveCount++;
                  console.log("moves="+moveCount);
                } ;

var displayCard=function(el){
                     $(el).addClass("open show") 
                };

var openCardList = function(el){
                     a=$(el).find("i").attr('class');  
                     list.push(a);
                     console.log(list);
                     return list;    
                };

var matchedCard= function (el){                   
                    $(".open").addClass("match");  //adding class="match" to  matched grid
                    matchedGrid.push($(el).find("i").attr('class'));
                    console.log("matched cards"+matchedGrid);
                    if(matchedGrid.length===8)
                    {
                        gameComplete();
                    }
                };

var unmatchedCards= function(){
                     $(".card").removeClass("open show"); // remove class when not matched 
                };

var gameComplete= function(){
                    console.log("Congrats");
}                
 $(".card").on("click",function(){
    displayCard(this);    
    list=openCardList(this);

    if (list.length===2)
    {
        if(list[0]===list[1])
        {
            matchedCard(this);
        }
        else{
            unmatchedCards();
        }
        list=[] ; // reset array
        moves(); // increment moves counter    
    }
    
 });

 // code to restart the game
 $(".restart").on("click",function(){
    $(".card"). removeClass("open show match");
 });

