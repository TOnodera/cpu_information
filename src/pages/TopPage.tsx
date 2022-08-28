import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import CpuUsageChart from "../components/organizations/CpuUsageChart";
import CpuUsageTable from "../components/parts/CpuUsageTable";
import useInterval from "../hooks/UseInterval";

export default function TopPage() {
  const interval = 1000;
  const stroke = {
    user: "#ff9b9b",
    system: "#ffff92",
    nice: "#ccc",
    intr: "#a549ff",
    idle: "#53afff",
  };

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

  useInterval({ interval, handler });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          <h2>Cpu Usage</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <CpuUsageChart data={data} width={500} height={500} stroke={stroke} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CpuUsageTable data={data} stroke={stroke} />
        </Grid>
      </Grid>
    </>
  );
}
