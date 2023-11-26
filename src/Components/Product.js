import React from 'react';
import './Product.css';
import logo from '../logo.svg';
import { useStateValue } from '../StateProvider';

function Product({ id, title, image, price, rating  }) {
    const [{ basket}, dispatch] = useStateValue();

    const addToBasket = () => {
        //dispatch item to datalayer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p>🌟</p>
                        ))}
                </div>
                <img className="product__image" src={image} alt="logo"/>
                <button className="basket__button" onClick={addToBasket}>Add to basket</button>
            </div>
        </div>
    );
}

export default Product;