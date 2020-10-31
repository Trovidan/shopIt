import React from 'react';
import {products} from '../productDetails.js';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { removeFromCart, tryLogin } from '../redux/actionCreators.js';

const mapStateToProps = (state)=>({
    cart: state.cart,
    login: state.login
});

const mapDispatchToProps = (dispatch)=>({
    removeFromCart: (amount, productIndex)=>{
        return dispatch(removeFromCart(amount,productIndex))
    },
    tryLogin: ()=>dispatch(tryLogin())
})

function CartComponent(props){
    if (Array.isArray(props.cart.items) && props.cart.items.length===0){
        return (
            <div style={{display:'grid', placeContent: 'center', height: '60vh'}}>
                <Link to='product' className='nav-link text-secondary'>
                <h1>
                    Your Cart is Empty!
                    Let's go do some shopping.
                </h1>
                </Link>
            </div>
        )
    }
    return (
        <Row style={{width:'100vw'}}>
            <Col xl={7} lg={7} md={7} sm={12} >
                <Row className="ml-5">
                {props.cart.items.map((item,index) => 
                    <Col className="d-flex justify-content-center" key={index} xl={4} lg={6} md={12} sm={12}>
                        <ProductCard productID={item} productIndex={index}removeFromCart={props.removeFromCart} />
                    </Col>)
                }
                </Row>
            </Col>
            <Col xl={4} lg={4} md={4} sm={12}>
                <Card className="sticky-top mt-5 pt-3 pr-4 pl-5 pb-3 d-inline-block" text="light" bg="info">
                    {props.cart.items.map((item)=>
                        <Row style={{ width: '15rem' }}>
                            <Col className="text-left" sm={8}>
                                {products[item].title}
                            </Col>
                            <Col sm={4}>
                                ₹ {products[item].price}
                            </Col>
                        </Row>
                        )
                    }
                    <hr/>
                    <Row className="h5 text-dark" style={{ width: '17rem' }}>
                        <Col className="d-flex justify-content-center" sm={7}>Total Amount</Col>
                        <Col sm={5}>
                            ₹ {props.cart.amount}
                        </Col>
                    </Row>
                    {
                        props.login.user_details?
                            <Link
                                className="btn btn-success position-absolute"
                                style={{ bottom: '-3rem', left: "35%" }}
                                to={{
                                    pathname: "/checkout",
                                    state: { items: props.cart.items, amount: props.cart.amount }
                                }}>
                                Place Order
                            </Link>:
                            <Button
                                variant="success"
                                className="position-absolute"
                                style={{ bottom: '-3rem', left: "35%" }}
                                onClick={()=>props.tryLogin()}
                            >
                                Place Order
                            </Button>
                    }
                    
                </Card> 
            </Col>
        </Row>
    );
}

function ProductCard(props) {
    let imageUri = products[props.productID].imageUri;
    let title = products[props.productID].title;
    let amount = products[props.productID].price;
    return (
        <Card className="mb-5 mt-5" style={{ width: '18rem', boxShadow: '0 0 5px grey' }}>
            <Card.Img variant="top" src={imageUri} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text> Price: ₹ {amount}</Card.Text>
                <Button variant="secondary" onClick={()=>{props.removeFromCart(amount,props.productIndex)}}>Remove</Button>
            </Card.Body>
        </Card>
    );
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CartComponent));