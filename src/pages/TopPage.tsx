import { Grid } from "@mui/material";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import CpuUsageChart from "../components/organizations/cpu-usage-chart/CpuUsageChart";
import MemoryUsageChart from "../components/organizations/memory-usage-chart/MemoryUsageChart";
import CpuUsageTable from "../components/parts/CpuUsageTable";
import useInterval from "../hooks/UseInterval";

export default function TopPage() {
  const interval = 1000;
  const cpuStroke = {
    user: "#ff9b9b",
    system: "#ffff92",
    nice: "#0c0",
    intr: "#a549ff",
    idle: "#53afff",
  };

  const memoryStroke = {
    total: "#ff9b9b",
    free: "#ffff92",
  };

  const [cpuData, setCpuData] = useState([] as CpuInfo[]);
  const [memoryData, setMemoryData] = useState([] as MemoryInfo[]);

  // rust側からcpu使用率を取得する
  const cpuUsageHandler = () => {
    invoke("get_cpu_info").then((cpuInfo) => {
      setCpuData((data) => {
        if (data.length > 30) {
          data.shift();
        }
        return [...data, cpuInfo] as CpuInfo[];
      });
    });
  };

  // rust側からメモリ使用率を取得する
  const memoryUsageHandler = () => {
    invoke("get_memory_info").then((memoryInfo) => {
      setMemoryData((data) => {
        if (data.length > 30) {
          data.shift();
        }
        return [...data, memoryInfo] as MemoryInfo[];
      });
    });
  };

  useInterval({ interval, handler: cpuUsageHandler });
  useInterval({ interval, handler: memoryUsageHandler });

  return (
    <>
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CpuUsageChart
              data={cpuData}
              width={500}
              height={500}
              stroke={cpuStroke}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CpuUsageTable data={cpuData} stroke={cpuStroke} />
          </Grid>
        </Grid>
        <Grid container spacing={12}>
          <Grid item xs={12} textAlign="center">
            <MemoryUsageChart
              data={memoryData}
              width={500}
              height={500}
              stroke={memoryStroke}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
