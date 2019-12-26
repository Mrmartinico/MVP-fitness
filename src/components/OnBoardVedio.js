import React, {Component} from 'react'
import {LOCAL_STORAGE_KEY} from "../common/urlconstants";
import {Player} from "video-react";
import logoDummy from "../assests/logo.png";


class OnBoardVedio extends Component {
  static userInfo = '';
  static defaultProps = {
    loadingText: 'Loading...please be patient...'
  };


  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      stats: {},
      instructorList: [],
      errMsg: 'Loading...please be patient...'
    }
  }


  async componentDidMount() {
    try {
      OnBoardVedio.userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    } catch (error) {
      console.log(error);
    }
  }

  goToDashboard = () => {
    // this.props.onLogOut();
    console.log('logging out ??');
    localStorage.setItem(LOCAL_STORAGE_KEY, '');
    this.setState({loginInfo: ''});
    this.setState({loginStatus: false});
    this.props.history.push('/');

  };


  render() {
    return (
      <div style={{background:'red',}}>
          <Player
            fluid={false}
            playsInline
            poster={logoDummy}
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
      </div>
    )
  }
}

export default OnBoardVedio
