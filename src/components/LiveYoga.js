import React, {Component} from 'react'
import '../App.scss';
import {bindPage} from '../framework/camera_pose'
import lVedio from '../vedio/yoga_1.mp4' //  change your vedio here
var pose1 = '{"score":0.970882840016309,"keypoints":[{"score":0.9980577230453491,"part":"nose","position":{"x":268.61655624924003,"y":84.64433870426876}},{"score":0.9880929589271545,"part":"leftEye","position":{"x":276.5307522191148,"y":76.05824273847884}},{"score":0.9939249157905579,"part":"rightEye","position":{"x":256.91754352257874,"y":76.23118923795826}},{"score":0.8249800205230713,"part":"leftEar","position":{"x":292.1982286505198,"y":81.5635152735135}},{"score":0.7962579131126404,"part":"rightEar","position":{"x":245.2456866906311,"y":86.68390830667103}},{"score":0.9981082677841187,"part":"leftShoulder","position":{"x":308.40866266985347,"y":139.295905443481}},{"score":0.9984477162361145,"part":"rightShoulder","position":{"x":229.2062514486944,"y":145.36079139561042}},{"score":0.9955794215202332,"part":"leftElbow","position":{"x":322.7820501067759,"y":209.54679437184612}},{"score":0.9962530732154846,"part":"rightElbow","position":{"x":214.81450893535688,"y":214.76939873008877}},{"score":0.9945013523101807,"part":"leftWrist","position":{"x":321.1373711374483,"y":265.09028156443793}},{"score":0.9978019595146179,"part":"rightWrist","position":{"x":209.60787108900018,"y":276.81683492103906}},{"score":0.9929429292678833,"part":"leftHip","position":{"x":288.3417389272252,"y":262.6146706903955}},{"score":0.9953970313072205,"part":"rightHip","position":{"x":248.03775831883056,"y":257.814938437614}},{"score":0.995189905166626,"part":"leftKnee","position":{"x":295.53609528894094,"y":359.3546280322836}},{"score":0.9895787835121155,"part":"rightKnee","position":{"x":244.28986011312168,"y":370.90845130297}},{"score":0.9737228751182556,"part":"leftAnkle","position":{"x":297.5748072524015,"y":450.86935199188355}},{"score":0.9761714339256287,"part":"rightAnkle","position":{"x":237.14540711636675,"y":454.7727473515017}}]}';
pose1 = JSON.parse(pose1);

class LiveYoga extends Component {
  static userInfo = '';
  static defaultProps = {
    loadingText: 'Loading...please be patient...'
  };

  componentDidMount() {
    // entry point of app
    setTimeout(() => {
      bindPage(pose1);
    }, 2000);
  }


  render() {
    return (
      <div className="App db-body">
        {/* Write all html here */}
        <div className="row no-gutters">
          <div className="col-md-6 no-gutters">
            <div className="rightside d-flex justify-content-center align-items-center">
              <video controls hidden id="vid_inst" autoPlay width={640} height={653}>
                <source src={lVedio} type="video/mp4"/>
              </video>
              <canvas id="c"/>
            </div>
          </div>
          <div className="col-md-6 no-gutters">
            <div className="leftside d-flex justify-content-center align-items-center">
              <canvas id="output">
                <video id="vid" controls width={640} height={653}/>
              </canvas>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LiveYoga
