import * as d3 from "d3";
import React, { useState, useEffect, useRef } from "react";

function Chart() {
  // const ref = React.createRef();
    const ref = useRef();

  const [fill, setFill] = useState("red");
  const [zoomState, setZoomState] = useState();


  const width = 500;
  const height = 400;
  const margin = { top: 50, right: 50, bottom: 50, left: 100 };
  const innerHeight = height - margin.top - margin.bottom;

  const data = [
    [-100, 100],
    [-100, 200],
    [-100, 300],
    [-100, 400]
  ];

  useEffect(() => draw(),[fill, zoomState]);

  function draw() {


      let yScale = d3.scaleLinear().domain([100, 400]).range([innerHeight, 0]);

      if(zoomState){
          const newYscale = zoomState.rescaleY(yScale);
          yScale.domain(newYscale.domain());
      }


          let yAxis = d3.axisLeft(yScale);

          d3.select(ref.current).selectAll("svg").remove();

          const zoomer = d3.zoom().on("zoom", zoom);

          function zoom(event) {
                // console.log(event);
                const zoomState = event.transform;
                setZoomState(zoomState);
          }

          const svg = d3
              .select(ref.current)
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .call(zoomer);

          svg
              .append("text")
              .attr("transform", "translate(200,20)")
              .text("toggle fill")
              .on("click", toggleFill);

          function toggleFill() {
              if (fill === "red") {
                  setFill("blue");
              } else {
                  setFill("red");
              }
          }

          svg
              .append("g")
              .attr("id", "circles")
              .attr("transform", "translate(200, 0)")
              .selectAll("circle")
              .data(data)
              .enter()
              .append("circle")
              .style("fill", fill)
              .attr("r", 4)
              .attr("cx", function (d) {
                  return d[0];
              })
              .attr("cy", function (d) {
                  return yScale(d[1]);
              });

          svg
              .append("g")
              .attr("id", "y_axis")
              .attr("transform", "translate(75,0)")
              .call(yAxis);


      }

  return (
    <div
      style={{ margin: 50, position: "relative" }}
      className="OptionsDataChart"
      ref={ref}
    />
  );
}

export default Chart;