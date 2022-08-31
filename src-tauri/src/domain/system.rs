use crate::errors::errors::ApplicationError;
use anyhow::Result;
use chrono::{self};
use serde::{Deserialize, Serialize};
use std::thread;
use std::time::Duration;
use systemstat::{platform::windows::PlatformImpl, ByteSize, Platform, System};
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
                })
            })
            .map_err(|e| ApplicationError::Error(e))
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
    usage: f64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct LoadAvarage {
    one: f32,
    five: f32,
    fifteen: f32,
}

#[tauri::command]
pub async fn get_cpu_info() -> Result<Cpu, ApplicationError> {
    let system_info = SystemInfo::new();
    system_info.get_cpu_info()
}

#[tauri::command]
pub async fn get_memory_info() -> Result<Memory, ApplicationError> {
    let system_info = SystemInfo::new();
    system_info.get_memory_info()
}

// #[tauri::command]
// pub async fn get_load_avarage() -> Result<LoadAvarage, Error> {}
