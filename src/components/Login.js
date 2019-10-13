import { drawKeyPoints, drawSkeleton } from './utils'
import React, { Component } from 'react'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errMsg: 'Loading...please be patient...'
        }
    }

    myClick = () => {
        this.props.parentClick();
    }

    render() {
        const { errMsg, color } = this.state;
        return (
            <div className="container">
                <div className="row centered-form">
                    <div className="col-xs-12 col-sm-6 col-md-8  col-lg-8 col-xl-8">
                    <img src="https://im3.ezgif.com/tmp/ezgif-3-5c58cf32e43c.gif" />
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div className="borderblack">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="mgtopbottom-0">Get Started Now</h3>
                                </div>
                                <div className="panel-body">
                                    <form role="form">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text" name="first_name" id="first_name" className="form-control input-sm" placeholder="First Name" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <input type="text" name="last_name" id="last_name" className="form-control input-sm" placeholder="Last Name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" name="email" id="email" className="form-control input-sm" placeholder="Email Address" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="email" id="email" className="form-control input-sm" placeholder="Username" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" name="email" id="email" className="form-control input-sm" placeholder="password" />
                                        </div>
                                        <form className="form-inline my-2 my-lg-0">
                                            <button className="btn btn-primary center" type="submit">Submit</button>
                                        </form>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <br />
                        <form className="form-inline my-2 my-lg-0">
                            <button className="btn btn-danger center" type="submit">Instructor Login Here</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
