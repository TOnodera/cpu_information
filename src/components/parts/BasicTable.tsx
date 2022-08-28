import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Props {
  rows: CpuInfo[];
}

export default function BasicTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Nice</TableCell>
            <TableCell align="right">System</TableCell>
            <TableCell align="right">Intr</TableCell>
            <TableCell align="right">Idle</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.time}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.user}</TableCell>
              <TableCell align="right">{row.nice}</TableCell>
              <TableCell align="right">{row.system}</TableCell>
              <TableCell align="right">{row.intr}</TableCell>
              <TableCell align="right">{row.idle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
