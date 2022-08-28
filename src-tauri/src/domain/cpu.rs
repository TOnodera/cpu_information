use chrono::{self, format};
use serde::{Deserialize, Serialize};
use std::thread;
use std::time::Duration;
use systemstat::{saturating_sub_bytes, Platform, System};

#[derive(Serialize, Deserialize, Debug)]
pub struct Cpu {
    time: String,
    user: f32,
    nice: f32,
    system: f32,
    intr: f32,
    idle: f32,
}

#[tauri::command]
pub async fn get_cpu_info() -> Result<Cpu, String> {
    let sys = System::new();

    match sys.cpu_load_aggregate() {
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
        Err(x) => Err(format!("\nCPU load: error: {}", x)),
    }
}
