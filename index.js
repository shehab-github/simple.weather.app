
$(document).ready(function () {

    let serviceurl = "https://api.openweathermap.org/data/2.5/forecast";
    let apikey = "42bf47f66e0dec11874e403e669ce6ff";
    let city = "giza";
    let units = "metric";

    let query = "q=" + city + "&units=" + units + "&appid=" + apikey;

    let request = serviceurl + "?" + query;

    //7:30 AM 	3:30 PM 	11:30 PM Local Egypt
    //5:30 AM   1:30 PM     9:30 PM UTC
    //6:00 AM   12:00 PM    21:00:00 API available times

    let todaysDate = localStorage.getItem("todaysDate");

    if (!todaysDate || todaysDate != new Date().getDate()) {
        $.ajax({
            url: request,
            success: function (result) {

                localStorage.setItem("todaysDate", new Date().getDate());
                localStorage.setItem("data", JSON.stringify(result));

                fillTableData(result);
            }
        });
    }
    else {
        let data = JSON.parse(localStorage.getItem("data"));
        fillTableData(data);
    }

    function fillTableData(result) {
        let firstTimes = result.list.filter(i => i.dt_txt.indexOf("06:00:00") > -1);

        let secondTimes = result.list.filter(i => i.dt_txt.indexOf("12:00:00") > -1);

        let thirdTimes = result.list.filter(i => i.dt_txt.indexOf("21:00:00") > -1);

        var trsDays = document.getElementsByClassName("tr_day");

        for (var i = 0; i < trsDays.length; i++) {

            var tr = createDataRow(firstTimes[i], secondTimes[i], thirdTimes[i]);
            trsDays[i].innerHTML = tr.innerHTML;
        }
    }

    function createDataRow(firstTime, secondTime, thirdTime) {
        var tr = document.createElement('tr');

        var dateTd = document.createElement('td');
        dateTd.innerHTML = firstTime.dt_txt.split(' ')[0];

        var tempFirstTd = document.createElement('td');
        tempFirstTd.innerHTML = firstTime.main.temp;

        var tempsecondTd = document.createElement('td');
        tempsecondTd.innerHTML = secondTime.main.temp;

        var tempthirdTd = document.createElement('td');
        tempthirdTd.innerHTML = thirdTime.main.temp;

        var humFirstTd = document.createElement('td');
        humFirstTd.innerHTML = firstTime.main.humidity;

        var humSecondTd = document.createElement('td');
        humSecondTd.innerHTML = firstTime.main.humidity;

        var humthirdTd = document.createElement('td');
        humthirdTd.innerHTML = firstTime.main.humidity;

        tr.appendChild(dateTd);
        tr.appendChild(tempFirstTd);
        tr.appendChild(tempsecondTd);
        tr.appendChild(tempthirdTd);
        tr.appendChild(humFirstTd);
        tr.appendChild(humSecondTd);
        tr.appendChild(humthirdTd);

        return tr;
    }

});
