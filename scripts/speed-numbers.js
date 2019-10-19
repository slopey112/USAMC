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
            arr[i].push('\xa0');
        }
        arr[i].push('\xa0\xa0\xa0');
        if (i > 8) arr[i].push('ROW ' + (i + 1));
        else arr[i].push('ROW 0' + (i + 1));
    }
    console.log(arr);
    return arr;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

createTable(generateNumbers());

let button = document.getElementById("clear");
button.onclick = async function () {
    let overlay = document.getElementById("overlay");
    await sleep(125);
    overlay.parentNode.removeChild(overlay);
};