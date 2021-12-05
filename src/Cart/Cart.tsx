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
    const calculateTotal = (items: CartItemType[]) => items.reduce((ack:number, item) => ack + item.amount * item.price, 0)

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
            <h2>Total: ${calculateTotal(cartItems).toFixed()}</h2>
        </Wrapper>
    )
}
