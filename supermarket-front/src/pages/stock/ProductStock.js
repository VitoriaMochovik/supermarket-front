import React from 'react';
import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 250px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 10px;
  text-align: center;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  margin-top: 5px;
  text-align: center;
`;

const ProductQuantity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const QuantityDisplay = styled.p`
  font-size: 1rem;
`;

const AddButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #333;
    border: 1px solid #333;
  }
`;

export function ProductStock({product}) {

  return (
    <Card>
      <ProductTitle> {product.name}</ProductTitle>
      <ProductPrice> Quantidade em Estoque: {product.qtyStock} </ProductPrice>
    </Card>
  )
}
