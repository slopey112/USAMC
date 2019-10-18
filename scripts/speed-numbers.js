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
    for (i = 0; i < 25; i++) {
        if (i > 8) arr.push(['ROW ' + (i + 1) + '\xa0\xa0']);
        else arr.push(['ROW 0' + (i + 1) + '\xa0\xa0']);
        for (j = 0; j < 20; j++) {
            arr[i].push(Math.floor(Math.random() * 10));
        }
    }
    console.log(arr);
    return arr;
}

createTable(generateNumbers());