import React from 'react';
import styled from 'styled-components'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 175px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  margin: 5px;
`

const ProductTitle = styled.h3`
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
  flex: 2;
`;

const ProductQuantity = styled.div`
  font-size: 1rem;
  margin-top: 5px;
  text-align: center;
  color: #999999;
  flex: 1;
`;

export function ProductStock({product}) {
  return (<Card>
      <ProductTitle> {product.name}</ProductTitle>
      <ProductQuantity> {product.qtyStock} {product.qtyStock > 1 ? 'unidades disponíveis' : 'unidade disponível'} </ProductQuantity>
    </Card>)
}
