import {StoreContext} from '../../store';
import React, {useState, useContext} from 'react';
import styled from 'styled-components'

export const ProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;

  &:last-of-type {
    border-bottom: none;
  }
`;

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
  font-weight: bold;
  flex: 5;
  
  & > span {
    color: aqua;
  }
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  flex: 2;
  display: flex;
  justify-content: center;
`;

const ProductQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2;
`;

const QuantityButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  border: none;
  background-color: transparent;
  cursor: pointer;


`;

const QuantityDisplay = styled.p`
  margin: 0 0.5rem;
`;

export const RemoveButton = styled.button`
  font-size: 1rem;
  font-weight: bold;
  border: none;
  background-color: transparent;
  color: red;
  cursor: pointer;
  flex: 1;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  margin-top: -10px;
  margin-bottom: 10px;
  color: red;
  display: flex;
  align-items: center;
`;


export function ProductCart({product}) {
  const {cart, setCart} = useContext(StoreContext);
  const [quantity, setQuantity] = useState(product.qty)

  const handleAddQuantity = () => {
    const newProduct = cart.map(prod => {

      if (prod.id === product.id) {
        return {...prod, qty: quantity + 1}
      }
      return prod
    })
    setQuantity(quantity + 1);

    setCart(newProduct)
  };

  const handleRemoveQuantity = () => {
    if (quantity - 1 > 0) {
      const newProduct = cart.map(prod => {

        if (prod.id === product.id) {
          return {...prod, qty: quantity - 1}
        }
        return prod
      })

      setQuantity(quantity - 1);

      setCart(newProduct)
    } else {
      const updateCart = cart.filter(prod => prod.id !== product.id)
      setCart(updateCart)
    }


  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter((prod) => prod.id !== id));
  };


  return (
    <ProductContainer>
      <ProductTitle> {product.name} <span>({product.qtyStock} {product.qtyStock > 1 ? 'unidades disponíveis' : 'unidade disponível'})</span></ProductTitle>
      <ProductPrice> R$ {product.price} </ProductPrice>
      <ProductQuantity>
        <QuantityButton type={'button'} onClick={handleRemoveQuantity}>-</QuantityButton>
        <QuantityDisplay>{quantity}</QuantityDisplay>
        <QuantityButton type={'button'} disabled={quantity === product.qtyStock} onClick={handleAddQuantity}>+</QuantityButton>
      </ProductQuantity>
      <RemoveButton type={'button'} onClick={() => handleRemoveItem(product.id)}> Remover</RemoveButton>

    </ProductContainer>
  )
}
