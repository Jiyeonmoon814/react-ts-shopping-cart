import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

//Components 
import Drawer from '@material-ui/core/Drawer'
import { LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import { AddShoppingCart, ShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Item } from './Item/Item';
import { Cart } from './Cart/Cart';

//styles 
import { Wrapper, StyledButton } from './App.styles';

//Types 
export type CartItemType = {
  id : number;
  category : string; 
  description : string;
  image : string;
  price : number;
  title : string;
  amount : number;
}

const getProducts = async () : Promise<CartItemType[]> => 
  //first await is for converting JSON
  //second await is for fetching API
  await (await fetch('https://fakestoreapi.com/products')).json()


export const App = () => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', 
    getProducts
  )

  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0)  

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // Is the item already added in the cart? 
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if(isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ? { ...item, amount : item.amount + 1} : item 
        ))
      }

      // Otherwise, first time the item is added 
      return [...prev, { ...clickedItem, amount : 1}]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if(item.id === id) {
          if(item.amount === 1) return ack; 

          return [...ack, { ...item, amount: item.amount - 1}]
        }else{
          return [...ack, item]
        }
      }, [] as CartItemType[])
    ))
  } 

  if(isLoading) return <LinearProgress />
  if(error) return <div>something went wrong</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={showCart} onClose={() => setShowCart(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setShowCart(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <ShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        { data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}
