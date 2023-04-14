import {Header} from "../../components/header/Header";
import {useForm} from "react-hook-form";
import DatePicker from 'react-datepicker';
import React, {useState, useContext, useEffect} from "react";
import {StoreContext} from '../../store';
import {ProductCart} from "./ProductCard.js"
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import {createOrder} from "../../controller/order";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  box-sizing: border-box;
  
  & > h3 {
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const Label = styled.label`
  margin-right: 10px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const DatePickerLabel = styled(Label)`
  margin-right: 5px;
  width: 200px;
`;

const ErrorMessage = styled.p`
  margin-top: -10px;
  margin-bottom: 10px;
  color: red;
`;

const Button = styled.button`
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


  max-height: 50px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
`

export function Cart() {
  const [order, setOrder] = useState({})
  const [deliveryDate, setdeliveryDate] = useState(new Date())
  const {cart, setCart} = useContext(StoreContext);
  const {register, handleSubmit, reset, formState: {errors}} = useForm()
  const [loading, setLoading] = useState(false)

  const dateChange = (deliveryDate) => {
    setdeliveryDate(deliveryDate)
  }

  const onSubmit = async (data) => {
    setLoading(true)

    const arrayProducts = cart.map((product) => {
      return (
        {
          "id": product.id,
          "qty": product.qty
        }
      )
    })

    const newOrder = {
      "name": data.name,
      "dtDelivery": data.deliveryDate,
      "products": arrayProducts

    }

    setOrder(newOrder)

    try {
      await createOrder(newOrder)

      setCart([])
      reset()

      alert("Pedido enviado!!!")
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  return (
    <div>
      <Header/>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Nome:</Label>
            <Input
              id={"name"}
              type="text"
              //value={form.name}
              {...register("name")}
              placeholder="Nome"
              required
              pattern={"^.{3,}"}
              title={"O nome deve ter no mínimo 3 letras"}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          <DateContainer>
            <DatePickerLabel> Data de entrega: </DatePickerLabel>
            <DatePicker
              onChange={dateChange}
              selected={deliveryDate}
            />
            <input
              {...register("deliveryDate",
                {required: true})}
              type="hidden"
              value={deliveryDate.toISOString()}
              id="deliveryDate"
            />
            {errors.deliveryDate && <ErrorMessage>{errors.deliveryDate.message}</ErrorMessage>}
          </DateContainer>

          <CartContainer>
            <h3> Produtos selecionados: </h3>
            {cart.map((product) => (
              <ProductCart
                key={product.id}
                product={product}
              />
            ))}

          </CartContainer>
          <h2>Total: R$ {totalPrice.toFixed(2)}</h2>
          <Button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar pedido'}</Button>
        </Form>

      </Container>
    </div>
  )
}
