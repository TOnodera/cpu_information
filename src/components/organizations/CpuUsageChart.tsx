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
        stroke="#ff9b9b"
        isAnimationActive={false}
        dot={false}
      />
      <Line
        type="natural"
        dataKey="system"
        stroke="#ffff92"
        isAnimationActive={false}
        dot={false}
      />
      <Line
        type="natural"
        dataKey="intr"
        stroke="#a549ff"
        isAnimationActive={false}
        dot={false}
      />
      <Line
        type="natural"
        dataKey="idle"
        stroke="#53afff"
        isAnimationActive={false}
        dot={false}
      />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="time" stroke="#ccc" />
      <YAxis stroke="#ccc" />
    </LineChart>
  );
}
