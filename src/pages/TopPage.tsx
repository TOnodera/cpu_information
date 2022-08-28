import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import CpuUsageChart from "../components/organizations/CpuUsageChart";
import BasicTable from "../components/parts/BasicTable";

export default function TopPage() {
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
    <>
      <CpuUsageChart data={data} width={1000} height={400} />
      <BasicTable rows={data.slice().reverse()} />
    </>
  );
}
