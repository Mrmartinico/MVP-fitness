import React from 'react';
import './App.scss';
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
import animationData from './lottie/9236-right-arrow.json';

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
    window.analytics.page('LandingPage');

    //call the loadAnimation to start the animation
    this.animObj = lottie.loadAnimation({
      container: this.animBox, // the dom element that will contain the animation
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      animationData: animationData // the path to the animation json
    });
  }


  handleWhen = (e) => {
    this.setState({when: e.target.innerHTML})
  };


  openSignUpModel = () => {
    this.props.history.push('/onboard');
  };

  render() {
    // Testing new version
    return (
      <div style={{width: '100%'}}>
        <div id="landingpage">
          <header className="nav-topMenu">
            <nav className="navbar navbar-expand-lg" style={{boxShadow: 'none'}}>
              <div className="square"></div>
              <span className="spanheadertxt">Motus</span>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link nav-text" href="#" data-toggle="modal" data-target="#myModal">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link nav-text" href="#" data-toggle="modal" data-target="#myModal-2">How It
                      Works</a>
                  </li>
                  <li className="nav-item">
                    <button type="button" onClick={this.openSignUpModel} className="nav-link explorebtn">
                      <strong>SIGN IN</strong></button>
                  </li>
                </ul>
              </div>
            </nav>
          </header>


          <section className="bannerLanding">
            <div className="container">
              <div className="row">
                <div className="col-6 col-sm-6">
                  <h2 className="section_title mt-0">Motus</h2>
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
                    <p className="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  <br></br>
                  <br></br>

                  <div>
                    <div className="animBox" ref={ref => this.animBox = ref}></div>
                  </div>
                </div>

                <div className="col-6 col-sm-6 containeryogaImg">
                  <img style={{width: '668px'}} src={landingImgYogoForEveryone}/>
                  <div className="expYogatxt"><h2 className="mt-0">Experience Yoga</h2></div>
                  <div className="yogardmtxt"><p className="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed"</p></div>
                  <br></br>
                  <br></br>
                  <button className="expYogabtn" onClick={this.openSignUpModel}>Start your first session</button>
                </div>
              </div>
            </div>
          </section>
          <section className="socialsec p-2">
            <div className="container ">
              <div className="row">
                <div className="col"><a className="nav-link" target="_blank" href="https://www.linkedin.com/"><img
                  src={logoLinkedin}/></a></div>
                <div className="col"><a className="nav-link" target="_blank" href="https://www.facebook.com"><img
                  src={logoFacebook}/></a></div>
                <div className="col"><a className="nav-link" target="_blank" href="https://www.instagram.com"><img
                  src={logoInstagram}/></a></div>
                <div className="col"><a className="nav-link" target="_blank" href="https://www.twitter.com"><img
                  src={logoTwitter}/></a></div>
              </div>
            </div>
          </section>

          <section className="yoga mt-10per">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <img src={landingImgYoga}/>
                </div>
                <div className="col-sm-6 text-left">


                  <div style={{paddingLeft: '10%'}}>
                    <h2 className="section_title mt-0">Yoga</h2>
                    <br></br>
                    <br></br>
                    <p className="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                    <button onClick={this.openSignUpModel} className="explorebtn">Explore</button>
                  </div>
                  <hr className="divider my-4"></hr>
                </div>
              </div>
            </div>
          </section>


          <section className="livefeedback mt-10per">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 livefeedbackline">
                  <h2 className="section_title mt-0">Live</h2><br></br>
                  <h2 className="section_title mt-0">Feedback</h2>
                  <br></br>
                  <br></br>
                  <p className="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                  <button onClick={this.openSignUpModel} className="explorebtn">Explore</button>
                </div>
                <div className="col-6 ml-auto text-left mb-5 mb-lg-0">
                  <img src={landingImgFlex}/>
                </div>
              </div>
            </div>
          </section>


          <section className="instructors mt-10per">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <img src={landingImgSquat}/>
                </div>
                <div className="col-sm-6">
                  <div style={{paddingLeft: '10%'}}>
                    <h2 className="section_title">Instructors</h2>
                    <br></br>
                    <br></br>
                    <p className="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                    <button onClick={this.openSignUpModel} className="explorebtn">Explore</button>
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
                  <div className="row">
                    <div className="col-7 ml-auto">
                      <img src={landingImgWorkouts}/>
                      <p className="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                    </div>
                    <div className="col-5 ml-auto text-left mb-5 mb-lg-0">
                      <img src={landingImgGymInstructor}/>
                      <p className="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="sessions mt-10per">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h2 className="section_title mt-0">Sessions</h2>
                  <br></br>
                  <br></br>
                  <br></br>

                  <p className="text-muted mb-5">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                  <button onClick={this.openSignUpModel} className="explorebtn">Explore</button>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
                <div className="col-6 ml-auto text-center mb-5 mb-lg-0">
                  <img src={landingImgBigWorkouts}/>
                </div>
              </div>
            </div>
          </section>

          <section className="page-footer">
            <footer>
              <div className="container text-center text-md-left">
                <div className="row text-center text-md-left mt-3 pb-3">
                  <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                    <h3 className="section_title_footer">Motus</h3>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed"</p>
                  </div>
                  <hr className="clearfix w-100 d-md-none pb-3"></hr>
                  <div className="col-md-2 mb-md-0 mb-3">
                    <h5 className="text-uppercase">Company</h5>
                    <ul className="list-unstyled">
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
                  <div className="col-md-2 mb-md-0 mb-3">
                    <h5 className="text-uppercase">Subscription</h5>
                    <ul className="list-unstyled">
                      <li>
                        <a>Pricing </a>
                      </li>
                      <li>
                        <a>Activities</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-2 mb-md-0 mb-3">
                    <h5 className="text-uppercase">Support</h5>
                    <ul className="list-unstyled">
                      <li>
                        <a>FAQ</a>
                      </li>
                      <li>
                        <a>Help</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-2 mb-md-0 mb-3">
                    <h5 className="text-uppercase">Contacts</h5>
                    <ul className="list-unstyled">
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
