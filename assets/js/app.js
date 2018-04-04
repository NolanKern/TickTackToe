(function($) {
    $.fn.tictac = function() {
  
      return this.each(function() {
        var possibleWins = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
        ];
        var board = $(this);
        var squares = board.find("td");
        var X = "X";
        var O = "O";
        var playerXTurn = [1,3,5,7,9];
        var playerYTurn = [2,4,6,8];


        // when a square is clicked....
        squares.click(function() {
          var square = $(this);
          var squareIndex = squares.index(square);
          var played = false;
          var turn=1;
  
          // fill in the square with an X if it's open
          if(square.text() === ""  && (playerXTurn.indexOf(turn)>-1)) {
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
          
          // fill in the square with an O if it's open
          if(square.text() === ""  && (playerOTurn.indexOf(turn)>-1)) {
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
        });
      });
    };
  })(jQuery);


  