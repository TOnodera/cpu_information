import { useEffect } from "react";

interface Props {
  interval: number;
  handler: () => void;
}

export default function useInterval(props: Props) {
  useEffect(() => {
    const id = setInterval(() => props.handler(), props.interval);
    return () => clearInterval(id);
  }, []);
}
