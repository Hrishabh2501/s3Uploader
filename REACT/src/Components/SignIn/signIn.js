import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Toast from 'light-toast';
import { verifyUser } from "../../APIs/API";

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mail: '',
            pass: '',
            submit: false,
            firstname: '',
            lastname: '',
            uid:''
        }
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmail = (e) => {
        this.setState({ mail: e.target.value })
    }


    handlePassword = (e) => {
        this.setState({ pass: e.target.value })
    }


    handleSubmit = async () => {

        let user = {

            mail: this.state.mail,
            pass: this.state.pass
        }

        let res = await verifyUser(user)
        console.log(res,'AAA')
        if (res.status === 200) {
            if (res.data.success) {
                Toast.success(res.data.message, 300);
                console.log(res.data.data.id)
                localStorage.setItem("token",JSON.stringify(res.data))
                this.setState({ submit: true, firstname: res.data.data.firstName, lastname: res.data.data.lastName, uid:res.data.data.id })
                console.log(this.state.submit)
                this.setState({ mail: '', pass: '' })
            }
            else {
                ToastsStore.error(res.data.message)
                this.setState({ submit: false })
                console.log(this.state.submit)
            }


        }
        else {
            console.log(res.message)
            ToastsStore.error(res.message)
            this.setState({ submit: false })
        }

    }

    render() {
        return (
            <div>

                <form >
                    <div>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={this.state.mail} onChange={this.handleEmail} autoComplete='on' />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.pass} onChange={this.handlePassword} autoComplete='off' />
                        </div>

                        <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>

                        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />

                        <p className="forgot-password text-right">
                            Not Registered?  <Link className="nav-link" to="/signup">SignUp</Link>
                        </p>

                    </div>

                    {/* <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p> */}
                </form>

                {this.state.submit ? <Redirect to={{ pathname: `/profile`, state: { firstName: this.state.firstname, lastName: this.state.lastname, email: this.state.mail, id: this.state.uid} }} /> 
                : null}
            </div>
        );
    }
}



