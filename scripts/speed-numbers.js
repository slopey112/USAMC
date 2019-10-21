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
    let x = 0;
    let y = 0;
    document.getElementById("right").removeChild(document.getElementById("overlay"));
    clearInterval(interval);
    let rows = document.getElementsByTagName("tbody")[0].children;
    for (let i = 0; i < 25; i++) {
        let row = rows[i].children;
        for (let j = 0; j < 20; j++) {
            let cell = row[j];
            cell.innerText = "\xa0";
        }
    }
    document.onkeydown = function(evt) {
        let cell = rows[y].children[x];
        if (!isNaN(evt.key)) {
            cell.innerText = evt.key;
            if (parseInt(evt.key) === numbers[y][x]) {
                cell.style.color = "green";
            } else {
                cell.style.color = "red";
            }
            if (x === 19) {
                x = 0;
                y++;
            } else {
                x++;
            }
        } else if (evt.key === "Backspace") {
            if (x === 0) {
                x = 19;
                y--;
            } else {
                x--;
            }
            cell = rows[y].children[x];
            cell.innerText = "";
        }
    }
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