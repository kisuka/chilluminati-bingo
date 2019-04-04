let board = [[false, false, false, false, false],
             [false, false, false, false, false],
             [false, false, true, false, false],
             [false, false, false, false, false],
            [false, false, false, false, false]];
let common = [];
let donators = [];

let  grid = document.getElementById("flex-grid");

function generateCards(items) {
    items = Object.assign([], items)
    for (i = 0; i < 5; i++) {
        row = document.createElement("div")
        row.id = "row" + i
        for (j = 0; j < 5; j++) {
            if (i === 2 && j === 2) {
                let  box = document.createElement("div");
                box.textContent = "FREE";
                box.id = "box" + i + "" + j;
                box.className = "box";
                box.style.backgroundColor = "#addaff";
                box.addEventListener("click", () => { clickHandler(box);}, false);
                row.appendChild(box);
                continue;
            }
            let  box = document.createElement("div");
            box.textContent = getRandomElement(items)
            box.id = "box" + i + "" + j
            box.className = "box"
            box.addEventListener("click", () => { clickHandler(box);}, false);
            row.appendChild(box);
        }
        grid.appendChild(row)
    }
};

function clickHandler(box) {
    let i = box.id[3];
    let j = box.id[4];
    board[i][j] = true;

    let bamm = new Audio('bamm.m4a');
    bamm.play();

    box.style.backgroundColor = "#addaff";
    console.log(box)
    
   // console.log(i, j);
    console.log(board);
    checkBoard(i, j);
}

function checkBoard(i, j) {
    let row = true;
    for (let x = 0; x < 5; x++) {
        row &= board[i][x];
    }
    let column = true;
    for (let x = 0; x < 5; x++) {
        column &= board[x][j];
    }

    if (column || row) {
        bingo();
    }

    if (board[0][0] && board[1][1] && board[2][2]
        && board[3][3] && board[4][4]) {
        bingo();
    }
}

function bingo() {
    let victory_music = new Audio("victory_music.m4a");
    victory_music.voluem = .7;
    victory_music.play();

    let bing = new Audio("bing.m4a");
    bing.play();
    
    let pepe = document.createElement("img");
    pepe.src = "medium_pepe.gif";
    pepe.style.position = 'absolute';
    pepe.style.left = '10px';
    pepe.style.top = '10px';
    pepe.style.zIndex = 2;
    
    let pepe2 = document.createElement("img");
    pepe2.src = "medium_pepe.gif";
    pepe2.style.position = 'absolute';
    pepe2.style.right = '10px';
    pepe2.style.top = '10px';
    pepe2.style.zIndex = 2;

    let confetti = document.createElement("img");
    confetti.src = "confetti.gif";
    confetti.style.position = "absolute";
    confetti.style.top = "0px";
    confetti.style.left = "0px";
   // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    //var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
     if(window.innerWidth !== undefined && window.innerHeight !== undefined) { 
         var w = window.innerWidth;
         var h = window.innerHeight;
         
     } else {  
         var w = document.documentElement.clientWidth;
         var h = document.documentElement.clientHeight;
         
     }

    confetti.style.width = w + "px";
    confetti.style.height = h + "px";
    confetti.style.opacity = .8;
    confetti.style.zIndex = 3;

    let yogp = document.createElement("img");
    yogp.src = "yogp.gif"
    yogp.style.position = "absolute";
    yogp.style.left = (w / 2) - (w * 0.15) + "px";
    yogp.style.top = (w / 2) - (w * 0.32) + "px";
    yogp.style.width = w*0.3 + "px";
    yogp.style.height = w*0.3 + "p;";
    yogp.style.opacity = .5;
    yogp.style.zIndex = 1;
    
    document.body.appendChild(pepe);
    document.body.appendChild(pepe2);
    document.body.appendChild(confetti);
    document.body.appendChild(yogp);
}

function getRandomElement(list) {
    var index = Math.floor(Math.random() * list.length);
    var item = list[index];
    list.splice(index, 1);
    //console.log(list.length)
    return item;
}

function newBoard() {
    let container  = document.getElementById("container")
    container.removeChild(grid);
    grid = document.createElement("div");
    grid.id = "flex-grid";
    container.appendChild(grid);

    let useDonators = document.getElementById("donators_checkbox").checked;

    if (useDonators) {
        generateCards(common.concat(donators));
    } else {
        generateCards(common);
    }
    
}

function load(){
    fetch(`options.json`).then(val => val.json()).then((options) => {
        common = options['common'];
        donators = options['donators'];
        newBoard();
    })
}
load();