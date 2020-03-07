import React, {Component} from 'react'
import '../App.scss';
import {Button} from '@progress/kendo-react-buttons';
import {Ripple} from '@progress/kendo-react-ripple';
import avatarImg from '../assests/Amuro_ray_0093_3799 2.png';
import rankingIcon from '../assests/base_ranking_icon.png';
import oneIcon from '../assests/one_icon.png';
import secondIcon from '../assests/two_icon.png';
import thirdIcon from '../assests/three_icon.png';

import {PerformanceChartContainer} from './PerformanceChartContainer';
import {panelBarData} from '../appData';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {getHomeStatsURL, getSessionURL, LOCAL_STORAGE_KEY} from "../common/urlconstants";
import {segmentIdentity} from "./utils";
import CommonHeader from "./CommonHeader";
const imageUrl = (imageName) => ('../assests/' + imageName + '.jpg');

class MyStats extends Component {
  static userInfo = '';
  static defaultProps = {
    loadingText: 'Loading...please be patient...'
  };
  stats = ["X-Small", "Small", "Medium"];

  constructor(props) {
    super(props)
    this.state = {
      percentage: 0,
      sessions: [],
      stats: {},
      errMsg: 'Loading...please be patient...'
    }
    const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(userInfo);
    if (!userInfo)
      this.props.history.push('/login');
  }

  getSessions = () => {
    console.log(MyStats.userInfo);
    fetch(getSessionURL(MyStats.userInfo.email), {
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
    console.log(MyStats.userInfo);
    fetch(getHomeStatsURL(MyStats.userInfo.email), {
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

  async componentDidMount() {
    try {
      MyStats.userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      segmentIdentity(MyStats.userInfo);
      window.analytics.page('mystats');
      this.getSessions();
      this.getHomeStats();
    } catch (error) {
      console.log(error);
    }
  }

  imageFormatterRankPicture(cell, row) {
    if (row != null && row.rank == 1) {
      return (<div className="rankingcontainer">
        <img className="rankingimage" src={rankingIcon}/>
        <div className="rankingmiddle">
          <img src={oneIcon}/>
        </div>
      </div>)
    } else if (row != null && row.rank == 2) {
      return (<div className="rankingcontainer">
        <img className="rankingimage" src={rankingIcon}/>
        <div className="rankingmiddle">
          <img src={secondIcon}/>
        </div>
      </div>)
    } else if (row != null && row.rank == 3) {
      return (<div className="rankingcontainer">
        <img className="rankingimage" src={rankingIcon}/>
        <div className="rankingmiddle">
          <img src={thirdIcon}/>
        </div>
      </div>)
    } else if (row != null && row.rank > 3) {
      return <span style={{color: 'white'}}>{row.rank}</span>
    }
  }

  userNameFormatter(cell, row) {
    return <span style={{color: 'white'}}>{row.name}</span>
  }

  imageFormatterProfilePicture(cell, row) {
    return <img src={avatarImg}/>
  }

  RankFormatter(cell, row) {
    if (row != null && row.rank == 1) {
      return <span style={{color: 'white'}}>1st Place</span>
    } else if (row != null && row.rank == 2) {
      return <span style={{color: 'white'}}>2nd Place</span>
    } else if (row != null && row.rank == 3) {
      return <span style={{color: 'white'}}>3rd Place</span>
    } else if (row != null && row.rank > 3) {
      return <span style={{color: 'white'}}>{row.rank}th Place</span>
    }
  }

  render() {
    return (
      <div id="mystats">
        <Ripple>
          <div className="bootstrap-wrapper">
            <CommonHeader history={this.props.history} value={'mystats'}/>
            <div className="row" style={{height: '30px'}}></div>
            <div className="app-container container">
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                  <h4>Leaderboard</h4>
                  <br></br>
                  {(this.state.stats && this.state.stats.rewards && this.state.stats.rewards.sessions_completed) ?
                    <div>
                      <div>
                        <BootstrapTable tableHeaderClass={"col-hidden"} bordered={false} data={panelBarData}>
                          <TableHeaderColumn dataField='rankPic' dataFormat={this.imageFormatterRankPicture}>
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField='profilePic' dataFormat={this.imageFormatterProfilePicture}>
                          </TableHeaderColumn>
                          <TableHeaderColumn isKey dataField='name' dataFormat={this.userNameFormatter}>
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField='rank' dataFormat={this.RankFormatter}>
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                      <div className="row" style={{height: '30px'}}></div>
                      < div className="text-center mt-1">
                        <Button style={{
                          width: '82px', height: '21px', borderRadius: '20px',
                          background: '#FFFFFF', border: '1px solid #FFFFFF', boxSizing: 'border-box'
                        }} className="com-button">View all</Button>
                      </div>
                    </div>
                    :
                    <p>No information available </p>}
                </div>
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                      <div>
                        <h4>STATS</h4>
                      </div>
                    </div>
                  </div>
                  {this.state.stats && this.state.stats.rewards && this.state.stats.rewards.sessions_completed ?
                    <div>
                      <div className="row" style={{height: '80px'}}></div>
                      <div className="row">
                        <div style={{borderRight: '1px solid #FFFFFF'}}
                             className="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                          <div className="percentage-container">
                            {this.state.stats.session_accuracy > 0 ?
                              <span className="percentage-number">{this.state.stats.session_accuracy}</span>
                              :
                              <span className="percentage-number">94</span>
                            }
                            <span className="percentage-sign">%</span>
                            <p>Average accuracy</p>
                          </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2">
                          <div className="percentage-container">
                            {this.state.stats.total_hours > 0 ?
                              <span className="percentage-number">{this.state.stats.total_hours * 60}</span>
                              :
                              <span className="percentage-number">50</span>
                            }
                            <p>Total minutes spent</p>
                          </div>
                        </div>
                        <div style={{borderLeft: '1px solid #FFFFFF'}}
                             className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <div className="percentage-container">
                            {this.state.stats.session_completed > 0 ?
                              <span className="percentage-number">{this.state.stats.session_completed}</span>
                              :
                              <span className="percentage-number">18</span>
                            }
                            <p>Number of sessions completed</p>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{height: '100px'}}></div>
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                          {this.state.stats.session_completed > 0 ?
                            <span
                              style={{margin: '6px 60px'}}>{this.state.stats.session_completed} Sessions completed</span>
                            :
                            <span style={{margin: '6px 60px'}}>1 Sessions completed</span>
                          }
                          <br></br>
                          <div className="progress" style={{
                            borderRadius: '0px', transform: 'skew(-20deg)', width: '700px',
                            background: '#555', height: '22px', margin: '6px 60px'
                          }}>
                            <div className="progress-bar custome-progress" role="progressbar"
                                 style={{
                                   width: 20 + '%',
                                   background: '#382CFB',
                                   boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                                 }}
                                 aria-valuenow={2}
                                 aria-valuemin={0} aria-valuemax={100}/>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{height: '100px'}}></div>
                      <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                          <div>
                            <h4>Performance Track</h4>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{height: '50px'}}></div>
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <PerformanceChartContainer/>
                        </div>
                      </div>
                    </div>
                    :
                    <div className="row" style={{height: '475px'}}>
                      <p>No information available </p>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </Ripple>
      </div>
    );
  }
}

export default MyStats
