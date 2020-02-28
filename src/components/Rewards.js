import React, {Component} from 'react'
import {GET_INSTRUCTORS, getHomeStatsURL, getSessionURL, LOCAL_STORAGE_KEY} from "../common/urlconstants";
import CommonHeader from "./CommonHeader";
import instrDefaultImg from "../assests/rewards_w2.png";
import instrDefaultImgw2 from "../assests/rewards_w3.png";


class Rewards extends Component {
  static userInfo = '';
  static defaultProps = {
    loadingText: 'Loading...please be patient...'
  };


  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      stats: {},
      instructorList: [1, 2, 3, 4],
      instructorList2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12],
      errMsg: 'Loading...please be patient...'
    }
    const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(userInfo);
    const isUserLogIn = !!userInfo;
    if (!userInfo)
      this.props.history.push('/login');
  }

  getSessions = () => {
    console.log(Rewards.userInfo);
    fetch(getSessionURL(Rewards.userInfo.email), {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json()).then(res => {
      console.log(' >>>> SESSIONS', res);
      if (res && res.sessions.length) {
        this.setState({sessions: res.sessions})
      }
    }).catch(err => {
      console.log(err);
    })
  };

  getHomeStats = () => {
    console.log(Rewards.userInfo);
    fetch(getHomeStatsURL(Rewards.userInfo.email), {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json()).then(res => {
      console.log(' >>>> Home Stats', res);
      if (res && res.statistics && res.statistics.community_percentage) {
        this.setState({stats: res.statistics});
      }
    }).catch(err => {
      console.log(err);
    })
  };

  getInstructors = () => {
    fetch(GET_INSTRUCTORS, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json()).then(res => {
      console.log(' >>>> Instructors Stats', res);
      if (res && res.instructors_details.length) {
        this.setState({instructorList: res.instructors_details})
      }
    }).catch(err => {
      console.log(err);
    })
  };


  async componentDidMount() {
    try {
      Rewards.userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      window.analytics.page('Rewards');

      this.getHomeStats();

    } catch (error) {
      console.log(error);
    }
  }

  handelLogout = () => {
    // this.props.onLogOut();
    console.log('logging out ??');
    localStorage.setItem(LOCAL_STORAGE_KEY, '');
    this.setState({loginInfo: ''});
    this.setState({loginStatus: false});
    this.props.history.push('/');

  };


  render() {
    return (
      <div>
        <div className="db-body">
          <CommonHeader history={this.props.history} value={'rewards'}/>
          <div className="scroll-db">

            <section className="session mt-50 " style={{padding: '0px 30px 10px 30px'}}>
              {/*<div className="section-heading">Session 2</div>*/}
              {this.state.stats && this.state.stats.rewards && this.state.stats.rewards.sessions_completed ?

                <div className="row align-items-end">
                  <div className="col-7 " style={{padding: '0px 0px 0px 5%'}}>
                    <h2 className="color-white">REWARDS</h2>
                    <h6 className="color-white">Complete Sessions to unlock new and exclusive
                      rewards</h6>
                    <div className="row mt-4">
                      <div className="col ">
                        <h4 className="color-white">{this.state.stats.rewards.sessions_completed} Sessions
                          Completed</h4>
                      </div>
                      <div className="col text-end ">
                        <p
                          className="color-white">{this.state.stats.rewards.remaining_sessions} of {this.state.stats.rewards.sessions_completed}</p>
                      </div>

                    </div>


                    <div className="progress" style={{
                      borderRadius: '0px', transform: 'skew(-20deg)',
                      background: '#555', height: '20px', margin: '6px 0px'
                    }}>
                      <div className="progress-bar custome-progress" role="progressbar"
                           style={{width: 20 + '%'}}
                           aria-valuenow={2}
                           aria-valuemin={0} aria-valuemax={100}/>
                    </div>
                  </div>
                  <div className="col-5 text-center">
                    <h1 style={{fontSize: '144px'}}>5</h1>
                    <h6 className="color-white" style={{margin: '1% 0px 0px 7%'}}>Complete Sessions to unlock new and
                      exclusive
                      rewards</h6>
                  </div>


                </div>
                : <p className="white">Please wait...</p>}

            </section>
            <section className="session instructor rewards-w2">
              <div>
                {this.state.instructorList.length === 0 ?
                  <p className="section-heading">No Instructor available</p> : ''}

                <div className="row">
                  {this.state.instructorList.map((o, index) =>
                    <div className="col-3">
                      <img src={instrDefaultImg} alt="logo"/>
                      <div className="parallex"
                      > 0{index + 1}
                      </div>
                      <div className="parallex-bottom">
                        <b>TSX</b>
                        <p className="mt-10">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button type="button" className="btn img-btn br-0">Play</button>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              <div className="text-center mt-10 mb-10">
                <button type="button" className="btn btn-outline-light active">All</button>
                <button type="button" className="btn btn-outline-light">Next 5 sessions</button>
                <button type="button" className="btn btn-outline-light">Next 8 sessions</button>
                <button type="button" className="btn btn-outline-light">Next 12 sessions</button>
                <button type="button" className="btn btn-outline-light">Next 20 sessions</button>
              </div>
            </section>
            <section className="session instructor rewards-w3">
              <div>
                {this.state.instructorList2.length === 0 ?
                  <p className="section-heading">No Instructor available</p> : ''}

                <div className="row">
                  {this.state.instructorList2.map((o, index) =>
                    <div className="col-3">
                      <img src={instrDefaultImgw2} alt="logo"/>
                      <div className="parallex"
                      > {index + 1}
                      </div>
                      <p className="parallex-p">5 more sessions</p>
                      <div className="parallex-bottom">
                        <b>TSX</b>
                        <p className="mt-10">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button type="button" className="btn br-0 img-btn">Preview</button>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              <div className="text-center mt-10 mb-10">
                <button type="button" className="btn btn-outline-light active">Load more</button>
              </div>
            </section>

          </div>
        </div>
      </div>
    )
  }
}

export default Rewards
