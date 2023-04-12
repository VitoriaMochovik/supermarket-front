import React, { useState, useEffect } from 'react';
import { Header } from "../../components/header/Header";
import styled from 'styled-components'
import { ProductCard } from './ProductCard';
import { getAllProducts } from '../../controller/product';

export const Container = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    text-align: center;
    align-content: center;
    justify-content: center;
    width: 100%;
	flex-wrap: wrap;
    
    
`


export function Products() {


	const [products, setProducts] = useState([])

	const getProducts = async () => {
		try {
			const result = await getAllProducts()
			setProducts(result)
		} catch(error) {
			console.log(error)
		}
		
	}


	useEffect (() => {
		getProducts()
	}, [])


    return(
        <div> 
            <Header />
            <Container>
                {products.map((product) =>(
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </Container>   
        </div>
    )
}