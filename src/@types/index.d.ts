interface CpuInfo {
  time: string;
  user: number;
  nice: number;
  system: number;
  intr: number;
  idle: number;
}

interface MemoryInfo {
  time: string;
  usage: number;
}

interface LoadAverage {
  time: string;
  one: number;
  five: number;
  fifteen: number;
}
