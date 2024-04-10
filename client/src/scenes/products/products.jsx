import React from 'react'
import {Box, Card, CardActions, CardContent, Collapose, Button, Typography, Rating, useTheme, useMediaQuery,} from "@mui/material";
import {useGetProductsQuery } from "state/api";
import Header from "components/Header";


const products = ()=> {
    const { data, isLoading } = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)")
     
  return (
    <Box m="1.5rem 2.5rem">
        <Header title = "PRODUCTS" subtitle="See your List Of Products. "/>
        {data || isLoading ?<Box mt="20px" display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr))" justifyContent = "space-between" rowGap="20px" columnGap="1.33%">
    
        </Box> : <></>
        }
    </Box>
  )
}

export default products;