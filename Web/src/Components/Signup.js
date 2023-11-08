import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { baseURL } from "../lib";
import axios from "axios";

export const Signup = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    let navigate = useNavigate();



    async function Signup(e) {
        e.preventDefault();
        let data = {
            email: email,
            password: password
          };
        axios.post(`${baseURL}/signup`,data).then((res) => {
            if (res.data == "exist") {
              alert("This email is already exists");
            } else if (res.data == "notexist") {
            //   history("/todo", { state: { id: email } });
            navigate("/todo");
            }
          })
          .catch((e) => {
            alert("wrong details");
            console.log(e);
          });;
      }
    const Loginpush = () => {
        navigate("/")
    }



    return (
        <div className="signupComp">
            <h3>Sign up</h3>
            <br></br>
            <Form action="POST">

                {/* <Form.Group id="inputs">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="User Name" onChange={(e) => setuName(e.target.value)} value={uName} />
                </Form.Group> */}

                <Form.Group >
                    <Form.Label>Enter Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email " onChange={(e) => setemail(e.target.value)} value={email} />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} value={password} />
                </Form.Group>


                {/* <Form.Group >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Pawword" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword} />
                </Form.Group> */}
                <br></br>
                 {/* &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; */}
                <Button variant="primary" onClick={Signup}>Sign up</Button><br></br><br></br><br></br>
                <span>already have an account ?</span>&nbsp; &nbsp;<Button variant="primary" onClick={Loginpush} >Sign in</Button>

            </Form>

        </div>
    )
}
