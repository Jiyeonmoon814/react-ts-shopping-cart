import { Button } from "@material-ui/core"
import { FC } from "react"

//Types 
import { CartItemType } from "../App"
import { Item } from "../Item/Item"

//Styles
import { Wrapper } from "./CartItem.styled"

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id:number) => void; 
}

export const CartItem:FC<Props> = ({ item, addToCart, removeFromCart }) => (
        <Wrapper>
            <div>
                <h3>{item.title}</h3>
                <div className="information">
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className="buttons">
                    <Button size="small" disableElevation 
                        variant="contained" onClick={() => removeFromCart(item.id)}>-</Button>
                    <span>{item.amount}</span>
                    <Button size="small" disableElevation 
                        variant="contained" onClick={() => addToCart(item)}>+</Button>
                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </Wrapper>
    )
