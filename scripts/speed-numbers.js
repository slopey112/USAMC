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
    numbers = arr;
    return arr;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function finish() {
    right.removeChild(document.getElementById("numbers"));
    right.removeChild(document.getElementById("overlay"));
    document.getElementById("finish").style.display = "flex";
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
            return;
        }
        s--;
    }, 1000);
};

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