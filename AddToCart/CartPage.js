import React, { Component } from "react";
import AddToCart from "./AddToCart.js";
import jsonAddToCart from "./AddToCart.json"
// import{} from '@reactjs/toolkit'


export class CartPage extends Component {
    cart;
    constructor(props) {
        super(props)
        this.state = ({
            cartArray: [],

        })
    }
    componentDidMount() {
        this.cart = JSON.parse(localStorage.getItem('cartItem'));

        if (localStorage.getItem('cartItem')) {
            this.setState({
                cartArray: this.cart
            })
        } else {
            this.setState({
                cartArray: ""
            })
        }
    }
    render() {
        // const children =this.props
        // console.log(children,"ak")
        // debugger 
        return (
            <div>
                <h1>CART PAGE</h1>
                {
                    this.state.cartArray.map((data) => {
                        return (
                            <div key={data.id} className="productList">
                                <p>{data["Product Name "]}</p>
                                <img src={data.image} alt="img" height="200px" width="200px"></img>
                                <p>{data.Model}</p>
                                {(data.qty > 1)
                                    ?
                                    <h4>₹ {data.price * data.qty}</h4>
                                    :
                                    <h4>₹ {data.price}</h4>
                                }
                                <div><button onClick={(id) => this.handleMinus(data.id, data)}>-</button>
                                    <button >{data.qty}</button>
                                    <button onClick={(id) => this.handleAdd(data, data.id)}>+</button></div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default CartPage