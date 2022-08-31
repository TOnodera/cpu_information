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
  data: LoadAverage[];
  width: number;
  height: number;
  stroke: {
    one: string;
    five: string;
    fifteen: string;
  };
}

export default function LoadAverageChart(props: Props) {
  return (
    <div>
      <h2 className={style.title}>LoadAverage</h2>
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart width={props.width} height={props.height} data={props.data}>
          <Line
            type="natural"
            dataKey="one"
            stroke={props.stroke.one}
            isAnimationActive={false}
            dot={false}
          />
          <Line
            type="natural"
            dataKey="five"
            stroke={props.stroke.five}
            isAnimationActive={false}
            dot={false}
          />
          <Line
            type="natural"
            dataKey="fifteen"
            stroke={props.stroke.fifteen}
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
