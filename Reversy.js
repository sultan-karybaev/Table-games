function Reversy(SIZE) {
    var main = document.getElementById("main-field");
    main.style.width = 50 * SIZE + "px";

    var grid = [];

    //Создаем двумерный массив и заполняем его нулями
    for (var i = 0; i < SIZE; i++) {
        grid[i] = [];
        for (var j = 0; j < SIZE; j++) {
            grid[i][j] = 0;
        }
    }

    //Заполняем html код
    var html = "";
    for (var i = 0; i < SIZE * SIZE; i++) {
        html = html + "<div class='game-field'></div>";
    }

    main.innerHTML = html;


    //start game
    var a = Math.floor((SIZE - 1) / 2);
    var b = Math.ceil(SIZE / 2);
    grid[a][a] = 1;
    main.children[a * SIZE + a].innerHTML = "<div class=\"reversyRed\"></div>";
    grid[a][b] = 2;
    main.children[a * SIZE + b].innerHTML = "<div class=\"reversyGreen\"></div>";
    grid[b][a] = 2;
    main.children[b * SIZE + a].innerHTML = "<div class=\"reversyGreen\"></div>";
    grid[b][b] = 1;
    main.children[b * SIZE + b].innerHTML = "<div class=\"reversyRed\"></div>";


    var move = 0;
    var win = false;

    document.getElementById("center-block-description-move-block-sign").innerHTML = "<div class=\"reversyRed\"></div>";

    //Добавляем ко всем DOM элементам сетки слушателей
    for (var i = 0; i < main.children.length; i++) {
        (function (index) {
            main.children[i].onclick = function () {
                if (!win) {
                    if (this.innerHTML === "") {
                        // console.log("Move " + move);
                        if (move % 2 === 0) {
                            this.innerHTML = "<div class=\"reversyRed\"></div>";
                            grid[Math.floor(index / SIZE)][index - Math.floor(index / SIZE) * SIZE] = 1;
                            checkLine(Math.floor(index / SIZE), index - Math.floor(index / SIZE) * SIZE, 1);
                        } else if (move % 2 === 1) {
                            this.innerHTML = "<div class=\"reversyGreen\"></div>";
                            grid[Math.floor(index / SIZE)][index - Math.floor(index / SIZE) * SIZE] = 2;
                            checkLine(Math.floor(index / SIZE), index - Math.floor(index / SIZE) * SIZE, 2);
                        }
                        move++;
                        if (move === SIZE * SIZE) {
                            gameOver();
                        }
                        console.log("Move++ " + move);
                        // console.log("Move 1 or 2 " + move % 2);
                        // console.log(grid);
                    }
                }
            }
        })(i);
    }

    function checkLine(height, width, index) {
        // console.log("checkLine");
        // console.log(height);
        // console.log(width);

        var moveAllow = 0;

        //north
        var n = 0;
        for (var i = 0; i < height; i++) {
            if (grid[height - i - 1][width] === 0){
                break;
            } else if (grid[height - i - 1][width] === index) {
                if (n > 0) moveAllow++;
                for (var m = i; m > 0; m--) {
                    changeColor(height - m, width, index);
                }
                break;
            } else {
                n++;
            }
        }

        //north-east
        var ne = 0;
        for (var i = 0, j = 0; i < height && j < SIZE - width - 1; i++, j++) {
            if (grid[height - i - 1][width + j + 1] === 0){
                break;
            } else if (grid[height - i - 1][width + j + 1] === index) {
                if (ne > 0) moveAllow++;
                for (var m = i, n = j; m > 0, n > 0; m--, n--) {
                    changeColor(height - m, width + n, index);
                }
                break;
            } else {
                ne++;
            }
        }

        //east
        var e = 0;
        for (var i = 0; i < SIZE - width - 1; i++) {
            if (grid[height][width + i + 1] === 0){
                break;
            } else if (grid[height][width + i + 1] === index) {
                if (e > 0) moveAllow++;
                for (var m = i; m > 0; m--) {
                    changeColor(height, width + m, index);
                }
                break;
            } else {
                e++;
            }
        }

        //south-east
        var se = 0;
        for (var i = 0, j = 0; i < SIZE - height - 1 && j < SIZE - width - 1; i++, j++) {
            if (grid[height + i + 1][width + j + 1] === 0){
                break;
            } else if (grid[height + i + 1][width + j + 1] === index) {
                if (se > 0) moveAllow++;
                for (var m = i, n = j; m > 0, n > 0; m--, n--) {
                    changeColor(height + m, width + n, index);
                }
                break;
            } else {
                se++;
            }
        }

        //south
        var s = 0;
        for (var i = 0; i < SIZE - height - 1; i++) {
            if (grid[height + i + 1][width] === 0){
                break;
            } else if (grid[height + i + 1][width] === index) {
                if (s > 0) moveAllow++;
                for (var m = i; m > 0; m--) {
                    changeColor(height + m, width, index);
                }
                break;
            } else {
                s++;
            }
        }

        //south-west
        var sw = 0;
        for (var i = 0, j = 0; i < SIZE - height - 1 && j < width; i++, j++) {
            if (grid[height + i + 1][width - j - 1] === 0){
                break;
            } else if (grid[height + i + 1][width - j - 1] === index) {
                if (sw > 0) moveAllow++;
                for (var m = i, n = j; m > 0, n > 0; m--, n--) {
                    changeColor(height + m, width - n, index);
                }
                break;
            } else {
                sw++;
            }
        }

        //west
        var w = 0;
        for (var i = 0; i < width; i++) {
            if (grid[height][width - i - 1] === 0){
                break;
            } else if (grid[height][width - i - 1] === index) {
                if (w > 0) moveAllow++;
                for (var m = i; m > 0; m--) {
                    changeColor(height, width - m, index);
                }
                break;
            } else {
                w++;
            }
        }

        //north-west
        var nw = 0;
        for (var i = 0, j = 0; i < height && j < width; i++, j++) {
            if (grid[height - i - 1][width - j - 1] === 0){
                break;
            } else if (grid[height - i - 1][width - j - 1] === index) {
                if (nw > 0) moveAllow++;
                for (var m = i, n = j; m > 0, n > 0; m--, n--) {
                    changeColor(height - m, width - n, index);
                }
                break;
            } else {
                nw++;
            }
        }

        if (moveAllow === 0) {
            console.log("moveAllow");
            grid[height][width] = 0;
            main.children[height * SIZE + width].innerHTML = "";
            move--;
            // console.log("Move-- " + move);
        } else {
            if (index === 1) {
                document.getElementById("center-block-description-move-block-sign").innerHTML = "<div class=\"reversyGreen\"></div>";
            } else if (index === 2) {
                document.getElementById("center-block-description-move-block-sign").innerHTML = "<div class=\"reversyRed\"></div>";
            }
        }
    }

    function changeColor(height, width, index) {
        grid[height][width] = index;
        if (index === 1) {
            main.children[height * SIZE + width].innerHTML = "<div class=\"reversyRed\"></div>";
        } else if (index === 2) {
            main.children[height * SIZE + width].innerHTML = "<div class=\"reversyGreen\"></div>";
        }
    }

    function gameOver() {
        var redWin = 0;
        var greenWin = 0;

        for (var i = 0; i < SIZE; i++) {
            grid[i] = [];
            for (var j = 0; j < SIZE; j++) {
                if (grid[i][j] === 1) redWin++;
                if (grid[i][j] === 2) greenWin++;
            }
        }

        //Запускаем модальное окно победителя
        function modalWin() {
            document.getElementById("modal").style.opacity = 1;
            if (redWin > greenWin) {
                document.getElementById("modal-window-text").innerHTML = "Red won! " + redWin + " vs " + greenWin;
            } else if (redWin < greenWin) {
                document.getElementById("modal-window-text").innerHTML = "Green won! " + greenWin + " vs " + redWin;
            }


        }
    }

}

