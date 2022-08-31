import "./style.scss";
import { appWindow } from "@tauri-apps/api/window";

export default function Titlebar() {
  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="titlebar-button" onClick={() => appWindow.minimize()}>
        <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
        />
      </div>
      <div className="titlebar-button" onClick={() => appWindow.maximize()}>
        <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
        />
      </div>
      <div className="titlebar-button" onClick={() => appWindow.close()}>
        <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
      </div>
    </div>
  );
}
