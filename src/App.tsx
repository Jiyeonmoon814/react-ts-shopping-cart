import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

//Components 
import Drawer from '@material-ui/core/Drawer'
import { LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import { AddShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';

//styles 
import { Wrapper } from './App.styles';

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
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', 
    getProducts
  )

  console.log(data)

  const getTotalItems = () => null 

  const handleAddToCart = (clickedItem: CartItemType) => null

  const handleRemoveFromCart = () => null 

  if(isLoading) return <LinearProgress />
  if(error) return <div>something went wrong</div>

  return (
    <div className="App">
      
    </div>
  );
}
