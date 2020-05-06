import './style.scss';
import { CaptureWebcam } from './ts/capturing';

const cap = new CaptureWebcam();
cap.start();

// ui handling
document.getElementById('btnWebcam').onclick = a => {cap.toggleWebcam();};
document.getElementById('btnPoseNet').onclick = a => {cap.togglePoseDetection();};
