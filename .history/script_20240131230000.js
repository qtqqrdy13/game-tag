document.addEventListener("DOMContentLoaded", function () {
    const puzzleContainer = document.getElementById("puzzle-container");
    let emptyPosition = { row: 3, col: 3 };
    function createPuzzle() {
        let numbers = Array.from({ length: 15 }, (_, index) => index + 1);
        numbers = shuffleArray(numbers.concat(null));
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const piece = document.createElement("div");
                piece.classList.add("puzzle-piece");
                piece.textContent = numbers[row * 4 + col];
                piece.dataset.row = row.toString();
                piece.dataset.col = col.toString();
                if (row === emptyPosition.row && col === emptyPosition.col) {
                    piece.classList.add("empty");
                }
                else {
                    piece.addEventListener("click", handlePieceClick)
                }
                puzzleContainer.appendChild(piece);
            }
        }
    }
    function handlePieceClick() {
        const clickedPiece = this;
        const clickedRow = parseInt(clickedPiece.dataset.row);
        const clickedCol = parseInt(clickedPiece.dataset.col);
        const canMove = canMoveToEmptySpace(clickedRow, clickedCol);
        if (canMove) {
            animateMove(clickedPiece, emptyPosition.row, emptyPosition.col);
            emptyPosition = {
                row: clickedRow,
                col: clickedCol
            }
            if (isPuzzleSolved()) {
                setTimeout(() => {
                    // alert("Congrats!You win!");
                   // resetPuzzle();
                }, 200)
            }
        }
    }
    function canMoveToEmptySpace(row, col) {
        return (
            (row === emptyPosition.row && Math.abs(col - emptyPosition.col) === 1) || (col === emptyPosition.col && Math.abs(row - emptyPosition.row) === 1)
        )

    }
    function animateMove(piece, targetRow, targetCol){
        const currentRow = parseInt(piece.dataset.row); 
        const currentCol = parseInt(piece.dataset.col);
        piece.style.transition = "transform 0.5s ease-in-out";
        piece.style.transform = `translate(${(targetCol - currentCol)* 100}px, ${(targetRow - currentRow)* 100}px,)`;
        piece.dataset.row = targetRow.toString();
        piece.dataset.col  =targetCol.toString();
        setTimeout(() => {
            piece.style.transition = 'none';
            piece.style.transform = 'none';
            if(targetRow === emptyPosition.row && targetCol === emptyPosition.col){
                piece.classList.add('empty');
                
            }
        }, 200);
    }
        function isPuzzleSolved(){
            const pieces = document.querySelectorAll(".puzzle-piece");
            let number = 1;
            for(let piece of pieces){
                const row = parseInt(piece.dataset.row);
                const col = parseInt(piece.dataset.col);
                if(row !== Math.floor((number - 1) / 4 ) && col !== (number - 1) % 4){
                    return false;
                }
                number++;
            }
            return true;
        }
        function resetPuzzle(){
            puzzleContainer.innerHTML = '';
            createPuzzle();
        }
        function shuffleArray(array){
            for(let i = array.length - 1; i > 0; i--){
                const j = Math.floor(Math.random()*(i + 1));
                [array[i],array[j]] = [array[j],array[i]];
            }
            return array;
        }
        createPuzzle();
    

})



