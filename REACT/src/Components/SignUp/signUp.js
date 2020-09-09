import React, { Component } from "react";
import {Link, Redirect } from "react-router-dom";

import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { createUser } from "../../APIs/API";


export default class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            mail: '',
            pass: '',
            submit: false
        }
        this.onFirstName = this.onFirstName.bind(this)
        this.onLastName = this.onLastName.bind(this)
        this.onEmail = this.onEmail.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    onFirstName = (e) => {
        this.setState({ firstname: e.target.value })
    }

    onLastName = (e) => {
        this.setState({ lastname: e.target.value })
    }

    onEmail = (e) => {
        this.setState({ mail: e.target.value })
    }

    onPassword = (e) => {
        this.setState({ pass: e.target.value })
    }

    handleSubmit = async () => {

        if (this.state.firstname.length && this.state.lastname.length && this.state.mail.length > 0 && this.state.pass.length >= 6) {
            let user = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                mail: this.state.mail,
                pass: this.state.pass,
            }

            let res = await createUser(user)
            console.log(res,'@@@@@@@@@')

            if (res.data.success) {
                ToastsStore.success(res.data.message)
                this.setState({ submit: true })
                this.setState({ firstname: '', lastname: '', mail: '', pass: '' })
            }
            else {
                ToastsStore.error(res.data.message)
                this.setState({ submit: false })
                console.log(this.state.submit)
            }

        }
        else if (this.state.firstname.length === 0) {
            ToastsStore.warning('ALL FIELDS ARE MANDATORY')
            document.getElementById("fname").focus()
        }
        else if (this.state.lastname.length === 0) {

            ToastsStore.warning('ALL FIELDS ARE MANDATORY')
            document.getElementById("lname").focus()
        }
        else if (this.state.mail.length === 0) {

            ToastsStore.warning('ALL FIELDS ARE MANDATORY')
            document.getElementById('mail').focus()
        }
        else {
            ToastsStore.warning('PASSWORD MUST BE GREATER THAN 6 CHARACTERS')
        }
    }




    render() {
        return (
            <div>
                <form >
                    <div>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" id='fname' className="form-control" placeholder="First name" onChange={this.onFirstName} value={this.state.firstname} 
                            pattern='[A-Za-z]' title="Must be Alphabet" minLength='6' required />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" id='lname' className="form-control" placeholder="Last name" onChange={this.onLastName} value={this.state.lastname} 
                            pattern='[A-Za-z]' title="Must be Alphabet" minLength='6' required />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" id='mail' className="form-control" placeholder="Enter email" onChange={this.onEmail} value={this.state.mail} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={this.onPassword} value={this.state.pass} />
                        </div>


                        <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>


                        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />


                        <p className="forgot-password text-right">

                            Already registered <Link className="nav-link" to={"/signin"}>Login</Link>

                        </p>
                    </div>

                </form>
                
            </div>
        );
    }
}

