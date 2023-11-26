import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import {getBasketTotal} from "../reducer";
import axios from 'axios';


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
 
    useEffect(() =>{
        // generate the special stripe secret which allows us to change a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expects the total in a currency submit
                url: '/payments/create?total=${getBasketTotal(basket) * 100}'
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log('the secret is >>>', clientSecret)
    
    const handleSubmit = async (event) => {
        //do ll the stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('./orders')
        })
    }

    const handleChange = event =>{
        //Listen for changes in the card element
        //and dispaly any card errors as the customer type their card details
        setDisabled(event.empty);
        setError(event.error? event.error.message : "" )
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>Checkout <Link to='./checkout'>{basket.length} items</Link></h1>
                
                {/* payment__section for delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>delivery Adrress</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user && user.email}</p>
                        <p>18/825-A Tilak Nagar, Guntakal</p>
                        <p>Anantapur dist., AP</p>
                        <p>515801</p>
                    </div>
                </div>
                {/* payment__section for Review items */}
                <div className='payment__section'>
                    <div className='payment__title' >
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item =>{
                            return(
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                            )
                        })}
                    </div>
                </div>
                {/* payment__section for Payment method */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment method</h3>
                    </div>
                    <div className='payment__details'>
                        {/* stripejs magic */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className='payment__price Container'>
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <div>
                                        <h3> Order Total: {value}</h3>
                                        </div>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeperator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>processing</p> :
                                    "Buy Now"}</span>
                                </button>
                            </div>
                            {/*Errors*/}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;