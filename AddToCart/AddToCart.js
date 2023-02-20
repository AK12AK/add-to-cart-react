import React, { Component } from "react";
import jsonAddToCart from "./AddToCart.json"
import "./AddToCart.css"
import Modal from './Modal.js';
import CartPage from "./CartPage";
import { Link } from "react-router-dom"

export class AddToCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            plpArray: [],
            cartArray: [],
            quantity: 1,
            totalQuantity: 0,
            isOpen: false,
            show: false,
            imageModel: "",
            showHideClassName: "modal display-none",
            id: ""
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    //life cycle methods and this method can be put under constructor
    componentDidMount() {
        this.jsonToArray()
    }
    handleAdd = (record, id) => {

        var temp = 0;
        (!this.state.cartArray.length)
            ? (this.handlePush(id, record))
            : this.state.cartArray.map((item) => {
                if ((id != item.id)) {
                    temp++
                }
                if (temp == this.state.cartArray.length) {
                    (this.handlePush(id, item))
                }
                if (id == item.id) {
                    // jsonAddToCart[id-1].qty++
                    item.qty++
                    this.setState({
                        cartArray: this.state.cartArray,
                        totalQuantity: this.state.totalQuantity + 1
                    })
                    localStorage.setItem('cartItem', JSON.stringify(this.state.cartArray));
                }
            });
    }

    handlePush = (id, item) => {
        item.qty++

        this.state.cartArray.push(jsonAddToCart[id - 1])
        this.setState({
            cartArray: this.state.cartArray,
            totalQuantity: this.state.totalQuantity + 1
        })
        localStorage.setItem('cartItem', JSON.stringify(this.state.cartArray));

    }

    handleMinus = (id) => {
        this.state.cartArray.forEach((num, index) => {
            if (this.state.cartArray[index].id == id) {
                // (this.state.cartArray[index].qty >1) 
                // ? (jsonAddToCart[id-1].qty-- )
                // : (this.handlePop(id))
                // if(this.state.cartArray[index].qty >1)
                // jsonAddToCart[id-1].qty--
                // else{this.handlePop(id)}
                if (this.state.cartArray[index].qty > 1) {
                    this.state.cartArray[index].qty--
                    this.setState({
                        cartArray: this.state.cartArray,
                        totalQuantity: this.state.totalQuantity - 1
                    })
                }
                else { this.handlePop(id, num) }

            }
        });
        localStorage.setItem('cartItem', JSON.stringify(this.state.cartArray));

    }

    handlePop = (id, item) => {
        // this.state.cartArray.pop(jsonAddToCart[id - 1])
        // // this.state.cartArray.pop()
        // this.setState({
        //     cartArray: this.state.cartArray
        // })
        item.qty--
        this.state.cartArray.forEach((num, index) => {
            if (this.state.cartArray[index].id == id) {
                this.state.cartArray.splice(index, 1)
                this.setState({
                    cartArray: this.state.cartArray,
                    totalQuantity: this.state.totalQuantity - 1
                })
            }

        });
        localStorage.setItem('cartItem', JSON.stringify(this.state.cartArray));
    }

    handleCart = () => {
        console.log(this.state.cartArray);
    }
    showModal = (image, id) => {
        this.setState({
            show: true,
            imageModel: image,
            showHideClassName: "modal display-block",
            id: id
        });
    };

    hideModal = () => {
        this.setState({
            show: true,
            showHideClassName: "modal display-none"
        });
    };

    handleUrl = (url, id) => {
        this.setState({
            imageModel: url,
        })
        this.state.plpArray[id - 1].image = this.state.imageModel
        this.setState({
            plpArray: this.state.plpArray
        })
    }

    jsonToArray = () => {
        jsonAddToCart.map(record => {
            this.state.plpArray.push(record)
            this.setState({
                plpArray: this.state.plpArray
            })
        })
    }
    render() {
        return (
            <div className="productListPage">
                <p className="cartButtonQty">{this.state.totalQuantity}</p>
                <Link to="/addtocart/cartpage"><button className="cartButton" onClick={() => this.handleCart()}><img src="https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=is&k=20&c=QHCSfGDYGVqbBZ5GvAmrePdsHmAvkyd_1xLI6dzzLWE=" height="40px" width="40px"></img></button></Link>
                <div className=" grid">
                    {
                        jsonAddToCart.map((record) => {
                            return (
                                <div key={record.id} className="productList">
                                    <p>{record["Product Name "]}</p>
                                    <img src={record.image} alt="img" height="200px" width="200px" onClick={(id) => this.showModal(record.image, record.id)}></img>
                                    <p>{record.Model}</p>
                                    <h4>₹{record.price}</h4>
                                    <Modal show={this.state.showHideClassName} handleClose={this.hideModal} handleUrl={this.handleUrl}>
                                        <img height={500} width={500} src={this.state.imageModel} id={this.state.id}></img>
                                    </Modal>
                                    {/* <CartPage handlleCart={this.handleCart}></CartPage><AddToCart></AddToCart> */}
                                    {
                                        (record.qty != 0)
                                            ? <div><button onClick={(id) => this.handleMinus(record.id, record)}>-</button>
                                                <button onClick={(id) => this.handleAdd(record, record.id)}>{(record.qty == 0) ? "Add to Cart" : record.qty}</button>
                                                <button onClick={(id) => this.handleAdd(record, record.id)}>+</button></div>
                                            :
                                            <button onClick={(id) => this.handleAdd(record, record.id)}>Add To Cart</button>

                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}


export default AddToCart