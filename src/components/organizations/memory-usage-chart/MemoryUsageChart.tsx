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
  data: MemoryInfo[];
  width: number;
  height: number;
  stroke: {
    total: string;
    free: string;
  };
}

export default function MemoryUsageChart(props: Props) {
  return (
    <div>
      <h2 className={style.title}>メモリ使用率</h2>
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart width={props.width} height={props.height} data={props.data}>
          <Line
            type="natural"
            dataKey="usage"
            stroke={props.stroke.total}
            isAnimationActive={false}
            dot={false}
          />

          <CartesianGrid stroke="#5bbec3" />
          <Legend verticalAlign="top" height={36} />
          <XAxis dataKey="time" stroke="#5bbec3" />
          <YAxis stroke="#5bbec3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
