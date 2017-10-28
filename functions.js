// INTERFACE

function getEntries(fce, params) {
    // returns a list of entry objects with attributes
    // if (filtersHasIDp(params)) {
    //     return getEntriesBinary(fce, params);
    // }
    return getEntriesLinear(fce, params);
}




















// IMPLEMENTATION

// Semester, Year, Instructor, Dept, Course ID, Course Name, Section, Responses,
// Enrollment, Resp. Rate %,
// 1: Hrs Per Week, 2: Interest in student learning,
// 3: Clearly explain course requirements, 4: Clear learning objectives & goals,
// 5: Instructor provides feedback to students to improve,
// 6: Demonstrate importance of subject matter,
// 7: Explains subject matter of course, 8: Show respect for all students,
// 9: Overall teaching rate, 10: Overall course rate

// filters = 0b1111111111
// qFilters = 0b1111111111

function getIDNum(entry) {
    return Number(entry[4]);
}

function getEntriesLinear(fce, params) {
    var result = [];
    for (i = 0; i < fce.length; i++) {
        if (getIDNum(fce[i]) == Number(params['id'])) {
            result.push(fce[i]);
        }
    }
    return result;
}

function getEntriesBinary(fce, params) {
    var result = [], loc = binarySearch(fce, Number(params['id']), compareNum, get);
    if (loc == -1) return result;
    result.push(fce[loc]);
    var i = 1, done = false;
    while (!done) {
        done = true;
        if (getIDNum(fce[loc - i]) == Number(params['id'])) {
            done = false;
            result.push(fce[loc - i])
        }
        if (getIDNum(fce[loc + i]) == Number(params['id'])) {
            done = false;
            result.push(fce[loc - i])
        }
    }
    return result;
}

function compareNum(x, y) {
    if (x > y) return 1;
    if (x < y) return -1;
    return 0;
}

function binarySearch(arr, x, compare, get) {
    var start = 0, end = arr.length, mid, compResult;
    while (end - start > 1) {
        mid = start + Math.floor((end - start) / 2);
        compResult = compare(get(arr, mid), x)
        if (compResult == -1) {
            start = mid + 1;
        } else if (compResult == 1) {
            end = mid;
        } else {
            return mid;
        }
    }
    if (compare(get(arr, start), x) == 0) {
        return start;
    }
    return -1;
}

function filtersHasIDp(params) {
    return params['id'] != '';
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    return lines
}

function compareID(l0, l1) {
    x = Number(l0[4]);
    y = Number(l1[4]);
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}

function get(arr, i) {
    return arr[i];
}

function set(arr, i, x) {
    arr[i] = x;
}

function swap(arr, i, j, get, set) {
    var tmp = get(arr, i);
    set(arr, i, get(arr, j));
    set(arr, j, tmp);
}

function partition(arr, start, end, compare, get, set, swap) {
    var pivot = start + 1;
    var pivotVal = get(arr, start);
    for (i = start + 1; i < end; i++) {
        if (compare(get(arr, i), pivotVal) == -1) {
            // get(arr, i) < pivotVal
            swap(arr, i, pivot, get, set);
            pivot++;
        }
    }
    pivot--;
    swap(arr, start, pivot, get, set);
    return pivot;
}

function quicksort(arr, start, end, compare, get, set, swap) {
    if (end - start < 2) return;
    var pivot = partition(arr, start, end, compare, get, set, swap);
    quicksort(arr, start, pivot, compare, get, set, swap);
    quicksort(arr, pivot + 1, end, compare, get, set, swap);
}