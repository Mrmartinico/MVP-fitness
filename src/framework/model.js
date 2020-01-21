import * as posenet from "@tensorflow-models/posenet";

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
}

export default Model;