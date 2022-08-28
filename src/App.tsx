import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import BasicTable from "./components/parts/BasicTable";

function App() {
  const [data, setData] = useState([] as CpuInfo[]);
  const handler = () => {
    invoke("get_cpu_info").then((cpuInfo) => {
      setData((data) => {
        if (data.length > 30) {
          data.shift();
        }
        return [...data, cpuInfo] as CpuInfo[];
      });
    });
  };
  useEffect(() => {
    const id = setInterval(() => {
      handler();
    }, 1000);

    return () => clearInterval(id);
  }, []);
  return (
    <div className="container">
      <LineChart width={1000} height={400} data={data}>
        <Line
          type="natural"
          dataKey="user"
          stroke="#000"
          isAnimationActive={false}
        />
        <Line
          type="natural"
          dataKey="system"
          stroke="#0ff"
          isAnimationActive={false}
        />
        <Line
          type="natural"
          dataKey="intr"
          stroke="#0f0"
          isAnimationActive={false}
        />
        <Line
          type="natural"
          dataKey="idle"
          stroke="#00f"
          isAnimationActive={false}
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis max={100} />
      </LineChart>
      <BasicTable rows={data.slice().reverse()} />
    </div>
  );
}

export default App;
