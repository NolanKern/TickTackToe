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
        var player1 = false;
  
        var getAvailableSquares = function(board) {
          // get the indexes of all available squares for supplied board
          var allSquares = board.find("td");
          var emptySquares = board.find("td:empty");
          var emptyIndexes = [];
          for(var i = 0; i < emptySquares.length; i++) {
            emptyIndexes.push(allSquares.index(emptySquares[i]));
          }
          return emptyIndexes;
        };
  
        squares.click(function() {
          var square = $(this);
          var squareIndex = squares.index(square);
          var played = false;
          var possibleCombos;
  
          // fill in the square with an X if it's open
          if(square.text() === "") {
            square.text(X);
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

  