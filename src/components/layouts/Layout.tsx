import { ReactNode } from "react";
import "./style.scss";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return <div className="container">{props.children}</div>;
}
