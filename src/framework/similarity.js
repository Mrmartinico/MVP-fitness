class CosineSimilarity {

    /**
     * Sets the fields of this class
     * @param {bool} norm boolean that indicates 
     *                    whether to normalise the
     *                    vectors or not
     * @param {float} minPartScore indicates the minimum
     *                             confidence threshold for
     *                             the estimation of each
     *                              keypoint in the poses
     */
    constructor(norm, minPartScore) {
        this.norm = norm;
        this.minPartScore = minPartScore;
        this.similarity = require('compute-cosine-similarity');
    }

    /**
     * Returns the cosine similarity of the two arguments
     * @param {object} pose1 dictionary of { score, keypoints } 
     * @param {object} pose2 dictionary of { score, keypoints }
     */
    calculate(pose1, pose2) {
        // get the keypoints of the poses
        let keyPtsPose1 = pose1.keypoints;
        let keyPtsPose2 = pose2.keypoints;
    
        // placeholder for the average cosine similarity
        let cosineSimilarity = 0;
    
        // placeholder for the vectors of the joints
        let vec1;
        let vec2;
        for(var i = 5; i < keyPtsPose1.length; i++) {
            // if the confidence for the i-th joint doesn't exceed
            // MIN_PART_SCORE, then set vec1 and vec2 to two
            // opposite vectors. In this way, the cosine similarity
            // will be equal to -1 which indicates two uncorrelated
            // vectors
            vec1 = keyPtsPose1[i].score > this.minPartScore 
                ? [keyPtsPose1[i].position.x, keyPtsPose1[i].position.y] : [0,1]

            vec2 = keyPtsPose2[i].score > this.minPartScore 
                ? [keyPtsPose2[i].position.x, keyPtsPose2[i].position.y] : [0,-1]

            // normalise the vectors if norm is set
            if(this.norm === true) {
                vec1 = this.normalizeVector(vec1);
                vec2 = this.normalizeVector(vec2);
            }

            console.log("[" + vec1 + "],[" + vec2 + "]");
    
            // calculate the similarity between vec1 and vec2
            cosineSimilarity += this.similarity(vec1, vec2);
        }
        // return the average similarity
        // we don't want to grab the similarity for the eyes,
        // nose and ears. That's why we get rid of the first 5
        // keypoints
        return cosineSimilarity / (keyPtsPose1.length - 5);
    }

    /**
     * Computes the L2 norm of the vector in input
     * @param {Array} vector 
     */
    normalizeVector(vector){
        let l2Norm = require('compute-l2norm');
        // calculate the l2 norm
        let vecNorm = l2Norm(vector);
        // divide the entries of the vector by vecNorm
        return vector.map(function(item) { return item / vecNorm });
    }
    
}

export default CosineSimilarity;