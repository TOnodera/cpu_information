use crate::errors::errors::ApplicationError;
use anyhow::Result;
use chrono::{self};
use serde::{Deserialize, Serialize};
use std::thread;
use std::time::Duration;
use systemstat::{platform::windows::PlatformImpl, Platform, System};
pub struct SystemInfo {
    sys: PlatformImpl,
}

impl SystemInfo {
    pub fn new() -> Self {
        Self { sys: System::new() }
    }

    pub fn get_cpu_info(self) -> Result<Cpu, ApplicationError> {
        self.sys
            .cpu_load_aggregate()
            .and_then(|cpu_load| {
                thread::sleep(Duration::from_secs(1));
                let cpu = cpu_load.done()?;
                Ok(Cpu {
                    time: chrono::Local::now().format("%H:%M:%S").to_string(),
                    user: cpu.user * 100.0,
                    nice: cpu.nice * 100.0,
                    system: cpu.system * 100.0,
                    intr: cpu.interrupt * 100.0,
                    idle: cpu.idle * 100.0,
                })
            })
            .map_err(|e| ApplicationError::Error(e))
    }

    pub fn get_memory_info(self) -> Result<Memory, ApplicationError> {
        self.sys
            .memory()
            .and_then(|m| {
                Ok(Memory {
                    usage: (m.total.as_u64() as f64 - m.free.as_u64() as f64)
                        / m.total.as_u64() as f64
                        * 100.0,
                    time: chrono::Local::now().format("%H:%M:%S").to_string(),
                })
            })
            .map_err(|e| ApplicationError::Error(e))
    }

    pub fn get_load_average(self) -> Result<LoadAverage, ApplicationError> {
        self.sys
            .load_average()
            .and_then(|avg| {
                println!("{:?}", avg);
                Ok(LoadAverage {
                    time: chrono::Local::now().format("%H:%M:%S").to_string(),
                    one: avg.one,
                    five: avg.five,
                    fifteen: avg.fifteen,
                })
            })
            .map_err(|e| ApplicationError::Error(e))
    }

    pub fn get_network_info(self) -> Result<Vec<NetworkInfo>, ApplicationError> {
        match self.sys.networks() {
            Ok(netifs) => {
                let mut results: Vec<NetworkInfo> = vec![];
                for netif in netifs.values() {
                    let stats = self.sys.network_stats(&netif.name)?;
                    results.push(NetworkInfo {
                        name: netif.name.clone(),
                        rx_bytes: stats.rx_bytes.to_string(),
                        tx_bytes: stats.tx_bytes.to_string(),
                        rx_packets: stats.rx_packets,
                        tx_packets: stats.tx_packets,
                        rx_error: stats.rx_errors,
                        tx_error: stats.tx_errors,
                    });
                }
                Ok(results)
            }
            Err(e) => Err(ApplicationError::Error(e)),
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Cpu {
    time: String,
    user: f32,
    nice: f32,
    system: f32,
    intr: f32,
    idle: f32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Memory {
    time: String,
    usage: f64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LoadAverage {
    time: String,
    one: f32,
    five: f32,
    fifteen: f32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NetworkInfo {
    name: String,
    rx_bytes: String,
    tx_bytes: String,
    rx_packets: u64,
    tx_packets: u64,
    rx_error: u64,
    tx_error: u64,
}

#[tauri::command]
pub async fn get_cpu_info() -> Result<Cpu, ApplicationError> {
    let system_info = SystemInfo::new();
    system_info.get_cpu_info()
}

#[tauri::command]
pub fn get_memory_info() -> Result<Memory, ApplicationError> {
    let system_info = SystemInfo::new();
    system_info.get_memory_info()
}

#[tauri::command]
pub fn get_load_average() -> Result<LoadAverage, ApplicationError> {
    let system_info = SystemInfo::new();
    system_info.get_load_average()
}

#[tauri::command]
pub fn get_network_info() -> Result<Vec<NetworkInfo>, ApplicationError> {
    let system_info = SystemInfo::new();
    system_info.get_network_info()
}
