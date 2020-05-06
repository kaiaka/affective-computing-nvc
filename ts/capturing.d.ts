import { PoseNet } from "@tensorflow-models/posenet";
export declare class CaptureWebcam {
    net: PoseNet;
    width: number;
    height: number;
    video: any;
    canvas: any;
    ctx: any;
    videoIsPlaying: boolean;
    poseDetectionRunning: boolean;
    requestId: any;
    start(): void;
    private initPoseNet;
    poseLoop(): void;
    togglePoseDetection(): void;
    startPoseDetection(): void;
    stopPoseDetection(): void;
    private drawPose;
    toggleWebcam(): void;
}
