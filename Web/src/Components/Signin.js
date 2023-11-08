import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import { profileAction } from '../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { baseURL } from "../lib";
import axios from "axios";

export const Signin = () => {
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    console.log("state is ", state)

    let navigate = useNavigate();

 async function login(e) {
        e.preventDefault();
        try {
            await axios
              .post(`${baseURL}/signin`, {
                email,
                password,
              })
              .then((res) => {
                if (res.data == "exist") {
                  navigate("/todo", { state: { id: email } });
                } else if (res.data == "password wrong") {
                  alert("password is wrong, please try again.");
                } else if (res.data == "notexist") {
                  alert("User have not sign up");
                }
              })
              .catch((e) => {
                alert("wrong details");
                console.log(e);
              });
          } catch (e) {
            console.log(e);
          }
      }


    const signUp = () => {
        navigate("/signup")
    }

    return (
        <div className="signinComp">
            <h3>Login</h3>
            <br></br>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setemail(e.target.value)} value={email} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} value={password} />
                </Form.Group>
                <br></br>
                <Button variant="primary" onClick={login}>Sign in</Button> <br></br><br></br><br></br>
                <span>Don't have an account ?</span>&nbsp; &nbsp;<Button variant="primary" onClick={signUp}>Sign up</Button>

            </Form>
        </div>

    )
}
