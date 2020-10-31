/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { tryLogin,verifyLogin,logout } from '../redux/actionCreators';
import * as validators from '../redux/validators.js'

const mapStateToProps = (state)=>{
    return{
        cart: state.cart,
        login: state.login
    }
}

const mapDispatchToProps = (dispatch)=>({
    verifyLogin: (user_details)=> dispatch(verifyLogin(user_details)),
    tryLogin: ()=> dispatch(tryLogin()),
    logout: ()=> dispatch(logout())
});

const errorStyle = {
    marginLeft: "1rem",
    fontSize: "12px",
    color: "red"
}

function NavbarComponent(props){

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link className=" ml-5 h1 navbar-brand" to='/'>ShopIt</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav navbar-right">
                <Nav className="ml-auto mr-5">
                    <Link to='/product' className="mr-3 nav-link">Products</Link>
                    <Link to='/cart' className="mr-3 nav-link">Cart</Link>
                    {props.login.user_details?
                        <Button onClick={() => props.logout()}variant="secondary" >Logout</Button>
                        :<Button onClick={() => props.tryLogin()} variant="info" >Login</Button>
                    }
                </Nav>
            </Navbar.Collapse>
            <MyVerticallyCenteredModal show={props.login.try} login={(val)=>props.verifyLogin(val)} onHide={()=>{props.logout()}} />
        </Navbar>
    );
}

function MyVerticallyCenteredModal(props) {

    function handleSubmit(values){
        props.login(values);
    }
    return (
        <Modal
            {...props}
            dialogClassName=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="d-flex justify-content-center" closeButton>
                <span className="h3 mr-0 ml-auto">Login</span>
            </Modal.Header>
            <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Modal.Body>
                
                    <Row className="form-group mx-1">
                        <Form.Label className="font-italic font-weight-light">User name</Form.Label>
                        <Control.text 
                            model=".user_name" 
                            placeholder="Trovi" 
                            className="form-control" 
                            validators = {{
                                minLength: validators.minLength(3),
                                maxLength: validators.maxLength(15)
                            }}
                        />
                        <Errors 
                            style={errorStyle}
                            model=".user_name"
                            show="touched"
                            messages={{
                                minLength: "* Must contain atleast 3 characters",
                                maxLength: "* Must be smaller than 16 characters"
                            }}
                        />
                    </Row>
                    <Row className="form-group mx-1">
                        <Form.Label className="font-italic font-weight-light">Email</Form.Label>
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text>@</InputGroup.Text>
                            </InputGroup.Prepend>
                         {/* eslint-disable-next-line react/jsx-pascal-case */}
                            <Control.text 
                                model=".user_email"
                                placeholder="pranav07092k@gmail.com" 
                                className="form-control"
                                validators={{
                                    isEmail: validators.isEmail
                                }} 
                            />
                        </InputGroup>
                        <Errors
                            style={errorStyle}
                            model=".user_email"
                            show="touched"
                            messages={{
                                isEmail: "*Valid e-mail required!"
                            }}
                        />
                    </Row>
                    <Row className="form-group mx-1">
                        <Form.Label className="font-italic font-weight-light">Password</Form.Label>
                        <Control.text 
                            model=".user_password" 
                            type="password" 
                            className="form-control" 
                            validators={{
                                minLength: validators.minLength(8),
                                maxLength: validators.maxLength(108)
                            }}
                        />
                        <Errors
                            style={errorStyle}
                            model=".user_password"
                            show="touched"
                            messages={{
                                minLength: "* Must contain atleast 8 characters",
                                maxLength: "* Must contain atmax 108 characters"
                            }}
                        />
                    </Row>
                    <Row className="form-group mx-1">
                        <Form.Label className="font-italic font-weight-light">Phone Number</Form.Label>
                        <Control.text 
                            model=".user_number" 
                            className="form-control" 
                            validators={{
                                isPhoneNumber: validators.isPhoneNumber
                            }}
                        />
                        <Errors
                            style={errorStyle}
                            model=".user_number"
                            show="touched"
                            messages={{
                                isPhoneNumber: "* Should be a valid phone number",
                            }}
                        />
                    </Row>
                
            </Modal.Body>
            <Modal.Footer>
                <Button className="mx-auto" type="Submit"variant="info">Log In</Button>
            </Modal.Footer>
            </LocalForm>
        </Modal>
    );
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavbarComponent));