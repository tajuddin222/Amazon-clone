import React from 'react';
import Subtotal from './Subtotal'
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue} from '../StateProvider';

function Checkout() {
    const [{ basket, user}, dispatch] = useStateValue();
    

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" 
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" 
                    alt="image"
                />
                <div>
                <h3>Hello {user && user.email}</h3>
                    <h2 className="checkout__title">
                        Your basket items
                    </h2>
                    {basket.map (item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            
                        />
                    ))}
                    
                </div>
                
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        
        </div>
    );
}

export default Checkout;