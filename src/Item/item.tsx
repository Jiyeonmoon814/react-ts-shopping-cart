import React, { FC } from 'react'
import { Button } from '@material-ui/core'

//Types 
import { CartItemType } from '../App'

//Styles 
import { Wrapper } from '../App.styles'

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem : CartItemType) => void; 
}

export const Item:FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)} />
    </Wrapper>
)
