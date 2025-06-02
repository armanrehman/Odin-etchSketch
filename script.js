let isDrawing = false;
let currentGridSize = 16;

function createSquare(width,height)
{
    //creating individual square
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${width}px`
    square.style.height = `${height}px`;

    //event reactions for mouse actions
    square.addEventListener('mousedown', startDrawing);
    square.addEventListener('mouseenter', draw);
    square.addEventListener('mouseup', stopDrawing);

    //adding to container
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.appendChild(square)

    return square;
}

function createGrid(size)
{
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = ''; //empty grid
    currentGridSize = size

    //container dimensions
    const containerWidth = gridContainer.clientWidth;
    const containerHeight = gridContainer.clientHeight;

    const squareWidth = containerWidth / size;
    const squareHeight = containerHeight / size;

    let squareSize = gridContainer.offsetWidth / size;

    for (let i=0 ; i<size*size; i++)
    {
        createSquare(squareWidth,squareHeight);
    }
}

function startDrawing(e){
    isDrawing = true;
    e.target.classList.add('filled'); //indication that the square is being drawn on
}

function draw(e){
    if (isDrawing){
        e.target.classList.add('filled'); //continous drawing
    }
}

function stopDrawing() {
    isDrawing = false;
}

//eraser functionality
document.getElementById('eraseSlider').addEventListener('input',function(e){
    const sliderValue = parseInt(e.target.value);
    const squares = document.querySelectorAll('.square');
    const totalSquares = squares.length;
    const squaresToErase = Math.floor((sliderValue / 100) * totalSquares);

    //erasing horizontally
    for (let i=0; i<squaresToErase; i++)
    {
        squares[i].classList.remove('filled');
    }
});

//stop erasing once released
document.getElementById('eraseSlider').addEventListener('mouseup', function() {
    this.value = 0;
});


function newGrid(){
    let size = parseInt(prompt("Enter grid size of 1-64"));
    if (size && size > 0 && size<=64)
    {
        createGrid(size);
    }
}


window.addEventListener('load', function() {
    let gridSize = parseInt(prompt("Enter the size of the grid (1-64):"));
    if (gridSize && gridSize > 0 && gridSize <= 64) {
        createGrid(gridSize);
    } else {
        createGrid(16); // Default
    }
});


