window.onload = function () {
    //tutorial for building table

    fetch('https://gimm340server.herokuapp.com/allHistory')
        .then((response) => response.json())
        .then((data) => {
            //document.getElementById("passPhrase").textContent = JSON.stringify(data.phrase);
            console.log(data);
            var table = document.createElement("table"), row, cellA, cellB;
            table.classList.add("table", "table-sm","table-striped");
            document.getElementById("tableDiv").appendChild(table);
            let tableHeader = table.insertRow();
            tableHeader.classList.add("table-dark");
            tableHeader.insertCell().innerHTML = "Application";
            tableHeader.insertCell().innerHTML = "Time"

            for (let key in data) {
                console.log(key);
                // (C2) ROWS & CELLS
                row = table.insertRow();
                cellA = row.insertCell();
                cellB = row.insertCell();
            
                // (C3) KEY & VALUE
                cellA.innerHTML = data[key].name;
                cellB.innerHTML = formatDateTime(data[key].time);
            }

        });
}

function formatDateTime(epochTimeStamp) {
    var d = new Date(epochTimeStamp);
  
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var year = d.getFullYear();
    var month = months[d.getMonth()];
    var date = d.getDate();
    var hour = d.getHours();
    var min = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var sec = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    var time = date + '. ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    var ampm = (hour/12>=1)?"PM":"AM"
    var formatDate = month+" "+ getSuffix(date)+" "+year+", at "+ hour%12+":" + min+" "+ ampm
    return formatDate;
  }
  
  function getSuffix(sent){
    var num =sent.toString();
    if(num[0]==1&&num.length==2){
        return num+"th"
    }
    else if(num.slice(-1)=="1"){
        return num+"st"
    }
    else if(num.slice(-1)=="2"){
        return num+"nd"
    }
    else if(num.slice(-1)=="3"){
        return num+"rd"
    }
    else{return num+"th"}
  }