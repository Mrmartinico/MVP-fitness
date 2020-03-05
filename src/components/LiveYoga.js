import React, { Component } from "react";
import "../App.scss";

import WebcamSetup from "../framework/webcam";
import Model from "../framework/model.js";
import * as bodyPix from "@tensorflow-models/body-pix";
import * as tf from "@tensorflow/tfjs";

// import lVedio from '../vedio/yoga_1.mp4' //  change your vedio here
// imports for the instruct pose images
import downDog from "../assests/poses/downDog.jpg";
import bridge from "../assests/poses/bridge.jpg";
import squat from "../assests/poses/squat.png";
import trikonasanaLeft from "../assests/poses/trikonasanaLeft.png";
import trikonasanaRight from "../assests/poses/trikonasanaRight.png";
import vasisthasanaLeft from "../assests/poses/vasisthasanaLeft.jpg";
import vasisthasanaRight from "../assests/poses/vasisthasanaRight.jpg";
import vriksasana from "../assests/poses/vriksasana.jpg";
import warriorII from "../assests/poses/warriorII.jpg";

const CLASS_2_INDEX = {
  bridge: 0,
  down_dog: 1,
  no_pose: 2,
  squat: 3,
  trikonasana_left: 4,
  trikonasana_right: 4,
  vasisthasana_left: 5,
  vasisthasana_right: 5,
  vriksasana: 6,
  warrior_ii: 7
};

const DEFAULT_ROUTINE = [
  { ml_model_pose_name: "squat", id: CLASS_2_INDEX.squat, time: 30 },
  {
    ml_model_pose_name: "warrior_ii",
    id: CLASS_2_INDEX.warrior_ii,
    time: 30
  },
  {
    ml_model_pose_name: "trikonasana_left",
    id: CLASS_2_INDEX.trikonasana_left,
    time: 30
  },
  {
    ml_model_pose_name: "trikonasana_right",
    id: CLASS_2_INDEX.trikonasana_right,
    time: 30
  },
  {
    ml_model_pose_name: "vriksasana",
    id: CLASS_2_INDEX.vriksasana,
    time: 30
  },
  {
    ml_model_pose_name: "vasisthasana_left",
    id: CLASS_2_INDEX.vasisthasana_left,
    time: 30
  },
  {
    ml_model_pose_name: "vasisthasana_right",
    id: CLASS_2_INDEX.vasisthasana_right,
    time: 30
  }
];

class LiveYoga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      scoreboard: "0 %",
      instructorPose: null,
      targetPose: "",
      elapsedTime: 0,
      holdTime: 0
    };

    this.class2index = CLASS_2_INDEX;

    // It's possible to pass a routine when rendering the component
    // check out the DEFAULT_ROUTINE to understand the data structure
    // and the possible pose names
    if (this.props.routine) {
      this.routine = this.props.routine;
    } else {
      this.routine = DEFAULT_ROUTINE;
    }

    // TODO: Should be migrate to a state
    // It keeps track of the current position in the
    // routine array.
    this.currentPose = 0;

    // Visual feedback configuration
    this.redMask = { r: 255, g: 0, b: 0, a: 130 };
    this.greenMask = { r: 0, g: 255, b: 0, a: 130 };
    this.backgroundMask = { r: 0, g: 0, b: 0, a: 0 };
    this.opacity = 0.45;
  }

  static userInfo = "";
  static defaultProps = {
    loadingText: "Loading...please be patient..."
  };

  async componentDidMount() {
    // entry point of app

    // Loading ML models
    this.model = new Model();
    this.bodyPixNet = await this.model.loadBodyPix("mobile");
    this.poseClassifier = await this.model.loadPoseClassifier();

    // actual video res captured, not the canvas resolution
    // smaller -> faster
    // bigger -> more accurate
    this.videoWidth = 640;
    this.videoHeight = 720;

    // bootstrap webcam
    try {
      this.video = await this.loadVideo();
    } catch (e) {
      console.log(e);
      throw e;
    }
    console.log("Video loaded");

    // where we are writing the user frames
    this.canvas = document.getElementById("output");

    // TODO: update it with a state
    this.scoreboard = document.getElementById("scoreboard");

    // set correct canvas dims
    this.canvas.width = this.videoWidth;
    this.canvas.height = this.videoHeight;

    // Start the routine
    await this.startUserRoutine();
    this.changePose(this.routine[this.currentPose]);
  }

  getTimeDiff() {
    let endTime = new Date();
    let timeDiff = endTime - this.prevTime; //in ms

    // strip the ms
    timeDiff /= 1000;

    return timeDiff;
  }

  // given a pose, changes the current enviroment to detect it.
  // Changes the target pose for the ml model and changes
  // the instructor image.
  changePose(pose) {
    if (pose.ml_model_pose_name === "down_dog") {
      this.setState({
        instructorPose: downDog,
        targetPose: "down_dog"
      });
    } else if (pose.ml_model_pose_name === "bridge") {
      this.setState({
        instructorPose: bridge,
        targetPose: "bridge"
      });
    } else if (pose.ml_model_pose_name === "squat") {
      this.setState({
        instructorPose: squat,
        targetPose: "squat"
      });
    } else if (pose.ml_model_pose_name === "trikonasana_left") {
      this.setState({
        instructorPose: trikonasanaLeft,
        targetPose: "trikonasana_left"
      });
    } else if (pose.ml_model_pose_name === "trikonasana_right") {
      this.setState({
        instructorPose: trikonasanaRight,
        targetPose: "trikonasana_right"
      });
    } else if (pose.ml_model_pose_name === "vasisthasana_left") {
      this.setState({
        instructorPose: vasisthasanaLeft,
        targetPose: "vasisthasana_left"
      });
    } else if (pose.ml_model_pose_name === "vasisthasana_right") {
      this.setState({
        instructorPose: vasisthasanaRight,
        targetPose: "vasisthasana_right"
      });
    } else if (pose.ml_model_pose_name === "vriksasana") {
      this.setState({
        instructorPose: vriksasana,
        targetPose: "vriksasana"
      });
    } else if (pose.ml_model_pose_name === "warrior_ii") {
      this.setState({
        instructorPose: warriorII,
        targetPose: "warrior_ii"
      });
    }

    this.setState({
      elapsedTime: 0,
      holdTime: pose.time
    });
  }

  async loadVideo() {
    // get the loader object
    let loader = new WebcamSetup(
      document.getElementById("vid"),
      this.videoWidth,
      this.videoHeight
    );
    // load the webcam video
    const video = await loader.setupCamera();
    // play it
    video.play();

    return video;
  }

  updateScoreboard(score) {
    let scoreboard = "";
    if (score > 0.25 && score < 0.375) {
      scoreboard = "25 %";
    } else if (score > 0.375 && score < 0.725) {
      scoreboard = "25 %";
    } else if (score > 0.725 && score < 0.85) {
      scoreboard = "25 %";
    } else if (score > 0.85) {
      scoreboard = "100 %";
    } else {
      scoreboard = "0 %";
    }

    this.setState({ scoreboard });
  }

  // Preprocessing step before feeding the image into the ml
  // model
  preprocess(img) {
    //convert the image data to a tensor
    let tensor = tf.browser.fromPixels(img);
    //resize to 128 X 128
    const resized = tf.image.resizeBilinear(tensor, [128, 128]).toFloat();
    // Normalize the image
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape
    const batched = normalized.expandDims(0);
    return batched;
  }

  // Inference with our classifier
  async scoreCurrentPose() {
    // TODO: Make it human readable
    // predict if the pose is correct
    return await this.poseClassifier
      .predict(this.preprocess(this.video))
      .dataSync()[this.class2index[this.state.targetPose]];
  }

  // Extract the mask of the user from the frame for the visual feedback
  async segmentPerson() {
    return await this.bodyPixNet.segmentPerson(this.video, {
      flipHorizontal: true,
      internalResolution: "medium",
      segmentationThreshold: 0.7
    });
  }

  // TODO: fire a real event
  async fireSessionStartedEvent(params) {
    console.log("SessionStartedEvent", params);
  }

  // TODO: fire a real event
  async firePoseCompletedEvent(params) {
    console.log("PoseCompletedEvent", params);
  }

  // TODO: fire a real event
  async fireRoutineCompletedEvent(params) {
    console.log("RoutineCompletedEvent", params);
    alert("RoutineCompletedEvent " + params.averageAccuracy + " %");
  }

  /**
   * Feeds an image to wootland - this is where the magic
   * happens. This function loops with a requestAnimationFrame method.
   */
  async startUserRoutine() {
    this.prevTime = new Date();
    let personSegmentation;
    let score;
    let mask;
    let counter = 0;
    let poseAverage = 0;
    let sessionAverage = 0;

    // TODO: Fire real event, add params
    await this.fireSessionStartedEvent({});

    this.changePose(this.routine[this.currentPose]);

    // function that loops over the frames
    this.processFrame = async () => {
      // segment the body, extract mask
      personSegmentation = await this.segmentPerson();

      // use the classifier to score the pose
      score = await this.scoreCurrentPose();

      // scoreboard updater
      this.updateScoreboard(score);

      // keep track of the user score
      poseAverage += score;
      sessionAverage += score;

      // Convert the personSegmentation into a mask to darken the background.
      if (score > 0.5) {
        // correct pose, green
        mask = bodyPix.toMask(
          personSegmentation,
          this.greenMask,
          this.backgroundMask
        );

        // correct pose, hence we start counting
        this.setState({
          elapsedTime: this.state.elapsedTime + this.getTimeDiff()
        });

        // Check it reached the target hold time
        if (this.state.elapsedTime >= this.routine[this.currentPose].time) {
          // pose completed, we either need to go to the next pose
          // or we finished the routine

          // calculate the average
          poseAverage /= counter;

          // TODO: Fire real event
          await this.firePoseCompletedEvent({
            averageAccuracy: poseAverage * 100,
            poseId: this.routine[this.currentPose].id
          });
          poseAverage = 0; // init

          // move to the next pose
          this.currentPose += 1;

          // check if what to do with this pose
          if (this.currentPose < this.routine.length) {
            // we havent yet reached the end
            this.changePose(this.routine[this.currentPose]);
          } else {
            // reached the end of the session, there are no more poses.
            // calculate the average score of the whole session
            sessionAverage /= counter;

            // TODO: fire real event
            await this.fireRoutineCompletedEvent({
              averageAccuracy: sessionAverage * 100
            });

            sessionAverage = 0; // init
            // we can exit from the requestAnimationFrame loop
            return;
          }
        }
      } else {
        // wrong pose, red
        mask = bodyPix.toMask(
          personSegmentation,
          this.redMask,
          this.backgroundMask
        );
      }

      // Update prev time
      this.prevTime = new Date();

      // draw the mask onto the image on a canvas.  With opacity set to 0.7 this will darken the background.
      bodyPix.drawMask(this.canvas, this.video, mask, this.opacity);

      // counter use to calculate the average accuracy
      counter += 1;

      // loop on next frame
      requestAnimationFrame(this.processFrame);
    };

    // JS 101
    this.processFrame.bind(this);
    this.processFrame();
  }

  render() {
    return (
      <div className="App db-body">
        {/* Write all html here */}
        <div className="rightside d-flex justify-content-center align-items-center">
          <h1 style={{ fontSize: 72 }} id="scoreboard">
            {this.state.scoreboard}
          </h1>
        </div>
        <div className="rightside d-flex justify-content-center align-items-center">
          <h1 style={{ fontSize: 56 }} id="elapsed_time">
            {Math.round(this.state.elapsedTime)} / {this.state.holdTime}
          </h1>
        </div>
        <div className="row no-gutters">
          <div className="col-md-6 no-gutters">
            <div className="rightside d-flex justify-content-center align-items-center">
              {/* <video
                controls
                hidden
                id="vid_inst"
                autoPlay
                width={640}
                height={653}
              >
                <source src={lVedio} type="video/mp4" />
              </video> */}
              <img
                id="instructor"
                style={{ objectFit: "contain" }}
                width="75%"
                height="75%"
                src={this.state.instructorPose}
              ></img>
              {/* <canvas id="c" /> */}
            </div>
          </div>
          <div className="col-md-6 no-gutters">
            <div className="leftside d-flex justify-content-center align-items-center">
              <canvas id="output">
                <video id="vid" controls width={"720px"} height={"800px"} />
              </canvas>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveYoga;
