function OvsX() {


    var main = document.getElementById("main-field");
    main.style.width = "700px";

    var grid = [];

    for (var i = 0; i < 14; i++) {
        grid[i] = [];
        for (var j = 0; j < 14; j++) {
            grid[i][j] = 0;
        }
    }

    var html = "";
    for (var i = 0; i < 196; i++) {
        html = html + "<div class='game-field'></div>";
    }

    main.innerHTML = html;

    var move = 0;
    var win = false;

    for (var i = 0; i < main.children.length; i++) {
        (function (index) {
            main.children[i].onclick = function () {
                if (!win) {
                    if (this.innerHTML === "") {
                        if (move % 2 === 0) {
                            this.innerHTML = "O";
                            grid[Math.floor(index / 14)][index - Math.floor(index / 14) * 14] = 1;
                            win = check5(Math.floor(index / 14), index - Math.floor(index / 14) * 14, 1);
                        }
                        if (move % 2 === 1) {
                            this.innerHTML = "X";
                            grid[Math.floor(index / 14)][index - Math.floor(index / 14) * 14] = 2;
                            win = check5(Math.floor(index / 14), index - Math.floor(index / 14) * 14, 2);
                        }
                        move++;
                    }
                }
            }
        })(i);
    }

    function check5(height, width, index) {
        var arr = [];
        var center;
        var arg;
        //height checking
        var a1 = 0, a2 = 0;
        for (var h = 0; h < height; h++) {
            if (grid[height - 1 - h][width] === index) {
                a1++;
            } else {
                break;
            }
        }
        for (var h = 0; h < 14 - height - 1; h++) {
            if (grid[height + 1 + h][width] === index) {
                a2++;
            } else {
                break;
            }
        }
        if (a1 + a2 >= 4) {
            // for (var i = 0; i < a1; i++) {
            //     arg = (height - 1 - i) * 14 + width;
            //     arr.push(arg);
            // }
            // for (var i = 0; i < a2; i++) {
            //     arg = (height + 1 + i) * 14 + width;
            //     arr.push(arg);
            // }
            // arr.push(height * 14 + width);
            // winRed(arr);

            center = (height - (a1 - a2) / 2) * 14 + width;
            lineCenter(center, 1, index);
            return true;
        }

        //width checking
        var b1 = 0, b2 = 0;
        for (var w = 0; w < width; w++) {
            if (grid[height][width - 1 - w] === index) {
                b1++;
            } else {
                break;
            }
        }
        for (var w = 0; w < 14 - width - 1; w++) {
            if (grid[height][width + 1 + w] === index) {
                b2++;
            } else {
                break;
            }
        }
        if (b1 + b2 >= 4) {
            // for (var i = 0; i < b1; i++) {
            //     arg = height * 14 + width - 1 - i;
            //     arr.push(arg);
            // }
            // for (var i = 0; i < b2; i++) {
            //     arg = height * 14 + width + 1 + i;
            //     arr.push(arg);
            // }
            // arr.push(height * 14 + width);
            // winRed(arr);

            center = height * 14 + width - (b1 - b2) / 2;
            lineCenter(center, 2, index);
            return true;
        }

        //wh checking
        var c1 = 0, c2 = 0;
        for (var h = 0, w = 0; h < height && w < width; h++, w++) {
            if (grid[height - 1 - h][width - 1 - w] === index) {
                c1++;
            } else {
                break;
            }
        }
        for (var h = 0, w = 0; h < 14 - height - 1 && w < 14 - width - 1; h++, w++) {
            if (grid[height + 1 + h][width + 1 + w] === index) {
                c2++;
            } else {
                break;
            }
        }
        if (c1 + c2 >= 4) {
            // for (var i = 0; i < c1; i++) {
            //     arg = (height - 1 - i) * 14 + width - 1 - i;
            //     arr.push(arg);
            // }
            // for (var i = 0; i < c2; i++) {
            //     arg = (height + 1 + i) * 14 + width + 1 + i;
            //     arr.push(arg);
            // }
            // arr.push(height * 14 + width);
            // winRed(arr);

            center = (height - (c1 - c2) / 2) * 14 + width - (c1 - c2) / 2;
            lineCenter(center, 3, index);
            return true;
        }

        //hw checking
        var d1 = 0, d2 = 0;
        for (var h = 0, w = 0; h < height && w < 14 - width - 1; h++, w++) {
            if (grid[height - 1 - h][width + 1 + w] === index) {
                d1++;
            } else {
                break;
            }
        }
        for (var h = 0, w = 0; h < 14 - height - 1 && w < width; h++, w++) {
            if (grid[height + 1 + h][width - 1 - w] === index) {
                d2++;
            } else {
                break;
            }
        }
        if (d1 + d2 >= 4) {
            // for (var i = 0; i < d1; i++) {
            //     arg = (height - 1 - i) * 14 + width + 1 + i;
            //     arr.push(arg);
            // }
            // for (var i = 0; i < d2; i++) {
            //     arg = (height + 1 + i) * 14 + width - 1 - i;
            //     arr.push(arg);
            // }
            // arr.push(height * 14 + width);
            // winRed(arr);

            center = (height - (d1 - d2) / 2) * 14 + width + (d1 - d2) / 2;
            lineCenter(center, 4, index);
            return true;
        }
    }

    function winRed(array) {
        for (var i = 0; i < array.length; i++) {
            main.children[array[i]].style.color = "red";
        }
    }

    function lineCenter(index, direction, OorX) {
        main.children[index].innerHTML = main.children[index].innerHTML + "<div id=\"winLine\" class=\"winLine\"></div>";


        document.getElementById("modal").style.display = "flex";

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

        function modalWin() {
            //document.getElementById("modal").style.display = "flex";
            document.getElementById("modal").style.opacity = 1;
            if (OorX === 1) {
                document.getElementById("modal-window-text").innerHTML = "Noliki won! My congratulations";
            } else if (OorX === 2) {
                document.getElementById("modal-window-text").innerHTML = "Krestiki won! My congratulations";
            }
        }
    }


}