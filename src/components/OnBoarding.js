import React, {Component} from 'react'
import logo from '../assests/shadow_logo.png';
import img_sign from '../assests/signup_img_gray.png';
import facebook_img from '../assests/facebook_img.png';
import google_img from '../assests/google_img.png';
import {LOCAL_STORAGE_KEY, LOGIN_URL, SIGN_UP_URL} from "../common/urlconstants";
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {GoogleLogin} from "react-google-login";
import {Player} from "video-react";
import logoDummy from "../assests/logo.png";
import Loader from 'react-loader-spinner'

class OnBoarding extends Component {
  static userInfo = '';
  static defaultProps = {
    loadingText: 'Loading...please be patient...'
  };


  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loginError: '',
      isSignedIn: false,
      showlogin: true,
      email: '',
      fName: '',
      pwd: 'pass@word1',
      cPwd: '',
      page: 0,
      gender: 'M',
      dob: '',
      activity: ['Yoga'],
      when: 'Morning',
      height: '',
      weight: '',
      loginStatus: false,
      loginInfo: '',
      signUpType: 'normal',
      media_type: '',
      media_id: '',
      loading: false
    };
    const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(userInfo);
    const isUserLogIn = !!userInfo;
    if (userInfo)
      this.props.history.push('/dashboard');
  }


  async componentDidMount() {
    try {
      // OnBoarding.userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      window.analytics.page('OnBoarding');

    } catch (error) {
      console.log(error);
    }
  }

  loading = (param) => {
    this.setState({loading: param});
  };


  renderForms = () => {
    if (this.state.page === 4) {
      return (
        <div className="five-poses">
          <h2 className="title">SIGN UP</h2>
          <p className="subtitle">Tutorial instructions</p>
          <p className="p-content">
            You will have to complete<br/>
            5 poses in order to complete<br/>
            thus tutorial.<br/> <br/>
            you will receive live feedback<br/>
            and an overall accuracy<br/>
            at the end<br/> <br/>
            Ready?
          </p>
          <button onClick={this.nextForm} className="btn-calender">NEXT</button>
        </div>
      )
    } else if (this.state.page === 3) {
      return (
        <div className="place-device">
          <h2 className="title">SIGN UP</h2>
          <p className="subtitle">Tutorial instructions</p>
          <p className="p-content">
            Now place your device in a place
            where your entire body
            can fit in the screen
            <br/> <br/>
            Then follow
            the instructor
          </p>
          <button onClick={this.nextForm} className="btn-calender">NEXT</button>
        </div>
      )
    } else if (this.state.page === 2) {
      return (
        <div className="upload-picture">
          <h2 className="title">SIGN UP</h2>
          <p className="subtitle">Tutorial instructions</p>
          <p className="p-content">Upload a picture </p>
          <button className="btn-blue">Take a picture</button>
          <br/>
          <button className="btn-white">Browse</button>
          <br/>
          <button onClick={this.nextForm} className="btn-calender">NEXT</button>
        </div>
      )
    } else if (this.state.page === 1) {
      return (
        <div className="tell-us">
          <h2 className="title">SIGN UP</h2>
          <p className="subtitle">Tell Us about yourself</p>
          <div>
            <div className="row text-left">
              <div className="col-6 ">
                <p className="dob-text">Gender</p>
                <select id="gender" className="select-drop">
                  <option value=""></option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="NON-B">LGBTQ</option>
                  <option value="NO-DIS">Prefer not to disclose</option>
                </select>
                <p className="dob-text mt-36">Height</p>
                <select id="height" className="select-drop">
                  <option value=""></option>
                  <option value="147">4’10” (147 cm)</option>
                  <option value="152">5’0” (152 cm)</option>
                  <option value="155">5’1” (155 cm)</option>
                  <option value="157">5’2” (157 cm)</option>
                  <option value="160">5’3” (160 cm)</option>
                  <option value="162">5’4” (162 cm)</option>
                </select>
              </div>
              <div className="col-6">
                <p className="dob-text"> Date of birth</p>
                <input id="dob" className="date" type="date"/>
                <p className="dob-text mt-36">Weight</p>
                <select id="weight" className="select-drop">
                  <option value=""></option>
                  <option value="88">88 lb (40 kg)</option>
                  <option value="92">92 lb (42 kg)</option>
                  <option value="94">94 lb (43 kg)</option>
                  <option value="97">97 lb (44 kg)</option>
                  <option value="99">99 lb (45 kg)</option>
                  <option value="101">101 lb (46 kg)</option>
                  <option value="103">103 lb (47 kg)</option>
                </select>
              </div>

            </div>
            <div>
              <p className="dob-text text-left mt-36">What activities do you prefer?</p>
              <select id="activities" className="select-drop">
                <option value=""></option>
                <option value="Yoga">Yoga</option>
                <option value="Pilates">Pilates</option>
                <option value="Tai Chi">Tai Chi</option>
                <option value="Zumba">Zumba</option>
                <option value="Weight Lifting">Weight Lifting</option>
              </select>
            </div>
            <div>
              <p className="dob-text text-left mt-36">When?</p>
              <select id="when" className="select-drop">
                <option value=""></option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </div>

          </div>

          <button onClick={this.nextForm} className="btn-calender mt-36">NEXT</button>
        </div>
      )
    }
  };
  nextForm = () => {
    if (this.state.page === 1) {

      const gender = document.getElementById("gender");
      const selectedGender = gender.options[gender.selectedIndex].value;
      const height = document.getElementById("height");
      const selectedHeight = height.options[height.selectedIndex].value;
      const weight = document.getElementById("weight");
      const selectedWeight = weight.options[weight.selectedIndex].value;
      const activities = document.getElementById("activities");
      const selectedActivities = activities.options[activities.selectedIndex].value;
      const when = document.getElementById("when");
      const selectedwhen = when.options[when.selectedIndex].value;
      const dob = document.getElementById("dob");
      const selectedDob = dob.value;
      this.setState({
        when: selectedwhen,
        dob: selectedDob,
        activity: [selectedActivities],
        gender: selectedGender,
        height: selectedHeight,
        weight: selectedWeight
      }, () => {
        console.log(this.state);
      });

      if (!selectedActivities) {
        this.setState({error: 'Please select at least 1 activity'});
        return false;
      }
      this.register();

    } else
      this.setState({page: this.state.page + 1})
  };
  previousForm = () => {
    this.setState({page: this.state.page - 1})
  };

  responseFace = (res) => {
    console.log('facebook response !!!', res);
    // response.authResponse.userID
    if (res && res.googleId) {
      this.loading(true);
      this.setState({email: res.profileObj.email, fName: res.profileObj.name});
      fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({
          "username": res.profileObj.email,
          'full_name': res.profileObj.name,
          "login_type": "social_media",
          "user_type": "user",
          "social_media_type": "Google",
          "social_media_id": res.googleId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json()).then(res => {
        this.loading(false);
        console.log('Login response with social media', res);
        // res.user_exist = false;
        if (res.user_exist) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res));
          this.setState({loginInfo: res});
          this.setState({loginStatus: true});
          this.props.history.push('/dashboard');

        } else {
          this.setState({signUpType: 'socialmedia'});
          this.setState({page: this.state.page + 1});
        }

      }, err => {
        this.loading(false);
      })
    }

  };
  responseGoogleLogin = (res) => {
    console.log(res);
    // googleId
    // profileObj:
    // email: "syedikramali37@gmail.com"
    // familyName: "Ali"
    // givenName: "Syed"
    // googleId: "108445140110460176851"
    // imageUrl: "https://lh5.googleusercontent.com/-JtryMtxOPxg/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfNgJEEvNBsHgnKVxUG5nm1y8YLRw/s96-c/photo.jpg"
    // name: "Syed Ali"
    if (res && res.googleId) {
      this.loading(true);
      this.setState({email: res.profileObj.email, fName: res.profileObj.name});
      fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({
          "username": res.profileObj.email,
          'full_name': res.profileObj.name,
          "login_type": "social_media",
          "user_type": "user",
          "social_media_type": "Google",
          "social_media_id": res.googleId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json()).then(res => {
        this.loading(false);
        console.log('Login response with social media', res);
        // res.user_exist = false;
        if (res.user_exist) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res));
          this.setState({loginInfo: res});
          this.setState({loginStatus: true});
          this.props.history.push('/dashboard');

        } else {
          this.setState({signUpType: 'socialmedia'});
          this.setState({page: this.state.page + 1});
        }

      }, err => {
        this.loading(false);
      })
    }

  };
  register = () => {
    this.setState({error: ''});
    console.log(this.state);
    this.loading(true);
    fetch(SIGN_UP_URL, {
      method: 'POST',
      body: JSON.stringify(
        {
          "full_name": this.state.fName,
          "user_name": this.state.fName,
          "first_name": "",
          "last_name": "",
          "user_type": "user",
          "timezone": "",
          "dob": this.state.dob,
          "email": this.state.email,
          "password": this.state.pwd,
          "re_password": this.state.cPwd,
          "gender": this.state.gender,
          "height": this.state.height,
          "weight": this.state.weight,
          "activities": this.state.activity,
          "time_periods": this.state.when,
          "city": "",
          "street": "",
          "state": "",
          "country": "",
          "zip_code": "",
          "signup_type": this.state.signUpType,
          "telephone": "",
          "social_media_type": this.state.media_type,
          "social_media_id": this.state.media_id

        }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json()).then(res => {
      this.loading(false);

      console.log(' >>>> SIGN UP ', res);
      if (res.status === "User Email Already exists") {
        // this.nextForm();
        this.setState({error: 'User Email Already exists'});
        this.setState({page: 0});
      } else if (res.status === "User Created Successfully") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res));
        this.setState({loginInfo: res, loginStatus: true, page: this.state.page + 1}, () => {
          this.nextForm();
        });
      } else {
        this.setState({error: 'Something went wrong, please try again'});
        this.setState({page: 0});
      }
    }, err => {
      console.log(err);
      this.loading(false);
      this.setState({error: 'Something went wrong, please try again'});
    })

  };

  goToDashboard = () => {
    this.props.history.push('/dashboard');
  };

  render() {

    return (
      <div id="onboard" style={{height: '100%', width: '100%'}}>
        {this.state.page !== 5 ?
          <div>
            <div>
              <div className="row align-items-center">
                <div className="col-6">
                  <img src={logo} width={50} height={50} className="d-inline-block align-top" alt=""/>
                  &nbsp; <span className="header-title">Motus</span>
                </div>
                <div className="col-6">
                  <div className="float-right pr-4">
                    <span className="menu mr-10">About </span>
                    <span className="menu"> How it works</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-content">
              {this.state.loading === true && <Loader type="ThreeDots" color="#somecolor" height={30} width={30}/>
              }
              {this.state.error && <p className="warning-color m-2">{this.state.error ? this.state.error : ''}</p>}

              {this.state.page === 0 ?
                <div className="row ">
                  <div className="col-lg-6 col-sm-6 col-xs-6 align-self-center">
                    <div className="signup_img text-center">
                      <img style={{height: '470px'}} src={img_sign}/>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-6 align-self-center">
                    <div className='signup-content text-center'>
                      <h1>JOIN</h1>
                      <p>Connect your account</p>
                      <div>


                        <GoogleLogin
                          clientId="471679444708-h8k7t7r9v876gbbea7tsh7s38pkdrlvm.apps.googleusercontent.com"
                          render={renderProps => (
                            <img src={google_img} onClick={renderProps.onClick} disabled={renderProps.disabled}/>

                          )}
                          onSuccess={this.responseGoogleLogin}
                          onFailure={this.responseGoogleLogin}
                          cookiePolicy={'single_host_origin'}
                        />
                        <span className="mr-2 ml-2"></span>
                        <FacebookLogin
                          appId="402726783740842"
                          fields="name,email,picture"
                          callback={this.responseFace}
                          render={renderProps => (
                            <img onClick={renderProps.onClick} src={facebook_img}/>
                          )}
                        />
                      </div>

                    </div>
                  </div>
                </div>
                :
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-xs-12 left-side">
                    <div className='left-content'>

                      {this.renderForms()}
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-xs-12 right-side right-bg">
                  </div>
                </div>
              }

            </div>
          </div>
          : <div onClick={() => {
            this.setState({hideicon: true})
          }}>
            <div className="float-btn">
              <button type="button" onClick={this.goToDashboard} className="btn global-btn mt-5px">Exit</button>
              {!this.state.hideicon && <p className="mt-5px">Click on screen to play vedio</p>}
            </div>
            <Player
              playsInline
              poster={logoDummy}
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />

            {/* <button type="button" className="btn global-btn mr-2">Begin</button> */}
          </div>

        }
      </div>
    )
  }


}

export default OnBoarding
