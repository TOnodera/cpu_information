import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

interface Props {
  data: CpuInfo[];
  width: number;
  height: number;
}

export default function CpuUsageChart(props: Props) {
  return (
    <LineChart width={props.width} height={props.height} data={props.data}>
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
      <YAxis />
    </LineChart>
  );
}
