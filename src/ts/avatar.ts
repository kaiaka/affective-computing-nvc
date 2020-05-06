import {
    Engine,
    Scene,
    ArcRotateCamera,
    HemisphericLight,
    Vector3,
    MeshBuilder,
    Mesh,
    StandardMaterial,
    Color4,
    SceneLoader
} from "babylonjs";

const deg2Rad = Math.PI / 180;
const rad2Deg = 180 / Math.PI;

export class AvatarWindow {
    canvas: any;
    engine: Engine;
    scene: Scene;

    skeleton;
    boneNeck;
    boneLHand;

    currentAnimation;
    aniIdle;
    aniKick;
    aniPunch;

    constructor() {
        this.canvas = document.getElementById("renderCanvas");
        this.engine = new Engine(this.canvas, true);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        this.createScene();
    }

    private createScene() {
        this.scene = new Scene(this.engine);
        this.scene.clearColor = new Color4(1.0, 1.0, 1.0, 1.0);

        let camPos = new Vector3(0, 2, .2);
        let camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, camPos, this.scene);
        camera.attachControl(this.canvas, true);

        let light1: HemisphericLight = new HemisphericLight("light1", new Vector3(.5, .5, 0), this.scene);

        //let ground: Mesh = MeshBuilder.CreateGround("myGround", {width: 6, height: 6, subdivisions: 4}, scene);
        //let matGround = new StandardMaterial("myMaterial", scene);
        //matGround.diffuseColor = new Color4(.8, .8, .1, 1.0);
        //ground.material = matGround;

        // avatar
        var self = this;
        SceneLoader.ImportMesh("", "assets/scenes/", "mannequin.babylon", this.scene, function (newMeshes, particleSystems, skeletons) {
            self.skeleton = skeletons[0];

            let dude = newMeshes[0];
            dude.scaling = new Vector3(0.012, 0.012, 0.012);
            dude.position = new Vector3(0, 0, 0);
            dude.rotation = new Vector3(0, 180 * deg2Rad, 0);
            self.scene.stopAllAnimations();

            // animations
            self.aniIdle = self.skeleton.getAnimationRange("TPose");
            self.aniPunch = self.skeleton.getAnimationRange("SittingTyping");
            self.aniKick = self.skeleton.getAnimationRange("SittingIdle");

            // bones
            const bones = self.skeleton.bones;
            bones.forEach((b, i) => {
                //let m = MeshBuilder.CreateSphere("sphere", {diameter:10}, scene);
                //m.attachToBone(b, dude);
                //console.log(i + ". " + b.name );
            });
            self.boneNeck = bones[4];
            self.boneLHand = bones[10];
        });
    }


    public setHeadRotation(rotX, rotY, rotZ) {
        if (this.boneNeck) {
            let rot = this.boneNeck.getRotation();
            rot.x = rotX ? rotX:rot.x;
            rot.y = rotY ? rotY:rot.y;
            rot.z = rotZ ? rotZ:rot.z;
            this.boneNeck.setRotation(rot);
        }
    }

    public setLeftHandPos(x = null, y = null, z = null) {
        if (this.boneLHand) {
            let p = this.boneLHand.getAbsolutePosition();
            p.x = x ? x:p.x;
            p.y = y ? y:p.y;
            p.z = z ? z:p.z;
            this.boneLHand.setAbsolutePosition(p);
        }
    }

    public animateAvatar(value) {
        if (this.skeleton) {
            if (this.currentAnimation) {
                this.currentAnimation.stop();
            }

            if (value==='idle' && this.aniIdle) {
                this.currentAnimation = this.scene.beginAnimation(this.skeleton, this.aniIdle.from, this.aniIdle.to, true);
                this.currentAnimation.pause();
            } else if (value==='kick' && this.aniKick) {
                this.currentAnimation = this.scene.beginAnimation(this.skeleton, this.aniKick.from, this.aniKick.to, true);
            } else if (value==='punch' && this.aniPunch) {
                this.currentAnimation = this.scene.beginAnimation(this.skeleton, this.aniPunch.from, this.aniPunch.to, true);
            }
        }
    }
}

