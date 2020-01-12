import {drawKeypoints, drawSkeleton} from './draw';

let JOINT_CONFIDENCE = 0
/**
 * Detects a single pose from an imageElement
 * and returns the identified keypoints with its
 * corresponding confidence scores. Gets in input 
 * an HTML element containing an image:
 *  e.g. imageElement = document.getElementById('pose');
 * Notice that the image passed in input must be a
 * squared one.
 * @param {HTMLElement} imageElement 
 * @param {PoseNet} net the network model
 * @param {boolean} draw specifies whether to draw the
 *                       keypoints and skeleton on the
 *                       canvas
 */
export function detectStaticPose(imageElement, net, draw) {
    let pose = net.estimateSinglePose(imageElement, {
        flipHorizontal: false
    });

    if(draw === true) {
        const canvas = document.getElementById('output');
        const ctx = canvas.getContext('2d');

        let width = imageElement.width;
        let height = imageElement.height;
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(imageElement, 0, 0, width, height);

        drawKeypoints(pose.keypoints, JOINT_CONFIDENCE, ctx);
        drawSkeleton(pose.keypoints, JOINT_CONFIDENCE, ctx);
    }

    return pose;
}

//TO-DO: add the continuous pose detection from webcam and mp4 videos