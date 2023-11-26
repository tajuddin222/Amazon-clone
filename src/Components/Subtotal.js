import React from 'react';
import './Subtotal.css';
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router';


function Subtotal() {
    const [{basket}, dispatch] = useStateValue();
    const history = useHistory();

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) =>(
                    <div>
                        <p>
                            Subtotal ({basket.length} items):
                            <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" />
                            The order contains a gift
                        </small>
                    </div>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeperator={true}
                prefix={"$"}
            />

            <button onClick={e =>history.push('./payment')}>Proceed to checkout</button>
                    
        </div>
    );
}

export default Subtotal;