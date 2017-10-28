$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: './SurveyResults-SchoolComputerScience-allyears.csv',
        dataType: 'text',
        success: function(data) {
            console.log('hi');
            var fce = processData(data);
            var params = {'id': '15112'};

            console.log(getEntries(fce, params));
        }
    });
});