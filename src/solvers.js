/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({ n: n });
  //After a rook is placed we are no longer able to put another rook on the same column 
  //or row because they will be able to attack each other. This means that as soon as we 
  //place a rook in a position that it’s safe, we can then look to placing the next rook 
  //in a different row, and not in the same column.

  //create a function to check the rows. This is the function that we would initially call and it would 
  //recurse through all the rows until it ran through all options
  var solution = [];
  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i]);
  }

  var searchRow = function(row, col) {
    // place rook on board at row, col, start at pos (0, 0)
    board.togglePiece(row, col);
    //check if rook is in danger zone(in an attackable position)
    if (board.hasAnyRooksConflicts()) {
      //if it is, remove rook from board using togglePiece method
      //could also use board.attributes[row][col] = 1 to turn on and
      //board.attributes[row][col] = 0 to turn off.
      board.togglePiece(row, col);
      //we want to to see if the next column is safe but we also
      //need to make sure we're not in the last column
      if (col + 1 < n) {
        //if the next column is still open, go search it
        searchRow(row, col + 1);
      } else {
        //otherwise we've reached the end of the column and
        //it's time to check out the next row, for show
        searchRow(row + 1, 0);
      }
      //if we've made it this far, we must not be in a danger zone
    } else {
      //let's search the next row until there are none left
      if (row + 1 < n) {
        searchRow(row + 1, 0);
      }
    }
  };
  //start search at position(0,0);
  searchRow(0, 0);
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = _.memoize(function(n) {
  var board = new Board({ n: n });
  //set counter to 1 in situation where n = 1
  var solutionCounter = n === 0 ? 1 : 0;

  //check row for possilbe solution
  function isItASolution(row) { 
    // iterate over all column indices on this row
    for (var col = 0; col < n; col++) {
      //place rook on board at (row, col)
      board.togglePiece(row, col); 
      //if there aren't any conflicts at this position 
      if (!board.hasColConflictAt(col)) {
        //check the next row if it's still within the limit of n
        if (row + 1 < n) { 
          //recurse/check the next row
          isItASolution(row + 1);
        //if we've gotten this far, we have found a possible solution
        } else {
          solutionCounter++;
        }
      }
      //toggle rook placement off before checking next column index
      board.togglePiece(row, col); 
    }
  }
  //start checking at position 0
  isItASolution(0);
  return solutionCounter;
});



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
