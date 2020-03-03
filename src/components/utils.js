import * as posenet from '@tensorflow-models/posenet'

const pointRadius = 10

export const config = {
  videoWidth: 660,
  videoHeight: 550,
  flipHorizontal: false,
  algorithm: 'single-pose',
  showVideo: true,
  showSkeleton: true,
  showPoints: true,
  minPoseConfidence: 0.5,
  minPartConfidence: 0.7,
  maxPoseDetections: 1,
  nmsRadius: 60,
  outputStride: 16,
  imageScaleFactor: 0.2,
  skeletonColor: '#ffadea',
  skeletonLineWidth: 6,
  loadingText: 'Loading...please be patient...'
}

function toTuple({x, y}) {
  return [x, y]
}

// && ["nose","leftEye","rightEye","leftEar","rightEar"].indexOf(keypoint.part)=== -1
export function drawKeyPoints(
  keypoints,
  minConfidence,
  skeletonColor,
  canvasContext,
  scale = 1
) {
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      // console.log(keypoint);
      const {x, y} = keypoint.position;
      canvasContext.beginPath()
      canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
      canvasContext.fillStyle = '#4389bf';
      canvasContext.fill()
    }
  })
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext
) {
  canvasContext.beginPath()
  canvasContext.moveTo(firstX * scale, firstY * scale)
  canvasContext.lineTo(nextX * scale, nextY * scale)
  canvasContext.lineWidth = lineWidth
  canvasContext.strokeStyle = color
  canvasContext.stroke()
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  canvasContext,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  )

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      canvasContext
    )
  })
}

export function segmentIdentity(user) {
  console.log('ANALYTICS', user);
  if (!user || !user.id) {
    window.analytics.identify('0', {
      name: 'anonymous',
      email: 'anonymous@anonymous.com',
    });
  } else {
    window.analytics.identify(user.id, {
      name: user.full_name,
      email: user.email,
      user_type: user.user_type
    });
  }
}
