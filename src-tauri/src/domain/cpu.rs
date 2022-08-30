use crate::errors::errors::ApplicationError;
use anyhow::Result;
use chrono::{self};
use serde::{Deserialize, Serialize};
use std::thread;
use std::time::Duration;
use systemstat::{platform::windows::PlatformImpl, Platform, System};
pub struct CpuInfo {
    sys: PlatformImpl,
}

impl CpuInfo {
    pub fn new() -> Self {
        CpuInfo { sys: System::new() }
    }

    pub fn get_cpu_info(self) -> Result<Cpu, ApplicationError> {
        match self.sys.cpu_load_aggregate() {
            Ok(cpu) => {
                thread::sleep(Duration::from_secs(1));
                let cpu = cpu.done().expect("loading cpu info failure.");

                let cpu_info = Cpu {
                    time: chrono::Local::now().format("%H:%M:%S").to_string(),
                    user: cpu.user * 100.0,
                    nice: cpu.nice * 100.0,
                    system: cpu.system * 100.0,
                    intr: cpu.interrupt * 100.0,
                    idle: cpu.idle * 100.0,
                };
                Ok(cpu_info)
            }
            Err(e) => Err(ApplicationError::CpuError(e)),
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
pub struct LoadAvarage {
    one: f32,
    five: f32,
    fifteen: f32,
}

#[tauri::command]
pub async fn get_cpu_info() -> Result<Cpu, ApplicationError> {
    let cpu_info = CpuInfo::new();
    cpu_info.get_cpu_info()
}

// #[tauri::command]
// pub async fn get_load_avarage() -> Result<LoadAvarage, Error> {}
