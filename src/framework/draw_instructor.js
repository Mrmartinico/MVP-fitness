import * as posenet from "@tensorflow-models/posenet";

const COLOR = 'red';
const LINE_WIDTH = 2;

export function toTuple({y, x}) {
    return [y, x];
  }

export function drawPoint(ctx, y, x, r, COLOR) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = COLOR;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment([ay, ax], [by, bx], COLOR, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.LINE_WIDTH = LINE_WIDTH;
  ctx.strokeStyle = COLOR;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton_inst(keypoints_inst, minConfidence, ctx, scale = 1, color = COLOR) {
  const adjacentKeyPoints =
      posenet.getAdjacentKeyPoints(keypoints_inst, minConfidence);

  adjacentKeyPoints.forEach((keypoints_inst) => {
    drawSegment(
        toTuple(keypoints_inst[0].position), toTuple(keypoints_inst[1].position), color,
        scale, ctx);
  });
}

/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints_inst(keypoints_inst, minConfidence, ctx, scale = 1, color = COLOR) {
  for (let i = 0; i < keypoints_inst.length; i++) {
    const keypoint_inst = keypoints_inst[i];

    if (keypoint_inst.score < minConfidence) {
      continue;
    }

    const {y, x} = keypoint_inst.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}