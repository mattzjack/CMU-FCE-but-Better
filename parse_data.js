$(document).ready(function() {
    $("#params").submit(function(event) {
        var id = $("#params").find("input[name=\"id\"]").val(),
            instr = $("#params").find("input[name=\"instr\"]").val().toUpperCase(),
            yrs = $("#params").find("input[name=\"yrs\"]").val(),
            yre = $("#params").find("input[name=\"yre\"]").val(),
            sem = $("#params").find("input[name=\"sem\"]").val();
        var params = {"id": id,
                      "instr": instr,
                      "sem": sem, "yrs": yrs, "yre": yre};


        doData(params);

        event.preventDefault();
    });
}

function doData(params) {
    $.ajax({
        type: 'GET',
        url: './SurveyResults-SchoolComputerScience-allyears.csv',
        dataType: 'text',
        success: function(data) {
            console.log('hi');
            var fce = processData(data);

            // var params = {'id': '15112'};

            var courses = getEntriesLinear(fce, params);
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
        if (yaxis == "Hours Spent Per Week") {
            var colors = function (yval) {return 'rgba(' + Math.floor(51 * yval / 7) + ', ' + Math.floor(51 * yval / 7) + ', ' + Math.floor(51 * yval / 7) + ', 0.2)';}
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


    setLabel(myChart, 'Hours Spent Per Week', 0);
    setLabel(myChart, 'Overall Teaching Rating', 1);
    setLabel(myChart, 'Overall Course Rating', 2);
    var objs = matrixToObjects (courses);

    var hashf = hash (myChart.data.datasets.label);
    for (var i = 0; i < objs.length; i ++) {
        var instrName = ((objs[i].instr).split(" "))[1];
        addData (myChart, objs[i].hrs, hashf(objs[i].hrs), objs[i].id + instrName, 0);
        addData (myChart, objs[i].teach, hashf(objs[i].teach), objs[i].id + instrName, 1);
        addData (myChart, objs[i].course, hashf(objs[i].course), objs[i].id + instrName, 2);
    }




    myChart.update();

        }
    });
});



















