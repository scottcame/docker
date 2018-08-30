$().ready(function() {

  let request = new Object();
	request.connectionName = "PresidentialElectionResults2016";
	request.query = "select non empty {[Measures].[Trump Votes], [Measures].[Clinton Votes], [Measures].[Total Votes]} on columns, {[State].[State].Members} on rows from USElection2016";
	request.tidy = new Object();
	request.tidy.enabled = true;
	request.tidy.simplifyNames = true;

	$.ajax({
	    "url"        : "/mondrian-rest/query",
	    "dataType"   : "json",
	    "contentType": "application/json",
	    "data"       : JSON.stringify(request),
	    "type"       : "POST",
	    "complete"   : function(response) {
        let spec = {
          "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
          "description": "A simple bar chart with embedded data.",
          "mark": "bar",
          "transform": [{
            "calculate": "if(datum.Candidate === 'Clinton', 1, if(datum.site === 'Trump', 2, 3))",
            "as": "stackOrder"
          }],
          "encoding": {
            "y": {"field": "Votes", "type": "quantitative"},
            "x": {"field": "State", "type": "nominal"},
            "order": {"field": "stackOrder", "type": "quantitative"},
            "color": {
              "field": "Candidate",
              "type": "nominal",
              "scale": {
                "domain": ["Clinton", "Trump", "Other"],
                "range": ["#377eb8", "#e41a1c", "#4daf4a"]
              }
            }
          },
          "height": 400
        };
        let d = new Object();
        d.values = [];
        response.responseJSON.values.forEach(function(o) {
          d.values.push({
            "State": o.State,
            "Candidate": "Trump",
            "Votes": o["Trump Votes"]
          });
          d.values.push({
            "State": o.State,
            "Candidate": "Clinton",
            "Votes": o["Clinton Votes"]
          });
          d.values.push({
            "State": o.State,
            "Candidate": "Other",
            "Votes": o["Total Votes"] - o["Trump Votes"] - o["Clinton Votes"]
          });
        })
        spec.data = d;
        $("#pending-message").hide();
        vegaEmbed("#chart-div", spec, {"actions" : false});
    	}
	});

});
