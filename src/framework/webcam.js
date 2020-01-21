class WebcamLoader {

    /**
     * Constructs the object with the 
     * passed parameters
     * @param {HTMLElement} video HTMLElement of where
     *                          to render the video
     * @param {int} width the width of the video to render
     * @param {int} height the height of the video to render
     */
    constructor(video, width, height) {
        this.video = video;
        // fill the width and height of the video
        // that we want to render
        this.video.width = width;
        this.video.height = height
    }

    async setupCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available');
        }

        // we don't want any audio on the streaming video
        // user privacy concerns
        const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            'facingMode': 'user',
            'width': this.video.width,
            'height': this.video.height,
        },
        });
        // put the streaming object created above
        // to the source object of the video
        this.video.srcObject = stream;

        return new Promise((resolve) => {
            this.video.onloadedmetadata = () => {
                resolve(this.video);
            };
        });
    }
}

export default WebcamLoader;