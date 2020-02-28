import React from 'react';
import './App.css';

import logoDummy from './assests/logo.png';
import logoicon from './assests/logo-1.jpg';
import landingImgYoga from './assests/yoga-for-strength-jumbo.jpg';
import landingImgFlex from './assests/yogaflex.jpg';
import landingImgSquat from './assests/air-squat-josh-bridges1.jpg';
import landingImgWorkouts from './assests/best-pilates-youtube-workouts-2__medium_4x3.jpg';
import landingImgBigWorkouts from './assests/best-pilates-youtube-workouts-2__big_4x3.jpg';
import landingImgGymInstructor from './assests/Gym-Instructor.jpg';
import landingImgYogoForEveryone from './assests/yoga-for-everyone_promo-superJumbo_bis.jpg';

import logoLinkedin from './assests/1024px-LinkedIn_Logo 1.jpg';
import logoFacebook from './assests/facebook_logos_PNG19749 1.jpg';
import logoInstagram from './assests/instagram-logo-text-blue-png 1.jpg';
import logoTwitter from './assests/twitter-logo 1.jpg';

import lottie from 'lottie-web';
import animationData  from './lottie/9236-right-arrow.json';

import {GoogleLogin} from 'react-google-login';
import {Player} from 'video-react';
import {LOCAL_STORAGE_KEY, LOGIN_URL, SIGN_UP_URL} from "./common/urlconstants";

// Importing ml5.js as ml5

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      loginError: '',
      isSignedIn: false,
      showlogin: true,
      email: 'nishant.kora@gmail.com',
      fName: '',
      pwd: 'admin123',
      cPwd: '',
      signUpPage: 0,
      gender: 'M',
      activity: ['Yoga'],
      when: 'Morning',
      height: '',
      weight: '',
      loginStatus: false,
      loginInfo: '',
      signUpType: 'normal',
      media_type: '',
      media_id: '',
      animObj: null
    };
  }

  getInitialState() {
    console.log('>> getInitialState');
  }

  componentDidMount() {
    window.analytics.page('Home');
    console.log('>> componentDidMount', localStorage.getItem(LOCAL_STORAGE_KEY));

    // once the component has mount, start the classification
    // this.classifyImg();`
    const l = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (l && JSON.parse(l) && JSON.parse(l).user_id) {
      this.setState({loginInfo: JSON.parse(l)});
      this.setState({loginStatus: true});
    } else {
      this.setState({loginStatus: false});
    }

    //call the loadAnimation to start the animation
    this.animObj = lottie.loadAnimation({
      container: this.animBox, // the dom element that will contain the animation
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      animationData: animationData // the path to the animation json
    });
  }

  responseFacebook = (res) => {
    console.log(res);
  };

  responseGoogle = (res) => {
    console.log(res);
    this.setState({signUpPage: this.state.signUpPage + 1});
    // googleId
    // profileObj:
    // email: "syedikramali37@gmail.com"
    // familyName: "Ali"
    // givenName: "Syed"
    // googleId: "108445140110460176851"
    // imageUrl: "https://lh5.googleusercontent.com/-JtryMtxOPxg/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfNgJEEvNBsHgnKVxUG5nm1y8YLRw/s96-c/photo.jpg"
    // name: "Syed Ali"
    this.setState({
      media_id: res.googleId,
      media_type: 'Google',
      fName: res.profileObj.name,
      email: res.profileObj.email,
      signup_type: 'socialmedia'
    })
    // if (res && res.googleId) {
    //   fetch('http://smarthomeupdates.org/user/create/api', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       'full_name': res.profileObj.name,
    //       'user_name': res.profileObj.email,
    //       'user_type': 'user',
    //       // 'signup_type': 'socialmedia',
    //       // 'social_media_type': 'google',
    //       'social_media_id': res.profileObj.googleId,
    //       'timezone': '',
    //       "dob": "00-00-0000",
    //       "gender": this.state.gender,
    //       "height": this.state.height,
    //       "weight": this.state.weight,
    //       "activities": this.state.activity,
    //       "time_periods": this.state.when,
    //       'email': res.profileObj.email
    //     }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8"
    //     }
    //   }).then(response => response.json()).then(json => {
    //     console.log(json)
    //   })
    // }

  };

  register = () => {
    this.setState({error: ''});

    if (this.state.activity.length === 0) {
      this.setState({error: 'Please select at least 1 activity'});
      return;
    }
    console.log(this.state);

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
          "dob": "01-01-1991",
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
      console.log(' >>>> SIGN UP ', res);
      if (res.status === "User Email Already exists") {

        this.next();
        this.setState({error: 'User Email Already exists'});
      } else if (res.status === "User Created Successfully") {
        this.next();
        this.setState({loginInfo: res});
        this.setState({loginStatus: true});
        // {"status":"User Created Successfully","full_name":"test001","email":"test001@gmail.com","user_id":"usr_019","user_type":"user"}
        // this.setState({ success: 'You have successfully registered, please login now' });

        // setTimeout(() => {
        //   window.$('#myModal-signup').modal('toggle');
        //   window.$('#myModal-signin').modal('toggle');

        // }, 2000)
      }
    })

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
        console.log('Login response with social media', res);
        // res.user_exist = false;
        if (res.user_exist) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res));
          this.setState({loginInfo: res});
          this.setState({loginStatus: true});
          window.$('#myModal-signin').modal('toggle');
        } else {
          this.setState({signUpType: 'socialmedia'});
          window.$('#myModal-signin').modal('toggle');
          this.setState({signUpPage: this.state.signUpPage + 1});
          window.$('#myModal-signup').modal('toggle');
        }
        //this.setState({ signUpPage: this.state.signUpPage + 1 });

      })
    }

  };

  logOut = () => {
    console.log('logging out ??');
    localStorage.setItem(LOCAL_STORAGE_KEY, '');
    this.setState({loginInfo: ''});
    this.setState({loginStatus: false});
  };

  logIn = () => {
    console.log(this.state.email);
    console.log(this.state.pwd);
    if (!this.state.email) {
      this.setState({loginError: '* Please enter your required fields'});
      return;
    }
    if (!this.state.pwd) {
      this.setState({loginError: '* Please enter your required fields'});
      return;
    }
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.pwd,
        login_type: "normal",
        user_type: "user"
      }),
      headers: {
        "Content-type": "application/json"
      }
    }).then(response => response.json()).then(res => {
      console.log('LOGIN result', res);
      if (res && res.status === 'User logged in successfully') {
        window.$('#myModal-signin').modal('toggle');
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res));
        // useHistory().push('/dashboard');
        console.log(this.props.history, '>>>>>')
        this.props.history.push('/dashboard');
        // this.setState({loginInfo: res});
        // if (this.state.loginInfo && this.state.loginInfo.user_id) {
        //   this.setState({loginStatus: true});
        // } else {
        //   this.setState({loginStatus: false});
        // }
      } else {
        console.log('Login failed', res);
        this.setState({loginError: 'Invalid credentials'});
      }
    })
  };

  next = () => {
    this.setState({signUpPage: this.state.signUpPage + 1})
  };

  back = () => {
    this.setState({signUpPage: this.state.signUpPage - 1})

  };

  handleGender = (value) => {
    console.log(value);
    this.setState({gender: value.id})

  };

  handleActivity = (e) => {

    const position = this.state.activity.indexOf(e.target.innerHTML);

    if (position > -1) {
      this.state.activity.splice(position, 1);
    } else {
      this.state.activity.push(e.target.innerHTML);
    }
    // this.setState({ activity: e.target.innerHTML })
    console.log(this.state.activity);

    this.setState({activity: this.state.activity});

  };

  handleWhen = (e) => {
    this.setState({when: e.target.innerHTML})
  };

  closeSignUpModel = () => {
    window.$('#myModal-signup').modal('toggle');
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.loginInfo));

    this.props.history.push('/dashboard');

  };

  renderForms() {
    if (this.state.signUpPage === 0) {
      return (
        <div>
          <div className="logo-wrap w-100">
            <img src={logoicon} alt="logo"/>
          </div>
          <div className="modal-heading w-100">
            <h1>sign up</h1>
            <p>Hello! Create your profile and <br/>start excersing now.</p>
          </div>
          {/* <div className="direct-login">
            <div>
              <GoogleLogin
                clientId="471679444708-h8k7t7r9v876gbbea7tsh7s38pkdrlvm.apps.googleusercontent.com"
                buttonText="Signup with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </div> */}
          <GoogleLogin
            clientId={'471679444708-h8k7t7r9v876gbbea7tsh7s38pkdrlvm.apps.googleusercontent.com'}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          >
            {/* <FontAwesomeIcon
              name='google'
            /> */}
            <span> <b> Signup</b> with  <b> Google</b></span>
          </GoogleLogin>
          {/* <div className="direct-login mt-10">

                        <FacebookLogin className='btn-facebook'
                            appId="402726783740842"
                            autoLoad={true}
                            textButton='Signup with Facebook'
                            fields="name,email,picture"
                            onClick={this.responseFacebook}
                            callback={this.responseFacebook}
                        />
                    </div> */}
          <form className="form">
            <div className="row">
              <div className="col-4 offset-4">
                {/* <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" value={this.state.fName ? this.state.fName : ''}
                    onChange={event => this.setState({ fName: event.target.value })}
                    className="form-control modal-form-input" />
                </div> */}
                <div className="form-group">
                  <label htmlFor="weight">Email</label>
                  <input type="email" value={this.state.email ? this.state.email : ''}
                         onChange={event => this.setState({
                           email: event.target.value,
                           fName: event.target.value.substring(0, event.target.value.lastIndexOf("@"))
                         })}
                         className="form-control modal-form-input"/>
                </div>
                <div className="form-group input-group">
                  <label htmlFor="password">Password</label>
                  <input type="password"
                         value={this.state.pwd ? this.state.pwd : ''}
                         onChange={event => this.setState({pwd: event.target.value})}
                         className="form-control modal-form-input"/>
                  <div className="input-group-append">
                    <i className="fa fa-check" aria-hidden="true"/>
                  </div>
                </div>
                {/* <div className="input-group form-group">
                  <label htmlFor="password">Repeat Password</label>
                  <input type="password"
                    value={this.state.cPwd ? this.state.cPwd : ''}
                    onChange={event => this.setState({ cPwd: event.target.value })}
                    className="form-control modal-form-input" />
                  <div className="input-group-append">
                    <i className="fa fa-check" aria-hidden="true" />
                  </div>
                </div> */}
                <div className="text-center" onClick={this.next}>
                  <button type="button" className="btn global-btn">Next</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );


    } else if (this.state.signUpPage === 1) {
      console.log(this.state);
      var active = 'btn btn-form global-btn ml-5px ';
      var inActive = 'btn btn-form global-btn borderd ml-5px';
      return (
        <div>
          <div className="logo-wrap w-100">
            <img src={logoicon} alt="logo"/>
          </div>
          <div className="modal-heading w-100">
            <h1>{this.state.signUpType === 'normal' ? 'sign up' : ''}</h1>
            <p>Tell us about your self</p>
          </div>
          <form className="form">
            <div className="row">
              <div className="col-4 offset-2 border-r-1px">
                <div className="form-group">
                  <label htmlFor="gender">Gender <span className="warning-color"> *</span> </label>
                  <button type="button" className={this.state.gender === 'M' ? active : inActive}
                          onClick={this.handleGender.bind(null, {id: 'M'})}>Male
                  </button>
                  <button type="button" className={this.state.gender === 'F' ? active : inActive}
                          onClick={this.handleGender.bind(null, {id: 'F'})}>Female
                  </button>
                  <button type="button" className={this.state.gender === 'NON-B' ? active : inActive}
                          onClick={this.handleGender.bind(null, {id: 'NON-B'})}>Non-binary
                  </button>
                  <button type="button" className={this.state.gender === 'NO-DIS' ? active : inActive}
                          onClick={this.handleGender.bind(null, {id: 'NO-DIS'})}>I prefer not to disclose
                  </button>
                </div>
                <div className="form-group">
                  <label htmlFor="Height">Height</label>
                  <input type="number" value={this.state.height ? this.state.height : ''}
                         onChange={event => this.setState({height: event.target.value})}
                         className="form-control modal-form-input"/>
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Weight</label>
                  <input type="number" value={this.state.weight ? this.state.weight : ''}
                         onChange={event => this.setState({weight: event.target.value})}
                         className="form-control modal-form-input"/>
                </div>
              </div>
              <div className="col-5">
                <div className="form-group">
                  <label htmlFor="Activities">What Activities do you prefer?</label>

                  <button type="button" onClick={this.handleActivity}
                          className={(this.state.activity.indexOf('Yoga') > -1) ? active : inActive}>Yoga
                  </button>
                  <button type="button" onClick={this.handleActivity}
                          className={(this.state.activity.indexOf('Pilates') > -1) ? active : inActive}>Pilates
                  </button>
                  <button type="button" onClick={this.handleActivity}
                          className={(this.state.activity.indexOf('Tai Chi') > -1) ? active : inActive}>Tai Chi
                  </button>
                  <button type="button" onClick={this.handleActivity}
                          className={(this.state.activity.indexOf('Zumba') > -1) ? active : inActive}>Zumba
                  </button>
                  <button type="button" onClick={this.handleActivity}
                          className={(this.state.activity.indexOf('Weight Lifting') > -1) ? active : inActive}>Weight
                    Lifting
                  </button>
                </div>
                <div className="form-group">
                  <label htmlFor="Activities">When?</label>
                  <button type="button" onClick={this.handleWhen}
                          className={this.state.when === 'Morning' ? active : inActive}>Morning
                  </button>
                  <button type="button" onClick={this.handleWhen}
                          className={this.state.when === 'Noon' ? active : inActive}>Noon
                  </button>
                  <button type="button" onClick={this.handleWhen}
                          className={this.state.when === 'Evening' ? active : inActive}>Evening
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="upload text-center">
                            <i className="fa fa-camera" aria-hidden="true" /><span>Upload your picture</span>
                        </div> */}
            <div className="text-center">
              {/* {unreadMessages.length > 0 &&
                <h2> You have {unreadMessages.length} unread messages.    </h2>
              } */}
              {this.state.signUpType === 'normal' &&
              <button type="button" onClick={this.back} className="btn global-btn">Back</button>
              }
              <button type="button" onClick={this.register} className="btn global-btn ml-5px">
                {this.state.signUpType === 'normal' ? 'Next' : 'Save'}</button>
            </div>
          </form>
        </div>
      );
    } else if (this.state.signUpPage === 3) {
      return (
        <div>
          <div className="logo-wrap w-100">
            <img src={logoicon} alt="logo"/>
          </div>
          <div className="modal-heading w-100">
            <h1 className="no-text-transform">You will now warm up with 5 tutorial poses.</h1>
            <h1 className="no-text-transform">Following the instructor for each pose, we will provide you with a live
              performance feedback.</h1>
            <h1> Ready ? </h1>
          </div>
          <div className="modal-inner-content">
            <div className="text-center mt-5">
              {/* <button type="button" className="btn global-btn mr-2">Begin</button> */}
              <button type="button" onClick={this.next} className="btn global-btn">Next</button>
            </div>
          </div>
        </div>
      );
    } else if (this.state.signUpPage === 2) {
      return (

        <div>
          <div className="logo-wrap w-100">
            <img src={logoicon} alt="logo"/>
          </div>
          <div className="modal-heading w-100">
            <h1 className="no-text-transform">Now follow us...</h1>
            <h1 className="no-text-transform">
              Place your device in a place<br/>
              where your entire body can<br/>
              fit in the screen
            </h1>
            <h1 className="no-text-transform">
              Then follow<br/>
              the instructor
            </h1>
          </div>
          <div className="modal-inner-content">
            <div className="text-center mt-5">
              <button type="button" onClick={this.next} className="btn global-btn">Next</button>
            </div>
          </div>
        </div>
      )
    } else if (this.state.signUpPage === 4) {
      return (
        <div className="text-center mt-5">

          <Player
            playsInline
            poster={logoDummy}
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />

          {/* <button type="button" className="btn global-btn mr-2">Begin</button> */}
          <button type="button" onClick={this.closeSignUpModel} className="btn global-btn mt-5px">Exit</button>
        </div>
      )
    }
  }

  showWebCam = () => {
    this.setState({showlogin: !this.state.showlogin});
  };

  hideWebcam = () => {
    this.setState({showlogin: false});
  };

  openSignUpModel = () => {
    window.analytics.page('Signup');
    this.setState({signUpPage: 0, error: '', success: ''});

  };

  openSignInModel = () => {
    window.analytics.page('Login');
    this.setState({error: '', success: ''});
  };

  render() {
    // const {showlogin} = this.state;
    const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(userInfo);
    const isUserLogIn = !!userInfo;
    if (userInfo)
      this.props.history.push('/dashboard');

    // Testing new version
    return (
      <div>
        <div>
          <section>
            <header className="nav-topMenu">
              <nav className="navbar navbar-expand-lg">
              <div class="square"></div> <span className="spanheadertxt">Motus</span>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="#" data-toggle="modal" data-target="#myModal">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" data-toggle="modal" data-target="#myModal-2">How It Works</a>
                  </li>

                  {this.state.loginStatus ?
                    <li className="nav-item">
                      <button type="button" onClick={this.logOut} className="nav-link disabled" class="explorebtn"><strong>Logout</strong></button>
                    </li>
                    :
                    <li className="nav-item">
                      <button type="button" onClick={this.openSignInModel}  className="nav-link" class="explorebtn"><strong>SIGN IN</strong></button>
                    </li>
                  }
                </ul>
              </div>
            </nav>
            </header>
          </section>

          {/* The Modal SIGN UP MAIN  */}
          <div className="modal fade my-modal" id="myModal-signup">
            <div className="modal-dialog ">
              <div className="modal-content scroll">
                {this.state.signUpPage === 0 ?
                  <button type="button" className="close" data-dismiss="modal">×</button> : ''
                }
                <div className="modal-body">
                  <div className="inner-body">
                    <div className="modal-inner-content">
                      <p className="warning-color">{this.state.error ? this.state.error : ''}</p>
                      <p className="warning-success">{this.state.success ? this.state.success : ''}</p>

                      {this.renderForms()}

                    </div>
                  </div>
                  {/* <div className="modal-footer">
                                    <p>Help?</p>
                                </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* The Modal SIGN IN login dialog */}
          <div className="modal fade my-modal" id="myModal-signin">
            <div className="modal-dialog">
              <div className="modal-content">
                <button type="button" className="close" data-dismiss="modal">×</button>
                <div className="modal-body">
                  <div className="inner-body">
                    <div className="logo-wrap w-100">
                      <img src={logoicon} alt="logo"/>
                    </div>
                    <div className="modal-heading w-100">
                      <h1>SIGN IN</h1>
                      {/* <p>Welcome back</p> */}
                    </div>
                    <div className="direct-login">
                      <GoogleLogin
                        clientId={'471679444708-h8k7t7r9v876gbbea7tsh7s38pkdrlvm.apps.googleusercontent.com'}
                        onSuccess={this.responseGoogleLogin}
                        onFailure={this.responseGoogleLogin}
                      >
                        {/* <FontAwesomeIcon
              name='google'
            /> */}
                        <span> <b> Login</b> with  <b> Google</b></span>
                      </GoogleLogin>
                      {/* <p className="no-margin">or</p>
                    <div><img src={facebook} alt="logo" /></div> */}
                    </div>

                    <div className="modal-inner-content">
                      <form className="form">
                        <p
                          className="md-login-err warning-color">{this.state.loginError ? this.state.loginError : ''}</p>

                        <div className="row">
                          <div className="col-4 offset-4">

                            <div className="form-group">
                              <label htmlFor="weight">User Name</label>
                              <input type="email" value={this.state.email ? this.state.email : ''}
                                     onChange={event => this.setState({email: event.target.value})}
                                     className="form-control modal-form-input"/>
                            </div>
                            <div className="form-group input-group">
                              <label htmlFor="password">Password</label>
                              <input type="password"
                                     value={this.state.pwd ? this.state.pwd : ''}
                                     onChange={event => this.setState({pwd: event.target.value})}
                                     className="form-control modal-form-input"/>
                              {/* <div className="input-group-append">
                              <i className="fa fa-check" aria-hidden="true" />
                            </div> */}
                            </div>

                            <div className="text-center">
                              <button type="button"
                                      onClick={this.logIn}
                                      className="btn global-btn">Sign In
                              </button>
                            </div>

                            <div className="text-center">
                              <p>Forgot password? <span className="blue-color">Click here </span></p>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="bannerLanding">
            <div class="container">
              <div class="row">
                <div class="col-sm-6">
                  <h2 class="section_title mt-0">Motus</h2>
                  <br></br>
                  <hr className="underliningMotus"></hr>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>

                  <div className="bannertxt">
                    <p class="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  <br></br>
                  <br></br>

                  <div>
                    <div className="animBox" ref={ ref => this.animBox = ref}></div>
                  </div>
                </div>

                <div class="col-sm-6 containeryogaImg">
                  <img src={landingImgYogoForEveryone}/>
                  <div className="expYogatxt"><h2 class="mt-0">Experience Yoga</h2></div>
                  <div className="yogardmtxt"><p class="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p></div>
                  <br></br>
                  <br></br>
                  <button className="expYogabtn" onClick={this.openSignUpModel}>Start your first session</button>
                </div>
              </div>
            </div>
          </section>
          <section className="socialsec">
            <br></br>
              <div className="container">
                <div class="row">
                  <div class="col"><a className="nav-link" target="_blank" href="https://www.linkedin.com/"><img src={logoLinkedin}/></a></div>
                  <div class="col"><a className="nav-link" target="_blank" href="https://www.facebook.com"><img src={logoFacebook}/></a></div>
                  <div class="col"><a className="nav-link" target="_blank" href="https://www.instagram.com"><img src={logoInstagram}/></a></div>
                  <div class="col"><a className="nav-link" target="_blank" href="https://www.twitter.com"><img src={logoTwitter}/></a></div>
                </div>
              </div>
            <br></br>
          </section>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <section className="yoga">
            <div class="container">
              <div class="row">
                <div class="col-sm-6">
                  <img src={landingImgYoga}/>
                </div>
                <div class="col-sm-6 text-left">
                  <h2 class="section_title mt-0">Yoga</h2>
                  <br></br>
                  <br></br>

                  <div><p class="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p></div>
                  <button onClick={this.openSignUpModel} class="explorebtn">Explore</button>
                  <hr class="divider my-4"></hr>
                </div>
              </div>
            </div>
          </section>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <section className="livefeedback">
            <div class="container">
              <div class="row">
                <div class="col-sm-6 livefeedbackline">
                  <h2 class="section_title mt-0">Live</h2><br></br>
                  <h2 class="section_title mt-0">Feedback</h2>
                  <br></br>
                  <br></br>
                  <p class="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                  <button onClick={this.openSignUpModel} class="explorebtn">Explore</button>
                </div>
                <div class="col-6 ml-auto text-left mb-5 mb-lg-0">
                  <img src={landingImgFlex}/>
                </div>
              </div>
            </div>
          </section>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <section className="instructors">
            <div class="container">
              <div class="row">
                <div class="col-sm-6">
                  <img src={landingImgSquat}/>
                </div>
                <div class="col-sm-6">
                  <h2 class="section_title">Instructors</h2>
                  <br></br>
                  <br></br>
                  <p class="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                  <button onClick={this.openSignUpModel} class="explorebtn">Explore</button>
                  <br></br>
                  <br></br>
                  <br></br>
                  <div class="row">
                    <div class="col-7 ml-auto">
                      <img src={landingImgWorkouts}/>
                      <p class="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                    </div>
                    <div class="col-5 ml-auto text-left mb-5 mb-lg-0">
                      <img src={landingImgGymInstructor}/>
                      <p class="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <section className="sessions">
            <div class="container">
              <div class="row">
                <div class="col-6">
                  <h2 class="section_title mt-0">Sessions</h2>
                  <br></br>
                  <br></br>
                  <br></br>

                  <p class="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                  <button onClick={this.openSignUpModel} class="explorebtn">Explore</button>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
                <div class="col-6 ml-auto text-center mb-5 mb-lg-0">
                  <img src={landingImgBigWorkouts}/>
                </div>
              </div>
            </div>
          </section>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <section class="page-footer">
            <footer>
              <div class="container text-center text-md-left">
                <div class="row text-center text-md-left mt-3 pb-3">
                  <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h3 class="section_title_footer">Motus</h3>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                  </div>
                  <hr class="clearfix w-100 d-md-none pb-3"></hr>
                  <div class="col-md-2 mb-md-0 mb-3">
                    <h5 class="text-uppercase">Company</h5>
                    <ul class="list-unstyled">
                      <li>
                        <a>About</a>
                      </li>
                      <li>
                        <a>Technology</a>
                      </li>
                      <li>
                        <a>Careers</a>
                      </li>
                      <li>
                        <a>Partners</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-2 mb-md-0 mb-3">
                    <h5 class="text-uppercase">Subscription</h5>
                    <ul class="list-unstyled">
                      <li>
                        <a>Pricing </a>
                      </li>
                      <li>
                        <a>Activities</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-2 mb-md-0 mb-3">
                    <h5 class="text-uppercase">Support</h5>
                    <ul class="list-unstyled">
                      <li>
                        <a>FAQ</a>
                      </li>
                      <li>
                        <a>Help</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-2 mb-md-0 mb-3">
                    <h5 class="text-uppercase">Contacts</h5>
                    <ul class="list-unstyled">
                      <li>
                        <a>blabla@blabla.com</a>
                      </li>
                      <li>
                        <a>Facebook</a>
                      </li>
                      <li>
                        <a>LinkedIn</a>
                      </li>
                      <li>
                        <a>Instagram</a>
                      </li>
                      <li>
                        <a>Twitter</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </section>
        </div>
      </div>
    );
    // Testing new Version
  }
}

export default App;
