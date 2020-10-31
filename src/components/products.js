import React from 'react';
import {products} from '../productDetails.js';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { addToCart, tryLogin } from '../redux/actionCreators.js';
import Toast from 'react-bootstrap/Toast';

const mapStateToProps = (state)=>({
    cart: state.cart,
    login: state.login
});

const mapDispatchToProps = (dispatch)=>({
    addToCart: (amount,productID)=> dispatch(addToCart(amount,productID)),
    tryLogin: ()=>dispatch(tryLogin())
})

function ProductsComponent(props){
    const ProductJSX = (
        <Row>
            {products.map((product,index)=> 
                <Col className="d-flex justify-content-center" key={product.title} xl={3} lg={4} md={6} sm={12}>
                    <ProductCard product={product} tryLogin={props.tryLogin} login={props.login} productID={index} cart={props.cart.items} addToCart={props.addToCart}/>
                </Col>
            )}
        </Row>
    )
    return (
        <div className="position-relative text-center" style={{overflowX:"hidden"}}>
            <Toast className="position-absolute h6 bg-warning text-dark" style={{top:"0", right:"0", width: "10rem"}}>
                <Toast.Body >
                    Cart Value: {props.cart.amount}
                </Toast.Body>
            </Toast>
            <h1 className='mt-5 text-info'>Products</h1>
            {ProductJSX}
        </div>
    );
}

function ProductCard(props){
    return(
        <Card className="mb-5 mt-5" style={{ width: '18rem', boxShadow: '0 0 5px grey' }}>
            
            <Card.Img  variant="top" src={props.product.imageUri} />
            <Card.Body>
                <Card.Title>{props.product.title}</Card.Title>
                <Card.Text> Price: ₹ {props.product.price}</Card.Text>
                {
                    props.cart.includes(props.productID)?
                        <Link to='/cart' className="btn btn-info">In Cart</Link>
                        :<Button onClick={() => { props.addToCart(props.product.price, props.productID) }} variant="warning">Add To Cart</Button>
                }
                {
                    props.login.user_details?
                        <Link
                            className="btn btn-secondary ml-4"
                            to={{
                                pathname: '/checkout',
                                state: { items: [props.productID], amount: props.product.price }
                            }}>
                            Buy Now
                        </Link>:
                        <Button variant="secondary" className="ml-4" onClick={()=>props.tryLogin()}>Buy Now</Button>
                }
                
            </Card.Body>
        </Card>
    );
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProductsComponent));