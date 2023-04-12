import { Header } from "../../components/header/Header";
import {useForm}  from "react-hook-form";
import DatePicker from 'react-datepicker';
import React, {useState, useContext, useEffect} from "react";
import { StoreContext } from '../../store';
import { ProductCart } from "./ProductCard.js"
import styled from 'styled-components'


import 'react-datepicker/dist/react-datepicker.css'
import { createOrder } from "../../controller/order";

const CartContainer = styled.div`
    display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  padding: 1rem;


`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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
`;

const ErrorMessage = styled.p`
  margin-top: -10px;
  margin-bottom: 10px;
  color: red;
`;


const Button = styled.button`
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  background-color: #0077cc;
  color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;



export function Cart() {

    const [order, setOrder ] = useState({})
    const [deliveryDate, setdeliveryDate] = useState(new Date() )
    const { cart, setCart } = useContext(StoreContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()



    

    // const { form, onChange, cleanFields } = useForm({
    //     name: "",
    //     date: new Date()
    //   });

    const dateChange = (deliveryDate) => {
        setdeliveryDate(deliveryDate)
    }


    const onSubmit = async (data) => {
        console.log(data)

        const arrayProducts = cart.map((product) => {
            return (
                {"id": product.id,
                "qty": product.qty}
            )
        })

        console.log("araray de products", arrayProducts)

        const newOrder = {
            "name": data.name,
            "dtDelivery": data.deliveryDate,
            "products": arrayProducts
            
        }

        setOrder(newOrder)


        try {
          await createOrder(newOrder)

          console.log("new order", newOrder)
          alert("Pedido enviado!!!")
        } catch(error) {
          console.log(error)
        }
        
        
    }   

    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.price * item.qty;
      }, 0);

    return(
        <div>
            <Header />
            <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label >Nome:</Label>
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
                <div>
                    <DatePickerLabel> Data de entrega: </DatePickerLabel>
                    <DatePicker
                        onChange={dateChange}
                        // id="deliveryDate"
                        // name="deliveryDate"
                        selected={deliveryDate}
                        // value={date.toISOString()}
                        // {...register("deliveryDate")}
                        //onChange={(date) => setFormData({ ...form.date, date })}
                        // dateFormat="yyyy-MM-dd"
                        // className="form-control"
                    />
                    <input 
                        {...register("deliveryDate",
                        {required: true})} 
                        type="hidden" 
                        value={deliveryDate.toISOString()} 
                        id="deliveryDate"
                    />
                    {errors.deliveryDate && <ErrorMessage>{errors.deliveryDate.message}</ErrorMessage>}
                </div>
                
                <CartContainer>
                    <h3> Pordutos selecionados: </h3>
                    {cart.map((product) =>(
                    <ProductCart
                        key={product.id}
                        product={product}
                    />
                ))}

                </CartContainer>
                <h2>Total: R$ {totalPrice.toFixed(2)}</h2>
                <Button type="submit">Enviar pedido</Button>
            </Form>
            
            </Container>
        </div>
    )
}