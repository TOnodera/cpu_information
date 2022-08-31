import { Grid } from "@mui/material";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import CpuUsageChart from "../components/organizations/cpu-usage-chart/CpuUsageChart";
import LoadAverageChart from "../components/organizations/loadaverage-chart/LoadAverageChart";
import MemoryUsageChart from "../components/organizations/memory-usage-chart/MemoryUsageChart";
import CpuUsageTable from "../components/parts/CpuUsageTable";
import useInterval from "../hooks/UseInterval";

export default function TopPage() {
  const interval = 1000;
  const timeSpan = 30;
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

  const loadAverageStroke = {
    one: "#ff9b9b",
    five: "#ffff92",
    fifteen: "#0c0",
  };

  const [cpuData, setCpuData] = useState([] as CpuInfo[]);
  const [memoryData, setMemoryData] = useState([] as MemoryInfo[]);
  const [loadAverageData, setLoadAverageData] = useState([] as LoadAverage[]);

  // rust側からcpu使用率を取得する
  const cpuUsageHandler = () => {
    invoke("get_cpu_info").then((cpuInfo) => {
      setCpuData((data) => {
        if (data.length > timeSpan) {
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
        if (data.length > timeSpan) {
          data.shift();
        }
        return [...data, memoryInfo] as MemoryInfo[];
      });
    });
  };

  // rust側からロードアベレージを取得する
  const loadAverageHandler = () => {
    invoke("get_load_average")
      .then((loadAverage) => {
        setLoadAverageData((data) => {
          console.log(data, loadAverage);
          if (data.length > timeSpan) {
            data.shift();
          }
          return [...data, loadAverage] as LoadAverage[];
        });
      })
      .catch((e) => console.log(e));
  };

  const handler = () => {
    cpuUsageHandler();
    memoryUsageHandler();
    loadAverageHandler();
  };

  useInterval({ interval, handler });

  return (
    <>
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CpuUsageChart
              data={cpuData}
              width={400}
              height={400}
              stroke={cpuStroke}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MemoryUsageChart
              data={memoryData}
              width={400}
              height={400}
              stroke={memoryStroke}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LoadAverageChart
              data={loadAverageData}
              width={400}
              height={400}
              stroke={loadAverageStroke}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CpuUsageTable data={cpuData} stroke={cpuStroke} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
