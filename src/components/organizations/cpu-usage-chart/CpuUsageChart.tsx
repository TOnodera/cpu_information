import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import style from "./style.module.scss";

interface Props {
  data: CpuInfo[];
  width: number;
  height: number;
  stroke: {
    user: string;
    nice: string;
    system: string;
    intr: string;
    idle: string;
  };
}

export default function CpuUsageChart(props: Props) {
  return (
    <div>
      <h2 className={style.title}>Cpu Utilization</h2>
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart width={props.width} height={props.height} data={props.data}>
          <Line
            type="natural"
            dataKey="user"
            stroke={props.stroke.user}
            isAnimationActive={false}
            dot={false}
          />
          <Line
            type="natural"
            dataKey="nice"
            stroke={props.stroke.nice}
            isAnimationActive={false}
            dot={false}
          />

          <Line
            type="natural"
            dataKey="system"
            stroke={props.stroke.system}
            isAnimationActive={false}
            dot={false}
          />
          <Line
            type="natural"
            dataKey="intr"
            stroke={props.stroke.intr}
            isAnimationActive={false}
            dot={false}
          />

          <CartesianGrid className={style.gridStroke} />
          <Legend verticalAlign="bottom" height={36} />
          <XAxis dataKey="time" stroke="#5bbec3" />
          <YAxis stroke="#5bbec3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
