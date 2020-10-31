import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert'
import Accordion from 'react-bootstrap/Accordion'
import { connect } from 'react-redux';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link, Redirect, withRouter } from 'react-router-dom';
import * as validators from '../redux/validators.js'
import {products} from '../productDetails.js';

const mapStateToProps = (state)=>({
    cart:state.cart,
    login: state.login
});

const errorStyle = {
    marginLeft: "1rem",
    fontSize: "12px",
    color: "red"
}
const Checkout = (props)=>{
    const items = props.location.state.items;
    const amount = props.location.state.amount;
    const [orderPlaced,SetOrderPlaced]=React.useState(false);
    if(!props.login.user_details){
        return <Redirect to='/product'/>
    }

    const handleSubmit = (values)=>{
        SetOrderPlaced(true);
    }
    return (
        <div className="d-flex text-center" style={{flexDirection:"column"}}>
            {orderPlaced?
                <Alert variant="success" className="text-dark h6">
                    Hooray! your order is placed.
                    <Link to='/product' className="btn btn-outline-success d-block mx-auto mt-2" style={{width:'5rem'}}>Okay!</Link>
                </Alert >
                :<></>
            }
            <h1 className="text-info mt-5 mb-5">
                Checkout
            </h1>
            <LocalForm className="mx-auto " style={{width:"60%", maxWidth:"30rem"}} onSubmit={(values)=>{handleSubmit(values)}}>     
                        <Row className="form-group mx-1">
                            <Form.Label className="font-italic font-weight-light">User name</Form.Label>

                            {/* eslint-disable-next-line react/jsx-pascal-case */}
                            <Control.text 
                                model=".user_name" 
                                placeholder="Trovi" 
                                className="form-control" 
                                defaultValue={props.login.user_details.user_name}
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
                                    minLength: "*must contain atleast 3 characters",
                                    maxLength: "*should be smaller than 16 characters"
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
                                    defaultValue={props.login.user_details.user_email} 
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
                                    isEmail: "*valid e-mail required!"
                                }}
                            />
                        </Row>
                        <Row className="form-group mx-1">
                            <Form.Label className="font-italic font-weight-light">Phone Number</Form.Label>

                            {/* eslint-disable-next-line react/jsx-pascal-case */}
                            <Control.text 
                                model=".user_number" 
                                className="form-control"
                                defaultValue={props.login.user_details.user_number} 
                                validators={{
                                    isPhoneNumber: validators.isPhoneNumber
                                }}
                            />
                            <Errors
                                style={errorStyle}
                                model=".user_number"
                                show="touched"
                                messages={{
                                    isPhoneNumber: "*valid phone number required",
                                }}
                            />
                        </Row>
                        <Row className="form-group mx-1">
                            <Form.Label className="font-italic font-weight-light">Address</Form.Label>

                            {/* eslint-disable-next-line react/jsx-pascal-case */}  
                            <Control.text
                                model=".user_address"
                                className="form-control"
                                validators={{
                                    minLength: validators.minLength(10),
                                    maxLength: validators.maxLength(256)
                                }}
                            />
                            <Errors
                                style={errorStyle}
                                model=".user_address"
                                show="touched"
                                defaultValue={props.login.user_details.user_address}
                                messages={{
                                    minLength: "*must have atleast 10 cheracters",
                                    maxLength: "*should have atmax 256 cheracters",
                                }}
                            />
                        </Row>
                        <Row className="form-group mx-1">
                            <Form.Label className="font-italic font-weight-light">Pin Code</Form.Label>

                            {/* eslint-disable-next-line react/jsx-pascal-case */}
                            <Control.text
                                model=".user_pinCode"
                                className="form-control"
                                defaultValue={props.login.user_details.user_pinCode}
                                validators={{
                                    isPinCode: validators.isPinCode
                                }}
                            />
                            <Errors
                                style={errorStyle}
                                model=".user_pinCode"
                                show="touched"
                                messages={{
                                    isPinCode: "*valid Indian Pin Code required"
                                }}
                            />
                        </Row>
                    <Button className="mx-auto" disabled={orderPlaced} type="Submit" variant="success">Place Order</Button>
                    <Accordion>
                        <div>
                            <Accordion.Toggle as="div" className="text-left border-bottom mt-2" variant="light" eventKey="0">
                                Order Details -
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card className="mt-5 mb-5 mx-auto pt-2 pb-2 pr-4 pl-5" style={{width: '80%'}} text="light" bg="info">
                                {items.map((item) =>
                                    <Row style={{ width: '14rem' }}>
                                        <Col className="text-left" sm={8}>
                                            {products[item].title}
                                        </Col>
                                        <Col sm={4}>
                                            ₹ {products[item].price}
                                        </Col>
                                    </Row>
                                )
                                }
                                <hr />
                                <Row className="h6 text-dark" style={{ width: '14rem' }}>
                                    <Col className="d-flex justify-content-center" sm={7}>Total Amount</Col>
                                    <Col sm={5}>
                                        ₹ {amount}
                                    </Col>
                                </Row>
                            </Card> 
                            </Accordion.Collapse>
                        </div>
                    </Accordion>
                </LocalForm>
            </div>
    );
}

export default withRouter(connect(mapStateToProps)(Checkout));