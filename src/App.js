import React from 'react';
import logo from './logo.svg';
import './App.css';
import Camera from './components/Camera.js'
import Login from './components/Login.js'

// Importing ml5.js as ml5
import * as ml5 from "ml5";

// const App = () => {
//     return (
//         <div>
//             <Camera />
//         </div>
//     )
// }

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showlogin: true,
        }
    }
    // classifyImg = () => {
    //     // Initialize the Image Classifier method with MobileNet
    //     const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    //     // When the model is loaded
    //     function modelLoaded() {
    //         console.log('Model Loaded!');
    //     }
    //     // Put the image to classify inside a variable
    //     const image = document.getElementById('image');
    //     // Make a prediction with a selected image
    //     classifier.predict(image, 5, function (err, results) {
    //         // print the result in the console
    //         console.log(results);
    //     })
    // };

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
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active" onClick={this.hideWebcam}>
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#">How it works <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active" onClick={this.showWebCam}>
                                <a className="nav-link" href="#">Sessions <span className="sr-only" >(current)</span></a>
                            </li>

                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                        <input type="button" defaultValue="Members Login Here" className="btn btn-primary btn-block" data-toggle="modal" data-target="#myModal" />
                        </form>
                    </div>
                </nav>

                {/* Modal */}
                <div className="modal" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <div className="modal-content">
                            {/*<div class="modal-header">*/}
                            {/*  <button type="button" class="close" data-dismiss="modal">&times;</button>*/}
                            {/*  <h4 class="modal-title">Modal Header</h4>*/}
                            {/*</div>*/}
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="email" name="email" id="email" className="form-control input-sm" placeholder="Email Address" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="email" id="email" className="form-control input-sm" placeholder="Username" />
                                </div>
                                <div className="form-group">
                                    <input type="password" name="email" id="email" className="form-control input-sm" placeholder="password" />
                                </div>
                                <div className>
                                    <input type="submit" defaultValue="Submit" className="btn btn-info btn-block" />
                                </div>
                            </div>
                            {/*<div class="modal-footer">*/}
                            {/*  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                {showlogin ?
                    <Login parentClick={this.handleClick} />
                    :
                    <Camera />
                }
            </div>
        );
    }
}

export default App;
