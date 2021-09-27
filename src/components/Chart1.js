import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

export default function Chart1({ data }) {
    const svgRef = useRef();

    console.log(data);
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const barGroupWidth = 5;
        const scaleFactor = 100;

        const USD = data.map(object => object.USDvrednost);
        const USDmin = d3.min(USD);
        const USDmax = d3.max(USD);
        const USDdomain = [USDmin, USDmax];

        const GBP = data.map(object => object.GBPvrednost);
        const GBPmin = d3.min(GBP);
        const GBPmax = d3.max(GBP);
        const GBPdomain = [GBPmin, GBPmax];


        svg.attr("width", barGroupWidth * data.length)
            .attr("height", "400");

        const barGroup = svg.selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", (d, i) => {
                return `translate(${i * barGroupWidth}, 400)`
            })
            .attr("id", "barGroup")
            .attr("width", barGroupWidth);

        barGroup.append("g")
            .attr("id", "USD")
            .append("rect")
            .attr("fill", "red")
            .attr("width", "2")
            .attr("height", (d) => d.USDvrednost * scaleFactor);

        barGroup.append("g")
            .attr("id", "GBP")
            .append("rect")
            .attr("fill", "green")
            .attr("width", "2")
            .attr("height", (d) => d.GBPvrednost * scaleFactor);

    });



    return (
        <div id="chart1">
            <svg ref={svgRef}>
                {/* 
             <g>
                <g id="USD">
                    <rect></rect>
                    <text></text>
                </g>
                <g id="GBP">
                    <rect></rect>
                    <text></text>
                </g>
             </g>
             */}
            </svg>
        </div>
    )
}
