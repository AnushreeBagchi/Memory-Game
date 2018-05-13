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
var count=0, moveCount=0, a, list=[] , matchedGrid=[] , starCount; 

var moves= function() {
                  moveCount++;            
                  $(".moves").text(moveCount);
                  return moveCount;
                } ;

var displayCard=function(el){
                     $(el).addClass("open show") 
                };

var openCardList = function(el){
                     a=$(el).find("i").attr('class');  
                     list.push(a);
                    // console.log(list);
                     return list;    
                };

var matchedCard= function (el){                   
                    $(".open").addClass("match");  //adding class="match" to  matched grid
                    $(".match"). removeClass("open show");
                    matchedGrid.push($(el).find("i").attr('class'));
                   // console.log("matched cards"+matchedGrid);
                    if(matchedGrid.length===8)
                    {
                        gameComplete();
                    }
                };

var unmatchedCards= function(){
                    
                     $(".card").removeClass("open show  red"); // remove class when not matched 
                };

var gameComplete= function(){
                    displaypage();

}    

var displaypage=function(){
                    $(".container").toggleClass("hide");
                    $(".winPage").toggleClass("hide");
}

var redGrid=function(){
    $(".show").addClass("red");
    setTimeout(unmatchedCards, 500);
};

var restart=  function (){
    moveCount =0;
    starCount=3;
    $(".moves").text(moveCount);
    $(".card"). removeClass("open show match");
    star(moveCount);

};

var star= function (moveCount){
    
     if (moveCount>8 && moveCount<14)
     {
        $( "ul.stars li:nth-child(3) i").removeClass("fa fa-star");
        $( "ul.stars li:nth-child(3) i").addClass("fa fa-star-o");
        starCount=2;    
        console.log(starCount);

     }
     else if (moveCount>=14 && moveCount< 20)
     {
        $( "ul.stars li:nth-child(2) i").removeClass("fa fa-star");
        $( "ul.stars li:nth-child(2) i").addClass("fa fa-star-o");
        starCount=1;
        console.log(starCount);
     }
     else if (moveCount>=20)
     {
        $( "ul.stars li:nth-child(1) i").removeClass("fa fa-star");
        $( "ul.stars li:nth-child(1) i").addClass("fa fa-star-o");
        starCount=0;
        console.log(starCount);
     }
     else{
         starCount=3;
         console.log(starCount);
         $("ul.stars li i").removeClass("fa fa-star-o");
         $("ul.stars li i").addClass("fa fa-star");
         
     }
     $(".starsCount").text(starCount);

     
};

 $(".card").on("click",function(){
    $(this).addClass("open show");
    list=openCardList(this);
        
    if (list.length===2)
    {
        if(list[0]===list[1])
        {
            matchedCard(this);
        }
        else{
            redGrid();  //Incase   of wrong match            
        }
        list=[] ; // reset array
        moveCount=moves(); // increment moves counter 
        star(moveCount); 
    }
 });

 // code to restart the game
 $(".restart").on("click",function(){
   restart();   
 });

$(".playAgain").on ("click",function(){
    restart();
    displaypage();
});