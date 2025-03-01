import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Fever", count: 120 },
  { name: "Stomach Pain", count: 85 },
  { name: "Cold", count: 150 },
  { name: "Diarrhea", count: 65 },
  { name: "Headache", count: 90 }
];

const Governmentgraph = () => {
  return (
    <div>
      <h2>Government Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Affected Person Count", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Governmentgraph;
