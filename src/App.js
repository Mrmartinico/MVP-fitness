import React from 'react';
import './App.css';

import logobg from './assests/Home-bg.jpg';
import logoDummy from './assests/logo.png';
import logoicon from './assests/logo-1.jpg';

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
      media_id: ''
    };


  }

  getInitialState() {
    console.log('>> getInitialState');
  }

  componentDidMount() {
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
    this.setState({signUpPage: 0, error: '', success: ''});

  };
  openSignInModel = () => {
    this.setState({error: '', success: ''});

  };

  render() {
    // const {showlogin} = this.state;
    const userInfo = localStorage.getItem(LOCAL_STORAGE_KEY);
    console.log(userInfo);
    const isUserLogIn = !!userInfo;
    if (userInfo)
      this.props.history.push('/dashboard');


    return (
      <div>
        <div>
          <header className="nav-top">
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand">
                <img src={logoDummy} alt="logo"/>
              </a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#" onClick={this.showWebCam}>Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" data-toggle="modal" data-target="#myModal">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" data-toggle="modal" data-target="#myModal-2">How It Works</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={this.showWebCam}>Live Session</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">Become a Coach</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">FAQ</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">Contact</a>
                  </li>

                  {this.state.loginStatus ?

                    <li className="nav-item" onClick={this.logOut}>
                      <a className="nav-link disabled" href="#">Logout</a>
                    </li>
                    :
                    <li className="nav-item">
                      <a className="nav-link " href="#">Account</a>
                    </li>
                  }
                </ul>
              </div>
            </nav>
          </header>

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

          <section className="banner">
            <img src={logobg}/>
            <div className="overlay-wrap">
              <div className="row">
                <div className="col-6 offset-5">
                  <h1>When AI<br/>Meets<br/>Fitness</h1>
                  {this.state.loginStatus === false ?
                    <div>
                      <button type="button" className="btn global-btn mr-10" data-toggle="modal"
                              onClick={this.openSignUpModel} data-target="#myModal-signup" data-backdrop="static"
                              data-keyboard="false">Sign Up
                      </button>
                      < button type="button" onClick={this.openSignInModel} className="btn global-btn borderd"
                               data-toggle="modal"
                               data-target="#myModal-signin" data-backdrop="static" data-keyboard="false">Sign In
                      </button>
                    </div>
                    :
                    <div>
                      <h3>Welcome {this.state.loginInfo.full_name}</h3>
                    </div>
                  }
                </div>
              </div>
              <div className="social-media">
                <ul>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#"><i className="fa fa-facebook-square"/></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#"><i className="fa fa-instagram"/></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#"><i className="fa fa-twitter"/></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#"><i className="fa fa-youtube"/></a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }


}

export default App;
