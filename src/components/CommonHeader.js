import React, {Component} from 'react'
import avatar_img from '../assests/profile_img.png';
import {LOCAL_STORAGE_KEY} from "../common/urlconstants";
import logoicon from '../assests/shadow_logo.png';


class CommonHeader extends Component {
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
      errMsg: 'Loading...please be patient...',
      value:''
    }
  }


  async componentDidMount() {
    try {
      CommonHeader.userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      this.setState({value: this.props.value});


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
    this.props.history.push('/login');

  };
  change = (event) => {
    console.log(event.target.value);
    this.props.history.push('/' + event.target.value);

  };


  render() {
    return (

      <nav className="navbar justify-content-between pd-lr-20">
        <div className="row ">

          <div className="col-6 logo">
            <img src={logoicon} alt="logo"/>
          </div>
          <div className="col-6" style={{marginTop: '25px'}}>
            <div>
              <select className="menu-dropdown" onChange={this.change} value={this.state.value}>
                <option value='dashboard'>Home</option>
                <option value='rewards'>Rewards</option>
                {/*<option value='sessions'>Sessions</option>*/}
              </select>
            </div>
          </div>
        </div>
        <form className="form-inline">
          <div className="search-wrapper">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1"><i className="fa fa-search"/></span>
              </div>
              <input type="text" style={{caretColor:'white'}} className="form-control search-input" aria-describedby="basic-addon1"/>

            </div>
          </div>
          <img onClick={this.handelLogout} src={avatar_img} className="rounded" alt="Motus" width={35} height={35}/>
        </form>
      </nav>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {...})(CommonHeader));
export default CommonHeader
