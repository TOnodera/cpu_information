import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

interface Props {
  data: CpuInfo[];
  stroke: {
    user: string;
    nice: string;
    system: string;
    intr: string;
    idle: string;
  };
}

export default function CpuUsageTable(props: Props) {
  const data: CpuInfo =
    props.data.length > 0
      ? props.data[props.data.length - 1]
      : {
          time: "",
          user: 0,
          nice: 0,
          system: 0,
          intr: 0,
          idle: 0,
        };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={100}>time</TableCell>
            <TableCell>{data.time}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={100}>
              <span style={{ color: props.stroke.user }}>user</span>
            </TableCell>
            <TableCell>
              <span style={{ color: props.stroke.user }}>{data.user}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={100}>
              <span style={{ color: props.stroke.nice }}>nice</span>
            </TableCell>
            <TableCell>
              <span style={{ color: props.stroke.nice }}>{data.nice}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={100}>
              <span style={{ color: props.stroke.system }}>system</span>
            </TableCell>
            <TableCell>
              <span style={{ color: props.stroke.system }}>{data.system}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={100}>
              <span style={{ color: props.stroke.intr }}>intr</span>
            </TableCell>
            <TableCell>
              <span style={{ color: props.stroke.intr }}>{data.intr}</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width={100}>
              <span style={{ color: props.stroke.idle }}>idle</span>
            </TableCell>
            <TableCell>
              <span style={{ color: props.stroke.idle }}>{data.idle}</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
