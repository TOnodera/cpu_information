#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod domain;
mod errors;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            domain::system::get_cpu_info,
            domain::system::get_memory_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
