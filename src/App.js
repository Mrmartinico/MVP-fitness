import React from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from './components/Camera.js';
import Login from './components/Login.js';
import logobg from './assests/Home-bg.jpg';
import logoDummy from './assests/logo.png';
import logoicon from './assests/logo-1.jpg';
import facebook from './assests/facebook.jpg';
import google from './assests/google.jpg';

// Importing ml5.js as ml5
import * as ml5 from "ml5";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showlogin: true,
        }
    }

    componentDidMount() {
        // once the component has mount, start the classification
        // this.classifyImg();
    }

    showWebCam = () => {
        this.setState({ showlogin: !this.state.showlogin });

    }

    hideWebcam = () => {
        this.setState({ showlogin: false });

    }

    render() {
        const { showlogin } = this.state;
        return (
            <div>
                <header className="nav-top">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand">
                            <img src={logoDummy} alt="logo" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#" onClick={this.showWebCam} >Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" data-toggle="modal" data-target="#myModal" >About</a>
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
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#">Account</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                



                {/* The Modal SIGN UP */}
                <div className="modal fade my-modal" id="myModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <div className="modal-body">
                                <div className="inner-body">
                                    <div className="logo-wrap w-100">
                                        <img src="./assests/logo-1.jpg" alt="logo" />
                                    </div>
                                    <div className="modal-heading w-100">
                                        <h1>sign up</h1>
                                        <p>Tell us about your self</p>
                                    </div>
                                    <div className="modal-inner-content">
                                        <form className="form">
                                            <div className="row">
                                                <div className="col-4 offset-2 border-r-1px">
                                                    <div className="form-group">
                                                        <label htmlFor="gender">Gender</label>
                                                        <button type="button" className="btn btn-form global-btn">Male</button>
                                                        <button type="button" className="btn btn-form global-btn borderd">Female</button>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="Height">Height</label>
                                                        <input type="number" className="form-control modal-form-input" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="weight">Weight</label>
                                                        <input type="number" className="form-control modal-form-input" />
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <div className="form-group">
                                                        <label htmlFor="Activities">What Activities do you prefer?</label>
                                                        <button type="button" className="btn btn-form global-btn borderd">Tennis</button>
                                                        <button type="button" className="btn btn-form global-btn borderd">Yoga</button>
                                                        <button type="button" className="btn btn-form global-btn borderd">Soccer</button>
                                                        <button type="button" className="btn btn-form global-btn borderd">Crossfit</button>
                                                        <button type="button" className="btn btn-form global-btn borderd">Pilates</button>
                                                        <button type="button" className="btn btn-form global-btn borderd">Running</button>
                                                        <button type="button" className="btn btn-form global-btn borderd">Box</button>
                                                        <button type="button" className="btn btn-form global-btn borderd">Golf</button>
                                                        <button type="button" className="btn btn-form global-btn borderd">Stretching</button>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="Activities">When?</label>
                                                        <div className="btn-group">
                                                            <button type="button" className="btn btn-form global-btn borderd">Morning</button>
                                                            <button type="button" className="btn btn-form global-btn borderd">Noon</button>
                                                            <button type="button" className="btn btn-form global-btn borderd">Evening</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="upload text-center">
                                                <i className="fa fa-camera" aria-hidden="true" /><span>Upload your picture</span>
                                            </div>
                                            <div className="text-center">
                                                <button type="button" className="btn global-btn">Next</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <p>Help?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Modal SIGN IN */}
                <div className="modal fade my-modal" id="myModal-signin">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <div className="modal-body">
                                <div className="inner-body">
                                    <div className="logo-wrap w-100">
                                        <img src={logoicon} alt="logo" />
                                    </div>
                                    <div className="modal-heading w-100">
                                        <h1>SIGN IN</h1>
                                        <p>Welcome back</p>
                                    </div>
                                    <div className="direct-login">
                                        <div><img src={google} alt="logo" /></div>
                                        <p className="no-margin">or</p>
                                        <div><img src={facebook} alt="logo" /></div>
                                    </div>
                                    <div className="modal-inner-content">
                                        <form className="form">
                                            <div className="row">
                                                <div className="col-4 offset-4">

                                                    <div className="form-group">
                                                        <label htmlFor="weight">Email</label>
                                                        <input type="email" className="form-control modal-form-input" />
                                                    </div>
                                                    <div className="form-group input-group">
                                                        <label htmlFor="password">Password</label>
                                                        <input type="password" className="form-control modal-form-input" />
                                                        <div className="input-group-append">
                                                            <i className="fa fa-check" aria-hidden="true" />
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <button type="button" className="btn global-btn">Sign In</button>
                                                    </div>

                                                    <div className="text-center">
                                                        <p>Forgot password? <span className="blue-color" >Click here </span></p>
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

                {/* The Modal SIGN UP(2) */}
                <div className="modal fade my-modal" id="myModal-signup">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <div className="modal-body">
                                <div className="inner-body">
                                    <div className="logo-wrap w-100">
                                        <img src={logoicon} alt="logo" />
                                    </div>
                                    <div className="modal-heading w-100">
                                        <h1>sign up</h1>
                                        <p>Hello! Create your profile and <br />start excersing now.</p>
                                    </div>
                                    <div className="direct-login">
                                        <div><img src={google} alt="logo" /></div>
                                        <p className="no-margin">or</p>
                                        <div><img src={facebook} alt="logo" /></div>
                                    </div>
                                    <div className="modal-inner-content">
                                        <form className="form">
                                            <div className="row">
                                                <div className="col-4 offset-4">
                                                    <div className="form-group">
                                                        <label htmlFor="name">Full Name</label>
                                                        <input type="text" className="form-control modal-form-input" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="weight">Email</label>
                                                        <input type="email" className="form-control modal-form-input" />
                                                    </div>
                                                    <div className="form-group input-group">
                                                        <label htmlFor="password">Password</label>
                                                        <input type="password" className="form-control modal-form-input" />
                                                        <div className="input-group-append">
                                                            <i className="fa fa-check" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                    <div className="input-group form-group">
                                                        <label htmlFor="password">Repeat Password</label>
                                                        <input type="password" className="form-control modal-form-input" />
                                                        <div className="input-group-append">
                                                            <i className="fa fa-check" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="button" className="btn global-btn">Sign Up</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <p>Help?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Modal SIGN UP(2) */}
                <div className="modal fade my-modal" id="myModal-2">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <div className="modal-body">
                                <div className="inner-body center-element">
                                    <div className="logo-wrap w-100">
                                        <img src="./assests/logo-1.jpg" alt="logo" />
                                    </div>
                                    <div className="modal-heading w-100">
                                        <h1 className="no-text-transform">Perfect</h1>
                                        <h1 className="no-text-transform">Ready for your first lession?</h1>
                                    </div>
                                    <div className="modal-inner-content">
                                        <div className="text-center mt-5">
                                            <button type="button" className="btn global-btn mr-2">Begin</button>
                                            <button type="button" className="btn global-btn borderd">Skip</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <p>Help?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Modal SIGN UP(3) */}
                <div className="modal fade my-modal" id="myModal-3">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <div className="modal-body">
                                <div className="inner-body center-element">
                                    <div className="logo-wrap w-100">
                                        <img src="./assests/logo-1.jpg" alt="logo" />
                                    </div>
                                    <div className="modal-heading w-100">
                                        <h1 className="no-text-transform">Now follow us...</h1>
                                        <h1 className="no-text-transform">
                                            Place your device in a place<br />
                                            where your entire body can<br />
                                            fit in the screen
                    </h1>
                                        <h1 className="no-text-transform">
                                            Fit in the silhouette and<br />
                                            follow its movements
                    </h1>
                                    </div>
                                    <div className="modal-inner-content">
                                        <div className="text-center mt-5">
                                            <button type="button" className="btn global-btn">Next</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <p>Help?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showlogin ?
                    // <Login parentClick={this.handleClick} />
                    <section className="banner">
                    <img src={logobg} />
                    <div className="overlay-wrap">
                        <div className="row">
                            <div className="col-6 offset-5">
                                <h1>When AI<br />Meets<br />Fitness</h1>
                                <button type="button" className="btn global-btn" data-toggle="modal" data-target="#myModal-signup">Sign Up</button>
                                <button type="button" className="btn global-btn borderd" data-toggle="modal" data-target="#myModal-signin" >Sign In</button>
                            </div>
                        </div>
                        <div className="social-media">
                            <ul>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#"><i className="fa fa-facebook-square" /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#"><i className="fa fa-instagram" /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#"><i className="fa fa-twitter" /></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#"><i className="fa fa-youtube" /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section> :
                    <Camera />
                }
            </div>
        );
    }
}

export default App;
