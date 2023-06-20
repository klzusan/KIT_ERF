function search() {
    const day = document.getElementById("day").value;
    const period = document.getElementById("period").value;

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const availableRooms = getAvailableRooms(data, day, period);
            displayResult(availableRooms, day, period);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function getAvailableRooms(data, day, period) {
    const availableRooms = {};

    for (const item of data) {
        if (!item.use.includes(day + period)) {
            if (!availableRooms[item.building]) {
                availableRooms[item.building] = [];
            }
            availableRooms[item.building].push(item.room);
        }
    }

    return availableRooms;
}

function displayResult(availableRooms, day, period) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    const youbi = day2youbi(day);

    const heading = document.createElement("p");
    heading.textContent = `${youbi}曜 ${period}限 の空き教室は以下の通りです。`;
    resultDiv.appendChild(heading);

    for (const building in availableRooms) {
        const rooms = availableRooms[building];

        const buildingHeader = document.createElement("h4");
        buildingHeader.textContent = `${building}`;
        resultDiv.appendChild(buildingHeader);

        const roomList = document.createElement("ul");
        //roomList.classList.add("list-group", "list-group-flush");

        for (const room of rooms) {
            const roomItem = document.createElement("li");
            roomItem.textContent = room;
            //roomItem.classList.add("list-group-item");
            roomList.appendChild(roomItem);
        }

        resultDiv.appendChild(roomList);
    }
}

function day2youbi(day){
    var trance = {Mon:'月', Tue:'火', Wed:'水', Thu:'木', Fri:'金', Sat:'土'};

    return trance[day];
}