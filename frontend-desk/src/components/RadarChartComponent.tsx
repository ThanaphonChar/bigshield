"use client";

import React from "react";
import { Radar, RadarChart, PolarAngleAxis, PolarGrid, Tooltip } from "recharts";

interface RadarChartProps {
    data: any; // JSON data
}

export const RadarChartComponent: React.FC<RadarChartProps> = ({ data }) => {
    const radarData = Object.entries(data.part2).map(([key, value]) => ({
        category: key,
        score: value.score,
        average: value.avg,
    }));

    return (
        <div className="relative" style={{ width: 400, height: 400 }}>
            {/* Heat map circles */}
            <svg
                className="absolute top-0 left-0"
                width="100%"
                height="100%"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="200" cy="200" r="90" fill="rgb(126, 217, 88)" /> {/* Green */}
                <circle cx="200" cy="200" r="67" fill="rgb(255, 222, 89)" /> {/* Yellow */}
                <circle cx="200" cy="200" r="45" fill="rgb(254, 145, 76)" /> {/* Orange */}
                <circle cx="200" cy="200" r="23" fill="rgb(255, 49, 50)" /> {/* Red */}
            </svg>

            {/* Radar Chart */}
            <RadarChart
                cx={200}
                cy={200}
                outerRadius={90}
                width={400}
                height={400}
                data={radarData}
            >
                {/* Polar Grid with bold black lines */}
                <PolarGrid stroke="#000000" strokeWidth={0} gridType="circle" />
                <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: "#000000", fontSize: 12 }} // Black text

                />
                <Tooltip />
                {/* Add custom SVG lines */}
                {radarData.map((entry, index) => {
                    // Calculate line positions from center to data point
                    const angle = (Math.PI / 180) * (index * (360 / radarData.length));
                    const x1 = 200; // Center X
                    const y1 = 200; // Center Y
                    const x2 = 200 + Math.cos(angle) * 90; // Adjust '90' based on the radius
                    const y2 = 200 - Math.sin(angle) * 90; // Adjust '90' based on the radius

                    return (
                        <line
                            key={index}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#505050" // Line color
                            strokeWidth={0.5} // Line thickness
                        />
                    );
                })}
                {/* <Radar
                    name="คะแนนรวม"
                    dataKey="score"
                    stroke="#000000" // Bold black line
                    strokeWidth={2} // Adjust thickness
                    fillOpacity={0} // No fill
                /> */}
                <Radar
                    name="คะแนนเฉลี่ย"
                    dataKey="average"
                    stroke="#000000" // Bold black line
                    strokeWidth={2} // Adjust thickness
                    fillOpacity={0} // No fill
                />
            </RadarChart>
        </div>
    );
};
