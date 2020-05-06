import * as posenet from '@tensorflow-models/posenet';
import {PoseNet} from "@tensorflow-models/posenet";

export class CaptureWebcam {
    net: PoseNet;
    width: number = 480;
    height: number = 360;
    video: any;
    canvas: any;
    ctx: any;
    videoIsPlaying: boolean = false;
    poseDetectionRunning: boolean = false;
    requestId;


    public start(): void {
        console.log("starting webcam");
        this.video = document.getElementById('webcamVideo');
        this.canvas = document.getElementById('videoCanvas');
        this.ctx = this.canvas.getContext("2d");

        // webcam capturing
        const self = this;
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true})
                    .then(function (stream) {
                        self.video.srcObject = stream;
                        self.video.play();
                        self.videoIsPlaying = true;
                    })
                    .catch(function (err0r) {
                        console.log("Error: " + err0r);
                    });
        }

        // load posenet and start capturing
        posenet.load({
            architecture: "MobileNetV1",
            outputStride: 16,
            inputResolution: 500
            /*posenet.load({
                architecture: "ResNet50",
                outputStride: 32,
                inputResolution: 250*/
        }).then(net => {
            console.log('posenet loaded');
            this.net = net;
            this.poseDetectionRunning = true;
            this.poseLoop();
        });
    }

    public poseLoop() {
        if(!!this.net && this.poseDetectionRunning) {
            this.net.estimateSinglePose(this.video, {flipHorizontal: false})
                    .then(pose => {
                        //console.log(pose);

                        // draw
                        this.drawPose(pose);

                        // request a new frame
                        this.requestId = requestAnimationFrame(() => this.poseLoop());
                    });
        }else {
            this.drawPose(null);
        }
    }

    public togglePoseDetection() {
        if(this.poseDetectionRunning){
            this.stopPoseDetection();
        }else {
            this.startPoseDetection();
        }
    }

    public startPoseDetection() {
        this.poseDetectionRunning = true;
        this.poseLoop();
    }

    public stopPoseDetection() {
        this.poseDetectionRunning = false;
        this.drawPose(null);
    }

    private drawPose(pose) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        if(!!pose) {
            this.ctx.fillStyle = 'rgba(0, 155, .5, 0.5)';
            this.ctx.fillRect(0, 0, this.width, this.height);

            // avatar
            this.ctx.fillStyle = '#ffffff';
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.setLineDash([4, 4]);

            // draw each keypoint
            for (const k of pose.keypoints) {
                if (k.score > .5) {
                    this.ctx.beginPath();
                    this.ctx.arc(k.position.x, k.position.y, 3, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }

            // draw joints (link two points, 5,6=shoulders 7,8=elbows 9,10=wrists)
            const joints = [[5,6], [5,7], [6,8], [7,9], [8,10]];
            for (let j of joints){
                const a = pose.keypoints[j[0]];
                const b = pose.keypoints[j[1]];
                if(a.score > .5 && b.score > .5){
                    this.ctx.beginPath();
                    this.ctx.moveTo(a.position.x, a.position.y);
                    this.ctx.lineTo(b.position.x, b.position.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    public toggleWebcam() {
        this.videoIsPlaying = !this.videoIsPlaying;

        // (un)pause video
        if(!this.videoIsPlaying) {
            this.video.pause();
        }else {
            this.video.play();
        }
    }
}
