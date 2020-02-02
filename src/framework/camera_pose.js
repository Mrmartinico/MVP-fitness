import {drawKeypoints, drawSkeleton} from './draw';
import {drawKeypoints_inst, drawSkeleton_inst} from './draw_instructor';
import WebcamSetup from './webcam';
import Model from './model'
import CosineSimilarity from './similarity';


const videoWidth = 640;
const videoHeight = 653;

let minPoseConfidence = 0.2
let minPartConfidence = 0.2
// cosine similarity object
let similarity = new CosineSimilarity(true, 0.85);

/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
function detectPoseInRealTime(video, net, confront_pose) {
  console.log(net);
  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');
  ctx.filter = 'grayscale(100%)';

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  async function poseDetection() {
    let poses = [];

    let all_poses = await net.estimatePoses(video, {
      flipHorizontal: true,
      decodingMethod: 'multi-person',
      maxDetections: 2,
      scoreThreshold: 0.6,
    });

    poses = poses.concat(all_poses);

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();


    poses.forEach(({score, keypoints}) => {
      if (keypoints && score >= minPoseConfidence) {
        console.log(keypoints);
        var user_poses = localStorage.getItem('user_poses')
        var inst_poses = localStorage.getItem('inst_poses')
        var user_user = [], inst_inst = []

        if (user_poses && inst_poses) {
          user_user = JSON.parse(user_poses)
          inst_inst = JSON.parse(inst_poses)
        }
        console.log('hi', user_user, 'hi hi', inst_inst)
        localStorage.setItem('user_poses', JSON.stringify(keypoints))
        drawKeypoints(keypoints, minPartConfidence, ctx);
        drawSkeleton(keypoints, minPartConfidence, ctx);
        //drawBoundingBox(keypoints, ctx);

        //console.log(similarity.calculate({score, keypoints}, confront_pose));
      }
    });

    requestAnimationFrame(poseDetection);

  }

  poseDetection();
}

/* instructor*/
function detectPoseInstructor(video, net, confront_pose) {
  console.log(net);
  var canvas = document.getElementById('c');
  var ctx = canvas.getContext('2d');
  var video = document.getElementById('vid_inst');

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  video.addEventListener('play', function () {
    var $this = this; //cache
    (function loop() {
      if (!$this.paused && !$this.ended) {
        ctx.drawImage($this, 0, 0);
        setTimeout(loop, 1000 / 30); // drawing at 30fps
      }
    })();
  }, 0)

  async function poseDetection() {
    let poses_inst = [];

    let all_poses = await net.estimatePoses(video, {
      flipHorizontal: true,
      decodingMethod: 'multi-person',
      maxDetections: 2,
      scoreThreshold: 0.6,
    });

    poses_inst = poses_inst.concat(all_poses);

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    ctx.restore();

    poses_inst.forEach((obj) => {
      // console.log(obj);
      if (obj.keypoints && obj.score >= minPoseConfidence) {
        // console.log(keypoints_inst);
        console.log('instructor', obj.keypoints)
        var instructor_poses = localStorage.getItem('inst_poses')
        localStorage.setItem('inst_poses', JSON.stringify(obj.keypoints))
        drawKeypoints_inst(obj.keypoints, minPartConfidence, ctx);
        drawSkeleton_inst(obj.keypoints, minPartConfidence, ctx);
        //drawBoundingBox(keypoints, ctx);

        //console.log(similarity.calculate({score, keypoints}, confront_pose));
      }
    });

    requestAnimationFrame(poseDetection);

  }

  poseDetection();

}

async function loadVideo() {
  // get the loader object
  let loader = new WebcamSetup(document.getElementById('vid'), videoWidth, videoHeight);
  // load the webcam video
  const video = await loader.setupCamera();
  // play it
  video.play();

  return video;
}

/**
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off the detectPoseInRealTime function.
 */
export async function bindPage(confront_pose) {
  let model = new Model();
  const net = await model.load();

  let video;
  let video_instructor = document.getElementById('vid_inst');
  try {
    video = await loadVideo();
  } catch (e) {
    console.log(e);
  }
  detectPoseInRealTime(video, net, confront_pose);
  detectPoseInstructor(video_instructor, net, confront_pose)
}

