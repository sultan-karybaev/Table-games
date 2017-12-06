//Создаем поле
function SeaFight() {

    var main = document.getElementById("main-field");
    main.style.width = "500px";

    var grid = [];

    //Создаем двумерный массив и заполняем его нулями
    for (var i = 0; i < 10; i++) {
        grid[i] = [];
        for (var j = 0; j < 10; j++) {
            grid[i][j] = 0;
        }
    }

    //Заполняем html код
    var html = "";
    for (var i = 0; i < 100; i++) {
        html = html + "<div class='game-field'></div>";
    }

    main.innerHTML = html;

    //Переменные о свойсвах поля
    var count1Ship = 4;
    var count2Ship = 3;
    var count3Ship = 2;
    var count4Ship = 1;
    var count = 0;

    var deadShipCount = 0;

    var Coord;
    var Random;

    createField();

    console.log(grid);

    //Создаем поле с кораблями
    function createField() {
        //Длина корабля
        var l;

        while (true) {
            //Считаем количество свободных ячеек
            var r = 0;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (grid[i][j] === 0) r++;
                }
            }

            //Определяем какой корабль на очереди для установки или очередь кончилась
            if (count < count4Ship) {
                l = 4;
            } else if (count < count4Ship + count3Ship) {
                l = 3;
            } else if (count < count4Ship + count3Ship + count2Ship) {
                l = 2;
            } else if (count < count4Ship + count3Ship + count2Ship + count1Ship) {
                l = 1;
            } else {
                break;
            }
            //console.log("r " + r);

            //Выбираем случайную ячейку
            Random = Math.floor(Math.random() * r);

            //console.log("Random " + Random);
            //console.log("Count " + count);

            //Доходим до случайно выбранной ячейки
            var p = 0;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    if (grid[i][j] === 0) p++;
                    if (p === Random) {
                        Coord = i * 10 + j;

                        //Проверяем данную ячееку
                        var direction = checkPlace(Coord, l);

                        // console.log("Lenght " + l);
                        // console.log("Coord " + Coord);
                        // console.log("CheckPlace " + checkPlace(Coord, l));

                        if (direction > 0) {
                            //Устанавливаем корабль
                            setShip(direction, Coord, l);
                            count++;
                        }
                        i = 10;
                        j = 10;
                    }
                }
            }
        }
    }

    //Проверяем ячейку на возможность установки корабля и если да, то в каком направлении
    function checkPlace(c, l) {
        //с - координаты ячейки

        var directionW = 0;
        var directionH = 0;

        var height = Math.floor(c / 10);
        var width = c - Math.floor(c / 10) * 10;

        //Ширина и коэффициенты
        var w1 = 0;
        var w2 = 0;
        //Сканируем поле влево
        for (var i = 0; i < width; i++) {
            if (grid[height][width - 1 - i] === 0) {
                w1++;
            } else {
                break;
            }
        }
            //Сканируем поле вправо
            for (var i = 0; i < 10 - 1 - width; i++) {
                if (grid[height][width + 1 + i] === 0) {
                    w2++;
                } else {
                    break;
                }
            }
            if (w1 + w2 + 1 >= l) directionW++;

        //Высота и коэффициенты
        var h1 = 0;
        var h2 = 0;
        //Сканируем поле вверх
        for (var i = 0; i < height; i++) {
            if (grid[height - 1 - i][width] === 0) {
                h1++;
            } else {
                break;
            }
        }
            //Сканируем поле вниз
            for (var i = 0; i < 10 - 1 - height; i++) {
                if (grid[height + 1 + i][width] === 0) {
                    h2++;
                } else {
                    break;
                }
            }
            if (h1 + h2 + 1 >= l) directionH++;

        //Говорим в каком направлении можно поставить корабль
        if (directionW === 1 && directionH === 1) {
            return 3
        }
        else if (directionH === 1) {
            return 2
        }
        else if (directionW === 1) {
            return 1
        }
        else {
            return 0
        }
    }

    //Устанавливаем корабль
    function setShip(d, c, l) {
        //d - направление установки корабля
        //c - координаты ячейки
        //l - длина корабля

        var height = Math.floor(c / 10);
        var width = c - Math.floor(c / 10) * 10;
        grid[height][width] = l + 1;
        var shipW1 = 0;
        var shipW2 = 0;
        var shipH1 = 0;
        var shipH2 = 0;
        if (d === 3) d = Math.floor(Math.random() * 2 + 1);

        //Устанавлеваем корабль по ширине
        if (d === 1) {
            //Уснавливаем корабль влево
            for (var i = 0; i < width; i++) {
                if (shipW1 + shipW2 + 1 === l) {
                    setCover(d, width - shipW1, width + shipW2, height);
                    return;
                }
                if (grid[height][width - 1 - i] === 0) {
                    grid[height][width - 1 - i] = l + 1;
                    shipW1++;
                } else {
                    break;
                }
            }
            //Устанавливаем корабль вправо
            for (var i = 0; i < 10 - 1 - width; i++) {
                if (shipW1 + shipW2 + 1 === l) {
                    setCover(d, width - shipW1, width + shipW2, height);
                    return;
                }
                if (grid[height][width + 1 + i] === 0) {
                    grid[height][width + 1 + i] = l + 1;
                    shipW2++;
                } else {
                    break;
                }
            }
        }
        //Устанавливаем корабль по высоте
        else if (d === 2) {
            //Устанавливаем корабль вверх
            for (var i = 0; i < height; i++) {
                if (shipH1 + shipH2 + 1 === l) {
                    setCover(d, height - shipH1, height + shipH2, width);
                    return;
                }
                if (grid[height - 1 - i][width] === 0) {
                    grid[height - 1 - i][width] = l + 1;
                    shipH1++;
                } else {
                    break;
                }
            }
            //Устанавливаем корабль вниз
            for (var i = 0; i < 10 - 1 - height; i++) {
                if (shipH1 + shipH2 + 1 === l) {
                    setCover(d, height - shipH1, height + shipH2, width);
                    return;
                }
                if (grid[height + 1 + i][width] === 0) {
                    grid[height + 1 + i][width] = l + 1;
                    shipH2++;
                } else {
                    break;
                }
            }
        }
    }

    //Делаем оболочку вокруг корабля
    function setCover(dir, start, end, secondPar) {
        //dir - направление корабля (ширина или высота)
        //start - начало корабля
        //end - конец корабля
        //secondPar - второй параметр (ширина или высота)

        //Делаем оболочку для корабля по ширине
        if (dir === 1) {
            var w1 = start;
            var w2 = end;
            var height = secondPar;

            var a = w1 > 0;
            var b = w2 < 9;
            var c = height > 0;
            var d = height < 9;
            if (a) {
                grid[height][w1 - 1] = 1;
                if (b) {
                    grid[height][w2 + 1] = 1;
                    if (c) {
                        for (var i = 0; i < w2 - w1 + 3; i++) {
                            grid[height - 1][w1 - 1 + i] = 1;
                        }
                        if (d) {
                            for (var i = 0; i < w2 - w1 + 3; i++) {
                                grid[height + 1][w1 - 1 + i] = 1;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < w2 - w1 + 3; i++) {
                            grid[height + 1][w1 - 1 + i] = 1;
                        }
                    }
                } else {
                    if (c) {
                        for (var i = 0; i < w2 - w1 + 2; i++) {
                            grid[height - 1][w1 - 1 + i] = 1;
                        }
                        if (d) {
                            for (var i = 0; i < w2 - w1 + 2; i++) {
                                grid[height + 1][w1 - 1 + i] = 1;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < w2 - w1 + 2; i++) {
                            grid[height + 1][w1 - 1 + i] = 1;
                        }
                    }
                }
            } else {
                grid[height][w2 + 1] = 1;
                if (c) {
                    for (var i = 0; i < w2 - w1 + 2; i++) {
                        grid[height - 1][w1 + i] = 1;
                    }
                    if (d) {
                        for (var i = 0; i < w2 - w1 + 2; i++) {
                            grid[height + 1][w1 + i] = 1;
                        }
                    }
                }
                else {
                    for (var i = 0; i < w2 - w1 + 2; i++) {
                        grid[height + 1][w1 + i] = 1;
                    }
                }
            }
        }
        //Делаем оболочку для корабля по высоте
        else if (dir === 2) {
            var h1 = start;
            var h2 = end;
            var width = secondPar;

            var a = h1 > 0;
            var b = h2 < 9;
            var c = width > 0;
            var d = width < 9;
            if (a) {
                grid[h1 - 1][width] = 1;
                if (b) {
                    grid[h2 + 1][width] = 1;
                    if (c) {
                        for (var i = 0; i < h2 - h1 + 3; i++) {
                            grid[h1 - 1 + i][width - 1] = 1;
                        }
                        if (d) {
                            for (var i = 0; i < h2 - h1 + 3; i++) {
                                grid[h1 - 1 + i][width + 1] = 1;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < h2 - h1 + 3; i++) {
                            grid[h1 - 1 + i][width + 1] = 1;
                        }
                    }
                } else {
                    if (c) {
                        for (var i = 0; i < h2 - h1 + 2; i++) {
                            grid[h1 - 1 + i][width - 1] = 1;
                        }
                        if (d) {
                            for (var i = 0; i < h2 - h1 + 2; i++) {
                                grid[h1 - 1 + i][width + 1] = 1;
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < h2 - h1 + 2; i++) {
                            grid[h1 - 1 + i][width + 1] = 1;
                        }
                    }
                }
            } else {
                grid[h2 + 1][width] = 1;
                if (c) {
                    for (var i = 0; i < h2 - h1 + 2; i++) {
                        grid[h1 + i][width - 1] = 1;
                    }
                    if (d) {
                        for (var i = 0; i < h2 - h1 + 2; i++) {
                            grid[h1 + i][width + 1] = 1;
                        }
                    }
                }
                else {
                    for (var i = 0; i < h2 - h1 + 2; i++) {
                        grid[h1 + i][width + 1] = 1;
                    }
                }
            }
        }
    }

//----------------------------
    var win = false;

    //Добавляем для каждого DOM элемента в поле слушателя
    for (var i = 0; i < main.children.length; i++) {
        (function (index) {
            main.children[i].onclick = function () {
                if (!win) {
                    var point = grid[Math.floor(index / 10)][index - Math.floor(index / 10) * 10];
                    console.log(point);
                    if (point >= 0) {
                        if (point === 0 || point === 1) {
                            main.children[index].style.backgroundColor = "white";
                        } else {
                            var hit = checkShip(Math.floor(index / 10), index - Math.floor(index / 10) * 10, point - 1);
                            grid[Math.floor(index / 10)][index - Math.floor(index / 10) * 10] = -1;
                            if (!hit) main.children[index].style.backgroundColor = "yellow";
                        }
                    }
                }
            }
        })(i);
    }

    //Сканируем на уничтожение или ранение корабля
    function checkShip(height, width, length) {
        var arr = [];
        var arg;

        //Сканируем по ширине
        var a1 = 0, a2 = 0;
        for (var w = 0; w < width; w++) {
            if (grid[height][width - 1 - w] !== 1) {
                if (grid[height][width - 1 - w] === -1) a1++;
            } else {
                break;
            }
        }
        for (var w = 0; w < 10 - width - 1; w++) {
            if (grid[height][width + 1 + w] !== 1) {
                if (grid[height][width + 1 + w] === -1) a2++;
            } else {
                break;
            }
        }
        if (a1 + a2 + 1 === length) {
            for (var i = 0; i < a1; i++) {
                arg = height * 10 + width - 1 - i;
                arr.push(arg);
            }
            for (var i = 0; i < a2; i++) {
                arg = height * 10 + width + 1 + i;
                arr.push(arg);
            }
            arr.push(height * 10 + width);
            deadShip(arr);
            return true;
        }

        //Сканируем по высоте
        var b1 = 0, b2 = 0;
        for (var h = 0; h < height; h++) {
            if (grid[height - 1 - h][width] !== 1) {
                if (grid[height - 1 - h][width] === -1) b1++;
            } else {
                break;
            }
        }
        for (var h = 0; h < 10 - height - 1; h++) {
            if (grid[height + 1 + h][width] !== 1) {
                if (grid[height + 1 + h][width] === -1) b2++;
            } else {
                break;
            }
        }
        if (b1 + b2 + 1 === length) {
            for (var i = 0; i < b1; i++) {
                arg = (height - 1 - i) * 10 + width;
                arr.push(arg);
            }
            for (var i = 0; i < b2; i++) {
                arg = (height + 1 + i) * 10 + width;
                arr.push(arg);
            }
            arr.push(height * 10 + width);
            deadShip(arr);
            return true;
        }
    }

    //Обозначаем унижтожение корабля
    function deadShip(array) {
        for (var i = 0; i < array.length; i++) {
            main.children[array[i]].style.backgroundColor = "red";
        }
        deadShipCount++;
        if (deadShipCount === count4Ship + count3Ship + count2Ship + count1Ship) {
            win = true;
            document.getElementById("modal").style.display = "flex";
            setTimeout(modalWin, 0);
        }

        //Запускаем модальное окно победителя
        function modalWin() {
            document.getElementById("modal").style.opacity = 1;
            document.getElementById("modal-window-text").innerHTML = "You won! My congratulations";
        }
    }


}