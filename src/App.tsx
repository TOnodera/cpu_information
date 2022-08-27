import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

function App() {
  const data = [
    { name: "page A", uv: 1 },
    { name: "page B", uv: 1 },
    { name: "page C", uv: 2 },
    { name: "page D", uv: 1 },
    { name: "page E", uv: 4 },
  ];
  return (
    <div className="container">
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#000" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
}

export default App;
