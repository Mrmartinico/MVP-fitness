import React, {Component} from 'react'
import session_1 from '../assests/dashboard_session_1.png';
import session_2 from '../assests/dashboard_session_2.png';
import session_3 from '../assests/dashboard_session_3.png';
import session_4 from '../assests/dashboard_session_4.png';
import {GET_INSTRUCTORS, getHomeStatsURL, getSessionURL, LOCAL_STORAGE_KEY} from "../common/urlconstants";
import CommonHeader from "./CommonHeader";
import {segmentIdentity} from "./utils";


class Dashboard extends Component {
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
    };
    const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(userInfo);
    const isUserLogIn = !!userInfo;
    if (!userInfo)
      this.props.history.push('/login');
  }

  getSessions = () => {
    console.log(Dashboard.userInfo);
    fetch(getSessionURL(Dashboard.userInfo.email), {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json()).then(res => {
      console.log(' >>>> SESSIONS', res);
      if (res && res.sessions.length) {
        res.sessions.push({
          "id": "0",
          "week_day": "wednesday",
          "session_date": "2019-11-16",
          "start_time": "2019-11-16T14:07:26Z",
          "end_time": "2019-11-16T16:07:31Z",
          "session_duraton": "2.00",
          "session_path": "''",
          "current_specialization_type": "Yoga",
          "instructor_username": "niccolo",
          "expertise_specification": null,
          "expertise_types": [
            {
              "specialization_type": "Yoga",
              "description": "hjdjjbdbddbjhbcc jcbjhxbhjx"
            },
            {
              "specialization_type": "Zumba",
              "description": "njknfjfbkjkbd"
            }
          ],
          "upcoming_sessions": []
        });
        this.setState({sessions: res.sessions})
      }
    }).catch(err => {
      console.log(err);
    })
  };

  getHomeStats = () => {
    console.log(Dashboard.userInfo);
    fetch(getHomeStatsURL(Dashboard.userInfo.email), {
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
      Dashboard.userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      segmentIdentity(Dashboard.userInfo);
      window.analytics.page('Rewards');
      this.getSessions();
      this.getHomeStats();
      this.getInstructors();

    } catch (error) {
      console.log(error);
    }
  }

  goLive = () => {
    this.props.history.push('/live');

  };
  goToRewards = () => {
    this.props.history.push('/rewards');
  };


  render() {
    return (
      <div id="dashboard">
        <div className="db-body">
          <CommonHeader history={this.props.history} value={'dashboard'}/>

          <div className="scroll-db">
            <section className="db-banner db-bg" style={{overflowX: 'hidden'}}>
              <div id="header">
                <div className="row">
                  <div className="col-md-7">
                    <p className="m-recent">MOST RECENT</p>
                    <h2 className="text-white">Powerful workout <br/>
                      to feel refreshed</h2>
                    {/*<div className="m-0">*/}
                    {/*  <img className="img-user" style={{height: '50px', width: '50px'}} src={instrDefaultImg}/>*/}
                    {/*  <b className="text-white" style={{paddingLeft: '10px'}}>With Micheal</b>*/}
                    {/*</div>*/}
                    <h6 className="gray-d">Get real-time visual feedback while performing <br/>quick sessions.
                    </h6>
                    <br/>
                    <button onClick={this.goLive} className="btn-white">Play Now</button>
                    {/*&nbsp;&nbsp;*/}
                    {/*<button className="btn-calender">Add to calender</button>*/}
                  </div>
                </div>
              </div>

            </section>
            <section className="main-container">


              <section className="session mt-50 mb-5 instructor" style={{}}>
                <div className="section-heading ">SESSIONS</div>
                <div className="session-container" style={{flexWrap: 'wrap'}}>
                  {this.state.sessions.length === 0 ?
                    <p className="section-heading">No sessions available</p> : ''}

                  {this.state.sessions.map((o, index) =>
                    <div style={{margin: '5px'}}>
                      <div className="box" key={o.id}>
                        {index === 0 && < img src={session_1} alt="logo"/>}
                        {index === 1 && < img src={session_2} alt="logo"/>}
                        {index === 2 && < img src={session_3} alt="logo"/>}
                        {index === 3 && < img src={session_4} style={{background: 'rgba(0, 0, 0, 0.71)'}}alt="logo"/>}
                        {index !== 3 && <div className="parallex white-text"
                                             style={{background: 'rgba(255, 0, 213, 0.5)'}}> Refresher
                        </div>}
                        {index !== 3 && <div onClick={this.goLive} className="parallex-bottom">
                          <button className="btn-white">Play Now</button>
                        </div>}
                        {index === 3 && <div className="parallex white-text"
                        > Yoga
                        </div>}
                        {index === 3 && <div className="parallex-bottom">
                          COMMING SOON
                        </div>}

                      </div>
                      {/*<div className="row">*/}
                      {/*  <div className="col">*/}
                      {/*    <p className="color-white">01/01/2020</p>*/}
                      {/*  </div>*/}
                      {/*  <div className="col-4 text-end ">*/}
                      {/*    <p className="color-white">550 views</p>*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                    </div>
                  )}
                </div>

                < div className="text-center mt-1">
                  <button className="com-button">View all</button>
                </div>
              </section>

              <section className="session mt-50 " style={{padding: '6% 6%'}}>
                {/*<div className="section-heading">Session 2</div>*/}
                {this.state.stats && this.state.stats.rewards && this.state.stats.rewards.sessions_completed ?

                  <div className="">
                    <div className="row">
                      <div className="col text-center border-r-1px">
                        <h1>{this.state.stats.session_accuracy}%</h1>
                        <p className="color-white">Average Accuracy</p>
                      </div>
                      <div className="col text-center border-r-1px">
                        <h1>{this.state.stats.total_hours}hr</h1>
                        <p className="color-white">Total minutes spent</p>

                      </div>
                      <div className="col text-center">
                        <h1>{this.state.stats.session_completed}</h1>
                        <p className="color-white">Number of sessions completed</p>

                      </div>
                    </div>

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
                  : <p>No information available </p>}

                <div className="text-center mt-6per">

                  <button className="com-button" onClick={this.goToRewards}> Go to My stats</button>
                </div>
              </section>

              {/*<section className="session mt-50 mb-5 instructor" style={{}}>*/}
              {/*  <div className="section-heading ">INSTRUCTORS</div>*/}
              {/*  <div className="session-container" style={{flexWrap: 'wrap'}}>*/}
              {/*    {this.state.instructorList.length === 0 ?*/}
              {/*      <p className="section-heading">No Instructor available</p> : ''}*/}

              {/*    {this.state.instructorList.map(o =>*/}
              {/*      <div style={{margin: '10px'}}>*/}
              {/*        <div className="box" key={o.id}>*/}
              {/*          <img src={instrDefaultImg} alt="logo"/>*/}
              {/*          <div className="parallex"*/}
              {/*               style={{background: 'rgba(56, 44, 251, 0.5)'}}> {o.first_name + ' ' + o.last_name}   </div>*/}
              {/*          <div className="parallex-bottom"*/}
              {/*               style={{background: 'rgba(0, 0, 0, 0.5)'}}> Learn Bikram with Michael*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*        <div className="row">*/}
              {/*          <div className="col">*/}
              {/*            <p className="color-white">Joined 01/01/2020</p>*/}
              {/*          </div>*/}
              {/*          <div className="col-4 text-end ">*/}
              {/*            <p className="color-white">View</p>*/}
              {/*          </div>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    )}*/}
              {/*  </div>*/}

              {/*  < div className="text-center mt-1">*/}
              {/*    <button className="com-button">View all</button>*/}
              {/*  </div>*/}
              {/*</section>*/}

            </section>

          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
