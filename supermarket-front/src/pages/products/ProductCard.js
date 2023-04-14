import React, {useState, useContext} from 'react';
import styled from 'styled-components'
import {StoreContext} from '../../store';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 350px;
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

  & > p {
    color: #999999;
  }
  flex: 2;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  margin-top: 5px;
  text-align: center;
  flex: 1
`;

const ProductQuantity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  flex: 1
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
  
  &:disabled {
    opacity: 50%;
    background-color: #fff;
    color: #333;
  }
  
`;

const QuantityDisplay = styled.p`
  font-size: 1rem;
`;

const AddButton = styled.button`
  background-color: #49945e;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #49945e;

  &:hover {
    background-color: #1c6231;
  }

  &:disabled {
    opacity: 50%;
    background-color: #49945e;
    color: #fff;
    cursor: not-allowed;
  }
  
  height: 40px;
  max-height: 40px;
`;

export function ProductCard({product}) {
  const [quantity, setQuantity] = useState(0);
  const {cart, setCart} = useContext(StoreContext);

  const handleAddQuantity = () => {
    setQuantity(quantity + 1);


  };

  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {

    let productExist = [];
    if (cart) {
      productExist = cart.filter(prod =>
        prod.id === product.id
      )
    }

    let newProduct;

    //Para não repetir produtos no carrinho
    if (productExist.length !== 0) {
      newProduct = cart.map(prod => {

        if (prod.id === product.id) {
          return {...prod, qty: quantity + prod.qty}
        }
        return prod
      })

      setCart(newProduct)
    } else {
      newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        qtyStock: product.qtyStock,
        qty: quantity
      }

      setCart([...cart, newProduct]);
    }
    alert(`Adicionado ao carrinho: ${product.name} - Quantidade: ${quantity}`);
  };

  return (
    <Card>
      <ProductTitle> {product.name} <p>({product.qtyStock} {product.qtyStock > 1 ? 'unidades disponíveis' : 'unidade disponível'})</p></ProductTitle>
      <ProductPrice> R$ {product.price} </ProductPrice>
      <ProductQuantity>
        <QuantityButton disabled={quantity === 0} onClick={handleRemoveQuantity}>-</QuantityButton>
        <QuantityDisplay>{quantity}</QuantityDisplay>
        <QuantityButton disabled={quantity === product.qtyStock} onClick={handleAddQuantity}>+</QuantityButton>
      </ProductQuantity>
      <AddButton disabled={quantity === 0} onClick={handleAddToCart}>Adicionar ao carrinho</AddButton>
    </Card>
  )
}
