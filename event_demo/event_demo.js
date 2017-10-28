$(function() {
	$("#params").submit(function(event) {
		var id = $("#params").find("input[name=\"id\"]").val(),
		    instr = $("#params").find("input[name=\"instr\"]").val().toUpperCase(),
		    yrs = $("#params").find("input[name=\"yrs\"]").val(),
		    yre = $("#params").find("input[name=\"yre\"]").val(),
		    sem = $("#params").find("input[name=\"sem\"]").val();
		var params = {"id": id,
	                  "instr": instr,
	                  "sem": sem}
		if (yrs == yre) params["yr"] = yrs;
		else {
			params["yrs"] = yrs;
			params["yre"] = yre;
		}

		console.log(params);

		event.preventDefault();
	});
});