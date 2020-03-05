import * as posenet from "@tensorflow-models/posenet";
import * as tf from "@tensorflow/tfjs";
import * as bodyPix from "@tensorflow-models/body-pix";

/**
 * Wrapper class for the posenet model
 * TO-DO: Add paramaters to fine-tune the model
 * in the constructor of this class
 */
class Model {
  /**
   * Loads the posenet model and sets
   * the Model.net field
   */
  async load() {
    let net = posenet.load();
    console.log("Model loaded.");
    return net;
  }

  async loadBodyPix(version = "mobile") {
    const resNetConfig = {
      architecture: "ResNet50",
      outputStride: 32,
      quantBytes: 2
    };

    const mobileNetConfig = {
      architecture: "MobileNetV1",
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    };

    let net;
    if (version === "mobile") {
      net = await bodyPix.load(mobileNetConfig);
    } else {
      net = await bodyPix.load(resNetConfig);
    }

    return net;
  }

  async loadPoseClassifier() {
    const model = await tf.loadLayersModel(
      "/models/pose_classifier_dataset2.json",
      false
    );
    console.log("PoseClassifier loaded");
    return model;
  }
}

export default Model;
