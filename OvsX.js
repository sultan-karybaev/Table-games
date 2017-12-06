//Слушаем какой размер сетки выберет пользователь
var selector = document.getElementById("selector");
selector.addEventListener("change", function () {
    OvsX(this.value);
});

//Создаем сетку
function OvsX(SIZE) {
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

    var move = 0;
    var win = false;

    //Добавляем ко всем DOM элементам сетки слушателей
    for (var i = 0; i < main.children.length; i++) {
        (function (index) {
            main.children[i].onclick = function () {
                if (!win) {
                    if (this.innerHTML === "") {
                        if (move % 2 === 0) {
                            this.innerHTML = "O";
                            grid[Math.floor(index / SIZE)][index - Math.floor(index / SIZE) * SIZE] = 1;
                            win = check5(Math.floor(index / SIZE), index - Math.floor(index / SIZE) * SIZE, 1);
                        }
                        if (move % 2 === 1) {
                            this.innerHTML = "X";
                            grid[Math.floor(index / SIZE)][index - Math.floor(index / SIZE) * SIZE] = 2;
                            win = check5(Math.floor(index / SIZE), index - Math.floor(index / SIZE) * SIZE, 2);
                        }
                        move++;
                    }
                }
            }
        })(i);
    }

    //Проверяем на наличие линии в 5 элементов
    function check5(height, width, index) {
        var center;

        //Высота и коэффициенты
        var a1 = 0, a2 = 0;
            //Сканируем линию вверх
            for (var h = 0; h < height; h++) {
                if (grid[height - 1 - h][width] === index) {
                    a1++;
                } else {
                    break;
                }
            }
                //Сканируем линию вниз
                for (var h = 0; h < SIZE - height - 1; h++) {
                    if (grid[height + 1 + h][width] === index) {
                        a2++;
                    } else {
                        break;
                    }
                }
                    //Если линия больше 5 запускаем функцию выигрыша
                    if (a1 + a2 >= 4) {
                        //Определяем центр линии
                        center = (height - (a1 - a2) / 2) * SIZE + width;
                        lineCenter(center, 1, index);
                        return true;
                    }

        //Ширина и коэффициенты
        var b1 = 0, b2 = 0;
            //Сканируем линию влево
            for (var w = 0; w < width; w++) {
                if (grid[height][width - 1 - w] === index) {
                    b1++;
                } else {
                    break;
                }
            }
                //Сканируем линию вправо
                for (var w = 0; w < SIZE - width - 1; w++) {
                    if (grid[height][width + 1 + w] === index) {
                        b2++;
                    } else {
                        break;
                    }
                }
                    //Если линия больше 5 запускаем функцию выигрыша
                    if (b1 + b2 >= 4) {
                        //Определяем центр линии
                        center = height * SIZE + width - (b1 - b2) / 2;
                        lineCenter(center, 2, index);
                        return true;
                    }

        //Ширина-высота и коэффициенты
        var c1 = 0, c2 = 0;
            //Сканируем линию на северо-восток
            for (var h = 0, w = 0; h < height && w < width; h++, w++) {
                if (grid[height - 1 - h][width - 1 - w] === index) {
                    c1++;
                } else {
                    break;
                }
            }
                //Сканируем линию на юго-запад
                for (var h = 0, w = 0; h < SIZE - height - 1 && w < SIZE - width - 1; h++, w++) {
                    if (grid[height + 1 + h][width + 1 + w] === index) {
                        c2++;
                    } else {
                        break;
                    }
                }
                    //Если линия больше 5 запускаем функцию выигрыша
                    if (c1 + c2 >= 4) {
                        //Определяем центр линии
                        center = (height - (c1 - c2) / 2) * SIZE + width - (c1 - c2) / 2;
                        lineCenter(center, 3, index);
                        return true;
                    }

        //Высота-ширина и коэффициенты
        var d1 = 0, d2 = 0;
            //Сканируем линию на северо-запад
            for (var h = 0, w = 0; h < height && w < SIZE - width - 1; h++, w++) {
                if (grid[height - 1 - h][width + 1 + w] === index) {
                    d1++;
                } else {
                    break;
                }
            }
                //Сканируем линию на юго-восток
                for (var h = 0, w = 0; h < SIZE - height - 1 && w < width; h++, w++) {
                    if (grid[height + 1 + h][width - 1 - w] === index) {
                        d2++;
                    } else {
                        break;
                    }
                }
                    //Если линия больше 5 запускаем функцию выигрыша
                    if (d1 + d2 >= 4) {
                        //Определяем центр линии
                        center = (height - (d1 - d2) / 2) * SIZE + width + (d1 - d2) / 2;
                        lineCenter(center, 4, index);
                        return true;
                    }
    }

    //Запускаем анимацию выигрышной линии
    function lineCenter(index, direction, OorX) {
        main.children[index].innerHTML = main.children[index].innerHTML + "<div id=\"winLine\" class=\"winLine\"></div>";

        document.getElementById("modal").style.display = "flex";

        //Определяем направление линии
        if (direction === 1) {
            setTimeout(h, 0);
            setTimeout(modalWin, 2000);
        } else if (direction === 2) {
            setTimeout(w, 0);
            setTimeout(modalWin, 2000);
        } else if (direction === 3) {
            setTimeout(wh, 0);
            setTimeout(modalWin, 2000);
        } else if (direction === 4) {
            setTimeout(hw, 0);
            setTimeout(modalWin, 2000);
        }

        function w() {
            document.getElementById("winLine").style.width = 216 + 'px';
            document.getElementById("winLine").style.left = -90 + 'px';
        }

        function h() {
            document.getElementById("winLine").style.height = 216 + 'px';
            document.getElementById("winLine").style.top = -90 + 'px';
        }

        function wh() {
            document.getElementById("winLine").style.transform = "rotate(45deg)";
            document.getElementById("winLine").style.width = 305 + 'px';
            document.getElementById("winLine").style.left = -134 + 'px';
        }

        function hw() {
            document.getElementById("winLine").style.transform = "rotate(-45deg)";
            document.getElementById("winLine").style.width = 305 + 'px';
            document.getElementById("winLine").style.left = -134 + 'px';
        }

        //Запускаем модальное окно победы
        function modalWin() {
            document.getElementById("modal").style.opacity = 1;
            if (OorX === 1) {
                document.getElementById("modal-window-text").innerHTML = "Noliki won! My congratulations";
            } else if (OorX === 2) {
                document.getElementById("modal-window-text").innerHTML = "Krestiki won! My congratulations";
            }
        }
    }


}