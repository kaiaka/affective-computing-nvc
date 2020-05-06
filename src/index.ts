import './style.scss';
import { CaptureWebcam } from './ts/capturing';
import { AvatarWindow} from "./ts/avatar";

const cap = new CaptureWebcam();
cap.start();

const aw = new AvatarWindow();
cap.avatar = aw;




// ui handling
document.querySelector<HTMLElement>('#btnWebcam').onclick = a => {cap.toggleWebcam();};
document.querySelector<HTMLElement>('#btnPoseNet').onclick = a => {cap.togglePoseDetection();};
