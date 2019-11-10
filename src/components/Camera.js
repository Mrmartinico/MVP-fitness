import { drawKeyPoints, drawSkeleton } from './utils'
import React, { Component } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import lVedio from '../vedio/newvedio.mpeg'

class PoseNet extends Component {
  static defaultProps = {
    videoWidth: 660,
    videoHeight: 550,
    flipHorizontal: false,
    algorithm: 'single-pose',
    showVideo: false,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.5,
    minPartConfidence: 0.7,
    maxPoseDetections: 1,
    nmsRadius: 20,
    outputStride: 8,
    imageScaleFactor: 0.2,
    skeletonColor: '#81e663',
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }


  constructor(props) {
    super(props, PoseNet.defaultProps)
    this.state = {
      errMsg: 'Loading...please be patient...',
      url:'https://www.youtube.com/watch?v=M8gN00LgJto'
    }
  }

  getCanvas = elem => {
    this.canvas = elem
  }
  getCanvas2 = elem => {
    this.canvas2 = elem
  }
  getVideo = elem => {
    this.video = elem
  }

  getVideo2 = elem => {
    this.video2 = elem
  }



  async componentDidMount() {
    try {
      // await this.setupCamera()
    } catch (error) {
      throw new Error(
        'This browser does not support video capture, or this device does not have a camera'
      )
    }

    try {
      this.posenet = await posenet.load()
    } catch (error) {
      throw new Error('PoseNet failed to load')
    } finally {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 5000)
    }
    this.detectPose()
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
    }
    const { videoWidth, videoHeight } = this.props;
    const video = this.video;
    video.width = videoWidth;
    video.height = videoHeight;

    this.video2.width = videoWidth;
    this.video2.height = videoHeight;
    /* play video twice as fast */
document.querySelector('video').defaultPlaybackRate = 2.0;
document.querySelector('video').play();


    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
      }
    });

    video.srcObject = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const { videoWidth, videoHeight } = this.props
    // const canvas = this.canvas
    // const canvasContext = canvas.getContext('2d')
    const canvas2 = this.canvas2
    const canvasContext2 = canvas2.getContext('2d')

    // canvas.width = videoWidth
    // canvas.height = videoHeight

    canvas2.width = videoWidth
    canvas2.height = videoHeight

    this.poseDetectionFrame(canvasContext2)
    
  }

  poseDetectionFrame(canvasContext2) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
      maxPoseDetections,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props

    const posenetModel = this.posenet
    // const video = this.video
    const video2 = this.video2

    // const findPoseDetectionFrame = async () => {
    //   let poses = []

    //   switch (algorithm) {
    //     case 'multi-pose': {
    //       poses = await posenetModel.estimateMultiplePoses(
    //         video,
    //         imageScaleFactor,
    //         flipHorizontal,
    //         outputStride,
    //         maxPoseDetections,
    //         minPartConfidence,
    //         nmsRadius
    //       )
    //       break
    //     }
    //     case 'single-pose': {
    //       const pose = await posenetModel.estimateSinglePose(
    //         video,
    //         imageScaleFactor,
    //         flipHorizontal,
    //         outputStride
    //       );
    //       poses.push(pose)
    //       break
    //     }
    //   }

    //   canvasContext.clearRect(0, 0, videoWidth, videoHeight)

    //   if (showVideo) {
    //     canvasContext.save()
    //     canvasContext.scale(-1, 1)
    //     canvasContext.translate(-videoWidth, 0)
    //     canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
    //     canvasContext.restore()
    //   }

    //   poses.forEach(({ score, keypoints }) => {
    //     if (score >= minPoseConfidence) {
    //       this.setState({ color: 'black', errMsg: '' })

    //       if (showPoints) {
    //         drawKeyPoints(
    //           keypoints,
    //           minPartConfidence,
    //           skeletonColor,
    //           canvasContext
    //         )
    //       }
    //       if (showSkeleton) {
    //         drawSkeleton(
    //           keypoints,
    //           minPartConfidence,
    //           skeletonColor,
    //           skeletonLineWidth,
    //           canvasContext
    //         )
    //       }
    //     } else {
    //       this.setState({ color: 'red', errMsg: 'Unable to detect whole body, please adjust camera accordingly' })
    //     }
    //   })
    //   requestAnimationFrame(findPoseDetectionFrame)
    // }
    const findPoseDetectionFrame2 = async () => {
      let poses = []

      switch (algorithm) {
        case 'multi-pose': {
          poses = await posenetModel.estimateMultiplePoses(
            video2,
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            maxPoseDetections,
            minPartConfidence,
            nmsRadius
          )
          break
        }
        case 'single-pose': {
          const pose = await posenetModel.estimateSinglePose(
            video2,
            imageScaleFactor,
            flipHorizontal,
            outputStride
          );
          poses.push(pose)
          break
        }
      }

      canvasContext2.clearRect(0, 0, videoWidth, videoHeight)

      if (showVideo) {
        canvasContext2.save()
        canvasContext2.scale(-1, 1)
        canvasContext2.translate(-videoWidth, 0)
        canvasContext2.drawImage(video2, 0, 0, videoWidth, videoHeight)
        canvasContext2.restore()
      }

      if(poses.length === 0 ){
        this.setState({ color: 'red', errMsg: 'Unable to detect whole body, please adjust camera accordingly' })
      }else{
        this.setState({ color: 'black', errMsg: '' })

      }

      poses.forEach(({ score, keypoints }) => {
        if (score >= minPoseConfidence) {

          if (showPoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              skeletonColor,
              canvasContext2
            )
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext2
            )
          }
        } else {
          // this.setState({ color: 'red', errMsg: 'Unable to detect whole body, please adjust camera accordingly' })
        }
      })
      requestAnimationFrame(findPoseDetectionFrame2)
    }
    // findPoseDetectionFrame()
    findPoseDetectionFrame2()

  }

  render() {
    return (
      <div>
        <h1 style={{ color: this.state.color }}>{this.state.errMsg}</h1>
        {/* <div>
          <video id="videoNoShow" playsInline ref={this.getVideo} />
          <canvas className="webcam" ref={this.getCanvas} />
        </div> */}

        <div>
          <video id="video" ref={this.getVideo2} width="660" height="550"  controls src={lVedio} type="video/mp4" />
          <canvas className="webcam" ref={this.getCanvas2} />

        </div>
      </div>
    )
  }
}

export default PoseNet
