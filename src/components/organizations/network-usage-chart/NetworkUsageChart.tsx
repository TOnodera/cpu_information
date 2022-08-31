import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import style from "./style.module.scss";

interface Props {
  data: MemoryInfo[];
  width: number;
  height: number;
  stroke: {
    total: string;
    free: string;
  };
}

export default function NetworkUsageChart(props: Props) {
  return (
    <div>
      <h2 className={style.title}>ネットワーク使用状況</h2>
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart width={props.width} height={props.height} data={props.data}>
          <Line
            type="natural"
            dataKey="usage"
            stroke={props.stroke.total}
            isAnimationActive={false}
            dot={false}
          />

          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
