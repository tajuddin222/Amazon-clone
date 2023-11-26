import React from 'react';
import logo from '../logo.svg';
import "./Header.css"
import  { Link } from "react-router-dom";
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function header() {
    const [{basket, user}, dispatch] = useStateValue();
    
    const handleAuthentication = () => {
        if(user) {
            auth.signOut();
        }
    }

    return (
        <div>
            <header className="header">
                <Link to="/">
                <img
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="name"
                />  
                </Link>              
                <div className="header-search">
                    <input className="search_input"></input>
                    <button className="search-button">search</button>
                </div>
                <div className="header_nav">
                    <Link to = {!user && '/Login'}>
                        <div onClick={handleAuthentication} className="header-option">
                            <span className="header-optionLineOne">Hello {user && user.email}</span>
                            <span className="header-optionLineTwo">{user? 'signout' : 'signin'}</span>
                        </div>
                    </Link>
                    <div className="header-option">
                        <span className="header-optionLineOne">Returns</span>
                        <span className="header-optionLineTwo">& Orders</span>
                    </div>
                    <div className="header-option">
                        <span className="header-optionLineOne">Your</span>
                        <span className="header-optionLineTwo">prime</span>
                    </div>
                    <div className="header_optionBasket">
                        <Link to="/checkout">
                        <button>basket</button>
                        
                        </Link>
                        <span className="header-optionLineTwo header_basketCount">{basket.length}</span>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default header;