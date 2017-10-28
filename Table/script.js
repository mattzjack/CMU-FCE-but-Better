function tableCreate(data){
	var row = data.length;
    var col = data[0].length;
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';

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

tableCreate([['shit', 'fuck'],['cao', 'ni'],['ma','bi']]);