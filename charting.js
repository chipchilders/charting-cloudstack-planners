
function restartchart(){
  startDataPoint=0;
  setTimeout(function(){nextData()},renderSpeed);
}

var startDataPoint = 0;
var renderSpeed = 50;

function nextData(){
  redraw(data[startDataPoint]);
  startDataPoint = startDataPoint + 1;
  if (startDataPoint == data.length)
  {
    startDataPoint = 0;
    setTimeout(function(){nextData()},3000);
  } else {
    setTimeout(function(){nextData()},renderSpeed);
  }
}

function redraw(newdata) {

  // Update
  chart.selectAll("rect")
      .data(newdata)
    .transition()
      .duration(10)
      .attr("y", function(d) { return h - y(d.value) - .5; })
      .attr("height", function(d) { return y(d.value); });

}

var w = 10,
	h = 100;

var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, w]);

var y = d3.scale.linear()
    .domain([0, 100])
    .rangeRound([0, h]); //rangeRound is used for antialiasing

var chart;

function renderFirst(){

chart = d3.select("body").append("svg")
    .attr("class", "chart")
    .attr("width", w * data[0].length)
    .attr("height", h);

chart.selectAll("rect")
    .data(data[0])
  .enter().append("rect")
    .attr("x", function(d, i) { return x(i) - .5; })
    .attr("y", function(d) { return h - y(d.value) - .5; })
    .attr("width", w)
    .attr("height", function(d) { return y(d.value); } );

// horizontal line for the x-axis
chart.append("line")
     .attr("x1", 0)
     .attr("x2", w * data[0].length)
     .attr("y1", h - .5)
     .attr("y2", h - .5)
     .style("stroke", "#000");

// horizontal line for the x-axis
chart.append("line")
     .attr("x1", 0)
     .attr("x2", w * data[0].length)
     .attr("y1", 0)
     .attr("y2", 0)
     .style("stroke", "#000");

setTimeout(function(){nextData()},renderSpeed);

}
