//Global variables
var playerX=null;
var playerO = null;
var playerXArray = [];
var playerOArray = [];
var turn =0;
var playerXTurn = [1,3,5,7,9];
var playerYTurn = [2,4,6,8];
var xWins=0;
var oWins=0;
var num = -1;
var xHere=false;
var oHere=false;
var possibleWins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Initialize Firebase
var config = {
    apiKey: "AIzaSyARa15ZYfiRmmfsaZ6ILnhu3A9KblhoJew",
    authDomain: "ticktacktoe-ed2f5.firebaseapp.com",
    databaseURL: "https://ticktacktoe-ed2f5.firebaseio.com",
    projectId: "ticktacktoe-ed2f5",
    storageBucket: "ticktacktoe-ed2f5.appspot.com",
    messagingSenderId: "154203265978"
    };
firebase.initializeApp(config);
  
// Get a reference to the database service
var database = firebase.database();

var connectionsRef = database.ref("/connections");

var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {
    // If they are connected..


    var con = connectionsRef.push("playerX");
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();

  });

  connectionsRef.on("value", function(snapshot) {
      var keys = Object.keys(snapshot.val());
        if(snapshot.val()[keys[0]]==="playerX"){
            console.log("1 player filled");
            playerX = snapshot.val()[keys[0]];
            xHere=true;
        }
        else{
            playerX= null;
            database.ref("/winrates/").remove();
            xHere=false;
        }

        if(snapshot.val()[keys[3]]==="playerX"){
            snapshot.val()[keys[3]]="playerO";
            console.log("both players here");
            playerO = snapshot.val()[keys[3]];
            oHere=true;
        }
        else{
            playerO=null;
            oHere=false;
        }

        if(xHere && oHere){
            turn+=1;
            console.log(turn);
        }
    })




    // return 
    $(this).each(function() {
        var possibleWins = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
        ];
        var board = $(this);
        var squares = board.find("td");
        var X = "X";
        var O = "O";

        // when a square is clicked....
        squares.click(function() {
          var square = $(this);
          var squareIndex = squares.index(square);
          var played = false;

            if(playerXTurn.indexOf(turn)>=0){
                // fill in the square with an X if it's open
                if(square.text() === "") {
                    square.text(X);
                    turn+=1;
                } else {
                    return;
                }
        
                // see if X has won, if so, something is wrong
                var xWins = false;
                $.each(possibleWins, function(index, winningCombo) {
                    var squaresWithX = [];
        
                    $.each(winningCombo, function(index, value) {
                    var currentSquare = squares.eq(value);
                    if(currentSquare.text() == X) {
                        squaresWithX.push(currentSquare);
                    }
                    });
        
                    if(squaresWithX.length == 3) {
                    $(squaresWithX).each(function() {
                        $(this).addClass("winner");
                    });
                    xWins = true;
                    console.log("XWins")
                    return false;
                    }
                });
        
                if(xWins) {
                    squares.unbind("click");
                    return;
                }
            }
            else if(playerOTurn.indexOf(turn)>=0){
                // fill in the square with an O if it's open
                if(square.text() === "") {
                    square.text(O);
                    turn+=1;
                } else {
                    return;
                }          
                    // see if O has won, if so, something is wrong
                    var oWins = false;
                    $.each(possibleWins, function(index, winningCombo) {
                    var squaresWithO = [];
            
                    $.each(winningCombo, function(index, value) {
                        var currentSquare = squares.eq(value);
                        if(currentSquare.text() == O) {
                        squaresWithO.push(currentSquare);
                        }
                    });
            
                    if(squaresWithO.length == 3) {
                        $(squaresWithO).each(function() {
                        $(this).addClass("winner");
                        });
                        oWins = true;
                        console.log("OWins")
                        return false;
                    }
                    });
            
                    if(oWins) {
                    squares.unbind("click");
                    return;
                    }
            }
            


        })
    })