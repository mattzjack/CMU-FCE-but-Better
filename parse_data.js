$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: './SurveyResults-SchoolComputerScience-allyears.csv',
        dataType: 'text',
        success: function(data) {
            console.log('hi');
            var fce = processData(data);

            var params = {'id': '15112'};

            var courses = getEntries(fce, params);
                var ctx = "myChart";
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: 'rgba(0, 0, 0, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            tooltips: {
                mode: 'nearest',
                position: 'nearest'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    function setLabel (chart, yaxis, setnum) {
        chart.data.datasets[setnum].label = yaxis;
    }

    function hash (yaxis) {
        if (yaxis == "Response rate") {
            var colors = function (yval) {return 'rgba(' + (51 * yval / 20) + ', ' + (51 * yval / 20) + ', ' + (51 * yval / 20) + ', 0.2)';}
        }
        else {
            var colors = function (yval) {return 'rgba(' + Math.floor(51.0 * (5 - yval)) + ', ' + Math.floor(51.0 * (yval)) + ', ' + Math.floor(51.0 * (5 - 0.3 * yval)) + ', 0.2)';}
        }
        return colors;
    }

    function addData (chart, yval, hashyval, xval, setnum) {
        if (setnum == 0) {chart.data.labels.push(xval);}
        chart.data.datasets[setnum].data.push(yval);
        chart.data.datasets[setnum].backgroundColor.push(hashyval);
    }

    function matrixToObjects (matrix) {
        var objs = [];
        for (var i = 0; i < matrix.length; i++) {
            objs.push({sem: matrix[i][0], yr: matrix[i][1], instr: matrix[i][2], dept: matrix[i][3], id: matrix[i][4], name: matrix[i][5], sec: matrix[i][6], nores: matrix[i][7], enr: matrix[i][8], resrate: matrix[i][9], hrs: matrix[i][10], stulear: matrix[i][11], expla: matrix[i][12], objec: matrix[i][13], feedback: matrix[i][14], impor: matrix[i][15], subjmat: matrix[i][16], respect: matrix[i][17], teach: matrix[i][18], course: matrix[i][19]});
        }
        return objs;
    }


    setLabel(myChart, 'Overall course rating', 0);
    var objs = matrixToObjects (courses);

    var hashf = hash (myChart.data.datasets.label);
    for (var i = 0; i < objs.length; i ++) {
        var hashyval = hashf(objs[i].course);
        addData (myChart, objs[i].course, hashyval, objs[i].id + objs.instr, 0);
    }




    myChart.update();







    function tableCreate(data){
    var row = data.length;
    var col = data[0].length;
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';
    var firstrow = ["Semester", "Year", "Instructor", "Department", "Course ID", "Course Name", "Section",
    "# responses", "Enroll", "Response Rate", "Hours Spent/wk", "Learning", "Explanation", "Objective", "Feedback",
    "Importance", "Matter", "Respect", "Overall Teaching", "Overall Course"];
    var tfr = tbl.insertRow();
    for (var i = 0; i < firstrow.length; i ++) {
        var td = tfr.insertCell();
        td.appendChild(document.createTextNode(firstrow[i]));
        td.style.border = '1px solid black';
    }

    for(var i = 0; i < row; i++){
        var tr = tbl.insertRow();
        
        for(var j = 0; j < col; j++){
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(data[i][j]));
            td.style.border = '1px solid black';
            if(i%2 == 1){
                td.style.background = '#f2f2f2';
            }

        }
    }
    body.appendChild(tbl);
}

tableCreate(courses);

        }
    });
});



















