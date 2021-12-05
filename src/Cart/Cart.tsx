import React, { FC } from 'react'
import { CartItem } from '../CartItem/CartItem'

//styles 
import { Wrapper } from './Cart.styled'

// Types
import { CartItemType } from '../App'

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void; 
}

export const Cart:FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            { cartItems.length === 0 ? <p>No items in cart.</p> : null }
            { cartItems.map(item => (
                <CartItem 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
        </Wrapper>
    )
}
