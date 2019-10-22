let numbers = 0;

function createTable(tableData) {
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');

    tableData.forEach(function(rowData) {
        let row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.getElementById("numbers").appendChild(table);
}

function generateNumbers() {
    let arr = [];
    for (let i = 0; i < 25; i++) {
        arr.push([]);
        for (let j = 0; j < 20; j++) {
            arr[i].push(Math.floor(Math.random() * 10));
        }
        arr[i].push('\xa0\xa0\xa0');
        if (i > 8) arr[i].push('ROW ' + (i + 1));
        else arr[i].push('ROW 0' + (i + 1));
    }
    numbers = [];
    for (let i = 0; i < 25; i++) {
        numbers.push([]);
        for (let j = 0; j < 20; j++) {
            numbers[i].push(arr[i][j]);
        }
    }
    return arr;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let s = 299;

createTable(generateNumbers());
var timeUsed = 300;

let button = document.getElementById("clear");
let overlay = document.getElementById("overlay");
let interval = 0;
button.onclick = async function () {
    await sleep(125);
    overlay.style.display = "none";
    interval = setInterval(function () {
        document.getElementById("timer").innerText = (new Date).clearTime().addSeconds(s).toString('m:ss');
        if (s === 0) {
            clearInterval(interval);
            finish();
            return;
        }
        s--;
    }, 1000);
};

function finish() {
    timeUsed -= s;
    let x = 0;
    let y = 0;
    overlay.parentNode.removeChild(overlay);
    clearInterval(interval);
    s = 600;
    let reset = document.getElementsByClassName("control")[1];
    reset.parentNode.removeChild(reset);
    interval = setInterval(function () {
        document.getElementById("timer").innerText = (new Date).clearTime().addSeconds(s).toString('m:ss');
        if (s === 0) {
            clearInterval(interval);
            console.log("done");
            return;
        }
        s--;
    }, 1000);
    let rows = document.getElementsByTagName("tbody")[0].children;
    for (let i = 0; i < 25; i++) {
        let row = rows[i].children;
        for (let j = 0; j < 20; j++) {
            let cell = row[j];
            cell.innerText = "\xa0";
        }
    }
    let input = [];
    let score = 0;
    let flag = false;
    document.onkeydown = async function(evt) {
        if (flag) return;
        let cell = rows[y].children[x];
        if (!isNaN(evt.key)) {
            cell.innerText = evt.key;
            if (x === 19) {
                let correct = 0;
                for (let i = 0; i < 20; i++) {
                    cell = rows[y].children[i];
                    if (parseInt(cell.innerText) === numbers[y][i]) {
                        cell.style.color = "green";
                        correct++;
                    } else {
                        cell.style.color = "red";
                        flag = true;
                    }
                }
                await sleep(1000);
                if (flag) {
                    clearInterval(interval);
                    showScores(score);
                    console.log("finish");
                    return;
                }
                x = 0;
                if (y === 24) {
                    score += correct;
                    clearInterval(interval);
                    showScores(score);
                    return;
                }
                y++;
                score += 20;
            } else {
                x++;
            }
        } else if (evt.key === "Backspace" && x !== 0) {
            x--;
            cell = rows[y].children[x];
            cell.innerText = "";
        }
    }

    document.getElementsByClassName("control")[0].onclick = function () {
        clearInterval(interval);
        showScores(score);
    }
}

function showScores(pts) {
    let numbers = document.getElementById("numbers");
    numbers.parentNode.removeChild(numbers);
    document.getElementById("score").style.display = "block";
    let tags = document.getElementsByClassName("n");
    tags[0].innerText = pts;
    tags[1].innerText = timeUsed;
}

let reset = document.getElementsByClassName("control")[1];
reset.onclick = function() {
    overlay.style.display = "flex";
    s = 299;
    document.getElementById("timer").innerText = "5:00";
    clearInterval(interval);
    let table = document.getElementsByTagName("table")[0];
    table.parentNode.removeChild(table);
    createTable(generateNumbers());
};

let stop = document.getElementsByClassName("control")[0];
stop.onclick = finish;

let buttons = document.getElementsByClassName("collapse");
let left = buttons[0];
let right = buttons[1];

left.style.visibility = "hidden";

right.onclick = function () {
    document.getElementById("left").style.display = "none";
    document.getElementById("right").style.width = "100%";
    left.style.visibility = "visible";
    right.style.visibility = "hidden";
};

left.onclick = function () {
    document.getElementById("left").style.display = "flex";
    document.getElementById("right").style.width = "60%";
    left.style.visibility = "hidden";
    right.style.visibility = "visible";
};