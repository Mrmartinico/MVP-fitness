import React, {Component} from 'react'
import defaultImg from '../assests/yoga.jpg';
import logoicon from '../assests/logo-1.jpg';
import {GET_INSTRUCTORS, getHomeStatsURL, getSessionURL, LOCAL_STORAGE_KEY} from "../common/urlconstants";


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
    }
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
      const data = {
        "sessions": [{
          "id": "sess_001",
          "week_day": "wednesday",
          "session_date": "2019-11-16",
          "start_time": "2019-11-16T14:07:26Z",
          "end_time": "2019-11-16T16:07:31Z",
          "session_duraton": "2.00",
          "session_path": "''",
          "current_specialization_type": "Yoga",
          "instructor_username": "niccolo",
          "expertise_specification": null,
          "expertise_types": [{
            "specialization_type": "Yoga",
            "description": "hjdjjbdbddbjhbcc jcbjhxbhjx"
          }, {"specialization_type": "salsa", "description": "njknfjfbkjkbd"}],
          "upcoming_sessions": []
        }, {
          "id": "sess_002",
          "week_day": "Monday",
          "session_date": "2019-11-16",
          "start_time": "2019-11-16T15:09:32Z",
          "end_time": "2019-11-16T17:09:57Z",
          "session_duraton": "2.00",
          "session_path": "''''",
          "current_specialization_type": "salsa",
          "instructor_username": "niccolo",
          "expertise_specification": null,
          "expertise_types": [{
            "specialization_type": "Yoga",
            "description": "hjdjjbdbddbjhbcc jcbjhxbhjx"
          }, {"specialization_type": "salsa", "description": "njknfjfbkjkbd"}],
          "upcoming_sessions": []
        }, {
          "id": "sess_003",
          "week_day": "wednesday",
          "session_date": "2019-11-16",
          "start_time": "2019-11-16T18:12:03Z",
          "end_time": "2019-11-16T21:12:10Z",
          "session_duraton": "3.00",
          "session_path": "''''",
          "current_specialization_type": "Yoga",
          "instructor_username": "niccolo",
          "expertise_specification": null,
          "expertise_types": [{
            "specialization_type": "Yoga",
            "description": "hjdjjbdbddbjhbcc jcbjhxbhjx"
          }, {"specialization_type": "salsa", "description": "njknfjfbkjkbd"}],
          "upcoming_sessions": [{
            "id": "sess_004",
            "week_day": "Friday",
            "session_date": "2019-11-16",
            "start_time": "2019-11-17T14:15:47Z",
            "end_time": "2019-11-17T16:15:53Z",
            "session_duraton": "2.00",
            "session_path": "''''",
            "current_specialization_type": "salsa"
          }]
        }]
      };
      if (data && data.sessions.length) {
        this.setState({sessions: res && res.sessions.length ? res.sessions.length : data.sessions})
      }
    }).catch(err => {
      console.log(err);
      const data = {
        "sessions": [{
          "id": "sess_001",
          "week_day": "wednesday",
          "session_date": "2019-11-16",
          "start_time": "2019-11-16T14:07:26Z",
          "end_time": "2019-11-16T16:07:31Z",
          "session_duraton": "2.00",
          "session_path": "''",
          "current_specialization_type": "Yoga",
          "instructor_username": "niccolo",
          "expertise_specification": null,
          "expertise_types": [{
            "specialization_type": "Yoga",
            "description": "hjdjjbdbddbjhbcc jcbjhxbhjx"
          }, {"specialization_type": "salsa", "description": "njknfjfbkjkbd"}],
          "upcoming_sessions": []
        }, {
          "id": "sess_002",
          "week_day": "Monday",
          "session_date": "2019-11-16",
          "start_time": "2019-11-16T15:09:32Z",
          "end_time": "2019-11-16T17:09:57Z",
          "session_duraton": "2.00",
          "session_path": "''''",
          "current_specialization_type": "salsa",
          "instructor_username": "niccolo",
          "expertise_specification": null,
          "expertise_types": [{
            "specialization_type": "Yoga",
            "description": "hjdjjbdbddbjhbcc jcbjhxbhjx"
          }, {"specialization_type": "salsa", "description": "njknfjfbkjkbd"}],
          "upcoming_sessions": []
        }, {
          "id": "sess_003",
          "week_day": "wednesday",
          "session_date": "2019-11-16",
          "start_time": "2019-11-16T18:12:03Z",
          "end_time": "2019-11-16T21:12:10Z",
          "session_duraton": "3.00",
          "session_path": "''''",
          "current_specialization_type": "Yoga",
          "instructor_username": "niccolo",
          "expertise_specification": null,
          "expertise_types": [{
            "specialization_type": "Yoga",
            "description": "hjdjjbdbddbjhbcc jcbjhxbhjx"
          }, {"specialization_type": "salsa", "description": "njknfjfbkjkbd"}],
          "upcoming_sessions": [{
            "id": "sess_004",
            "week_day": "Friday",
            "session_date": "2019-11-16",
            "start_time": "2019-11-17T14:15:47Z",
            "end_time": "2019-11-17T16:15:53Z",
            "session_duraton": "2.00",
            "session_path": "''''",
            "current_specialization_type": "salsa"
          }]
        }]
      };
      if (data && data.sessions.length) {
        this.setState({sessions: data.sessions})
      }
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
      const data = {
        "statistics": {
          "session_accuracy": 85.78,
          "session_completed": 5,
          "total_hours": 11.8,
          "rewards": {
            "sessions_completed": 18,
            "remaining_sessions": 2
          },
          "community_percentage": 10
        }
      };
      if (data && data.statistics && data.statistics.community_percentage) {
        this.setState({stats: data.statistics});
      }
    }).catch(err => {
      console.log(err);
      const data = {
        "statistics": {
          "session_accuracy": 85.78,
          "session_completed": 5,
          "total_hours": 11.8,
          "rewards": {
            "sessions_completed": 100,
            "remaining_sessions": 50
          },
          "community_percentage": 10
        }
      };
      if (data && data.statistics && data.statistics.community_percentage) {
        this.setState({stats: data.statistics});
      }
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
      const data = {
        "instructors_details": [
          {
            "first_name": "Niccolo",
            "last_name": "antinucci",
            "username": "niccolo",
            "profile_image": null
          },
          {
            "first_name": "Niccolo",
            "last_name": "antinucci",
            "username": "niccolo",
            "profile_image": null
          }
        ]
      };
      if (data && data.instructors_details.length) {
        this.setState({instructorList: data.instructors_details})
      }
    }).catch(err => {
      console.log(err);
      const data = {
        "instructors_details": [
          {
            "first_name": "Niccolo",
            "last_name": "antinucci",
            "username": "niccolo",
            "profile_image": null
          },
          {
            "first_name": "Niccolo",
            "last_name": "antinucci",
            "username": "niccolo",
            "profile_image": null
          }
        ]
      };
      if (data && data.instructors_details.length) {
        this.setState({instructorList: data.instructors_details})
      }
    })
  };


  async componentDidMount() {
    try {
      Dashboard.userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      this.getSessions();
      this.getHomeStats();
      this.getInstructors();

    } catch (error) {
      console.log(error);
    }
  }

  handelLogout = () => {
    this.props.onLogOut();
  };


  render() {
    return (
      <div>
        <div className="db-body">
          <header className="top-header">
            <div className="logo">
              <img src={logoicon} alt="logo"/>
            </div>
            <div className="search-wrapper">
              <div className="input-group">
                <input type="text" className="form-control" aria-describedby="basic-addon1"/>
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"/></span>
                </div>
              </div>
            </div>
            <div className="user-setting">
              <div className="setting">
                <div className="user-name">{Dashboard.userInfo.full_name || 'User'}</div>
                <div className="user-avatar">
                </div>
                <div className="user-name nav-link" onClick={this.handelLogout}>LogOut</div>

              </div>
            </div>
          </header>
          <div className="scroll-db">
            <section className="main-container">
              <nav className="navbar navbar-expand-lg db-nav">
                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <a className="nav-link nav-ex-btn" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Session</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">My Status</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link " href="#">Rewards</a>
                    </li>
                  </ul>
                </div>
              </nav>
              <section className="session mt-50">
                <div className="section-heading">Session</div>
                <div className="session-container">
                  {this.state.sessions.length === 0 ? <p className="section-heading">No Session available</p> : ''}

                  {this.state.sessions.map((item) =>
                    <div className="box">
                      <div className="box-img">
                        <img src={defaultImg} alt="logo"/>
                      </div>
                      <div className="box-content">
                        <h4>{item.current_specialization_type}</h4>
                        <p>{item.instructor_username}</p>
                        <div className="text-center">
                          <button type="button" className="btn global-btn">Play</button>
                          <button type="button" className="btn global-btn borderd tiny-btn">Remind me</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
              <section className="session stats mt-50 nested-elem">
                <div className="section-heading">Stats</div>
                <div className="session-container">
                  <div className="box text-center active-box">
                    <h4>Top {this.state.stats.community_percentage}%</h4>
                    <p>Within the fitness community</p>
                  </div>
                  <div className="box text-center">
                    <i className="fa fa-bullseye"/>
                    <h4>{this.state.stats.session_accuracy}%</h4>
                    <p>Average Accuracy</p>
                  </div>
                  <div className="box text-center">
                    <i className="fa fa-bullseye"/>
                    <h4>{this.state.stats.total_hours}hr</h4>
                    <p>Total time spent</p>
                  </div>
                  <div className="box text-center">
                    <i className="fa fa-bullseye"/>
                    <h4>{this.state.stats.session_completed}</h4>
                    <p>Number of sessions completed</p>
                  </div>
                </div>
              </section>
              <section className="session stats mt-50 nested-elem Rewards">
                <div className="section-heading">Rewards</div>
                <div className="session-container">
                  <div className="box">
                    {this.state.stats && this.state.stats.rewards && this.state.stats.rewards.sessions_completed ?
                      <div>
                        <h4>{this.state.stats.rewards.sessions_completed} SESSIONS COMPLETED</h4>
                        < p
                          className="text-right"> {this.state.stats.rewards.remaining_sessions} of {this.state.stats.rewards.sessions_completed}</p>
                        <div className="progress" style={{borderRadius: '25px', margin: '6px 0px'}}>
                          <div className="progress-bar custome-progress" role="progressbar"
                               style={{width: (Math.round((this.state.stats.rewards.remaining_sessions / this.state.stats.rewards.sessions_completed) * 100)) + '%'}}
                               aria-valuenow={Math.round((this.state.stats.rewards.remaining_sessions / this.state.stats.rewards.sessions_completed) * 100)}
                               aria-valuemin={0} aria-valuemax={100}/>
                        </div>
                        <p>{this.state.stats.rewards.remaining_sessions} Sessions to unlock the next reward</p>
                      </div>
                      : <p>No information available </p>}
                  </div>
                </div>
              </section>
              <section className="session mt-50 instructor" style={{float: 'left'}}>
                <div className="section-heading">Instructor</div>
                <div className="session-container" style={{flexWrap: 'wrap'}}>
                  {this.state.instructorList.length === 0 ? <p className="section-heading">No Instructor available</p> : ''}

                  {this.state.instructorList.map(o =>
                    <div className="box">
                      <img src={defaultImg} alt="logo"/>
                      <div className="parallex"> {o.first_name + ' ' + o.last_name}   </div>
                    </div>
                  )}
                </div>
              </section>
            </section>
          </div>

        </div>
      </div>
    )
  }
}

export default Dashboard
