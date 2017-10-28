// Semester, Year, Instructor, Dept, Course ID, Course Name, Section, Responses,
// Enrollment, Resp. Rate %,
// 1: Hrs Per Week, 2: Interest in student learning,
// 3: Clearly explain course requirements, 4: Clear learning objectives & goals,
// 5: Instructor provides feedback to students to improve,
// 6: Demonstrate importance of subject matter,
// 7: Explains subject matter of course, 8: Show respect for all students,
// 9: Overall teaching rate, 10: Overall course rate


var data = [['Summer', '2016', 'sb', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
             '0', '0', '0', '3',],
             ['Summer', '2015', 'sb', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
             '0', '0', '0', '4',],
             ['Spring', '2016', 'sb', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
             '0', '0', '0', '3.2',]]

function find_season(x) {
	if (x == 'Spring') {
		return 0;
	} 
	else if (x == 'Summer') {
		return 1;
	} else {
		return 2;
	}
	
}

function find_min(L) {
	var index = 0;
	var curr_min = L[0]; 
	var min = L[0];
	for (var i = 1; i < L.length; i++) {
		if (Number(L[i][1]) < Number(curr_min[1])){
			curr_min = L[i];
			index = i;
		}
		//if year is the same, compare spring 0, summer 1, fall 2;
		else if (Number(L[i][1]) == Number(curr_min[1])) {
			var season1 = find_season(L[i][0]);
			var season2 = find_season(curr_min[0]);
			//spring < summer < fall
			if (season1 < season2) {
				curr_min = L[i];
				index = i;
			} 
		}
	}
	return index;
}

function remove_el(index, L) {
	var result = [];
	for (var i = 0; i < index; i++) {
		result[i] = L[i];
	}
	for (var i = index; i < L.length-1; i++){
		result.push(L[i+1]);
	}
	return result;
}

function sort(L) {
	if (L.length < 2) {
		return L;
	}
	else {
		var i = find_min(L);
		return [L[i]].concat(sort(remove_el(i, L)));
	}
}


var data = sort(data);
console.log(data);

function find_years(L) {
	var result = [];
	for (var i = 0; i < L.length; i++){
		result.push(L[i][0]+L[i][1]);
	}
	return result;
}

function find_ratings(L) {
	var result = [];
	for (var i = 0; i < L.length; i++){
		result.push(parseFloat(L[i][19]));
	}
	return result;
}

var years = find_years(data);
var ratings = find_ratings(data);

console.log(years);
console.log(ratings);


var Prof = data[0][2];

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: years,
    datasets: [
      { 
        data: ratings
      }
    ]
  }
});