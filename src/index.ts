import './style.scss';
import { CaptureWebcam } from './ts/capturing';

const cap = new CaptureWebcam();
cap.start();

// ui handling
document.querySelector<HTMLElement>('#btnWebcam').onclick = a => {cap.toggleWebcam();};
document.querySelector<HTMLElement>('#btnPoseNet').onclick = a => {cap.togglePoseDetection();};
