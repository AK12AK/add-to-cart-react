import React, { Component } from "react";
import './LoginPage.css'
import {Link} from 'react-router-dom'
import { Button } from "semantic-ui-react";



class Loginpage extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            userName: "",
            password: "",
            loginroute: false
        })
    }


    handleUsername = (e) => {
        this.setState({
            userName: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSave = (e) => {
        var users = JSON.parse(localStorage.getItem('users') || "[]")
        if ((this.state.password != "") || (this.state.userName != "")) {
            users.push(this.state)
            localStorage.setItem('users', JSON.stringify(users))
        }
        else {
            alert("enter a valid name")
        }
    }

    handleLogin = (e) => {
        var temp = 0;
        var verification = JSON.parse(localStorage.getItem('users'))
        verification.map((obj) => {
            if (obj.userName == this.state.userName) {
                if (obj.password == this.state.password) {
                    // const { history } = this.props;
                    // const location = '/addtocart'
                    // this.props.location
                    // e.history.push("/addtocart")
                    // history.push("/addtocart");
                    // this.props.navigate('/addtocart')
                    // <NavLink exact activeClassName="active" to="/addtocart" Component={AddToCart}></NavLink>
                    // useNavigate('/addtocart');
                    // <Route path="/addtocart" component={AddToCart} />
                    // window.location('/addtocart')
                    // const string ='/addtocart';
                    // assign(url =string | URL)
                    window.location.href = "/addtocart"
                    // this.setState({
                    //   loginroute:true  
                    // })
                    // Button.click("hello")
                    // history.push("/addtocart")
                    // browserHistory.push("/addtocart");
                    // <Link to='/addtocart'></Link>
                    // <Redirect to="/addtocart"/>

                }
                else {
                    alert("password is wrong")
                }
            }
            else {
                temp++
            }
            (temp == verification.length) && alert("Create user name by signin")
        })
    }


    render() {
        console.log(this.props)
        return (
            <div className="loginbox">
                <div className="logingrid">
                    <label>User Name</label>
                    <input placeholder="User Name" onChange={this.handleUsername}></input>
                    <label>Password</label>
                    <input placeholder="Password" onChange={this.handlePassword} type='password'></input>
                    {(this.state.loginroute) ?
            <Link onChange='/addtocart'>
            <input type="button" onClick={this.handleLogin} value='Login'></input></Link>
            : <input type="button" onClick={this.handleLogin} value='Login'></input>
             }
                    {/* <input type="button" onClick={this.handleLogin} value='Login'></input> */}
                    {/* <input type="button" onClick={this.handleSave} value='Sign In'></input> */}
                    <p>Create Login by <a href="" onClick={this.handleSave}>Signing In</a></p>
                    {/* <button onClick={this.handleSave()} name='sign'>Sign In</button>
            <button onClick={this.handleLogin} name='log'>Login</button> */}
                </div>
            </div>
        )
    }
}

// function WithNavigate(props) {
//     let navigate = useNavigate();
//     return <Loginpage {...props} navigate={navigate} />
// }


// export default WithNavigate
export default Loginpage