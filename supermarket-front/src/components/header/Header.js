import React from 'react';
import styled from 'styled-components'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup'
import logo from '../../img/logo.png'
import { useNavigate } from 'react-router-dom';

// 2da77a
const Container = styled.div`
    background-color: #9cb29c;
    box-sizin: border-box;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    @media (max-width: 375px) {
        display: flex;
        flex-direction: column;
        height: 160px;
        justify-content: space-around;
        padding: 10px;
    }
`
export const LogoContainer = styled.div`
    width: 250px;
    justify-content: center;
    align-items: center;
    @media (max-width:375px){
        width: 100vw;
    }
`

export const IMGLogo = styled.img`
    width: 50%;
    cursor: pointer;
`

export const ButtonContainer = styled.div`
    width: 350px;
    justify-content: center;
    margin-right: 20px;
`


export function Header() {

    const navigate = useNavigate();

    const handleGoToCart = () => {
        navigate('/cart');
    };

    const handleGoToProducts = () => {
        navigate('/products')
    }

    const handleGoToStock = () => {
        navigate('/stock')
    }

    return(
        <div>
            <Container>
                <LogoContainer >
                    <IMGLogo
                        src={logo}
                    />
                </LogoContainer>
                <ButtonContainer>
                    <ButtonGroup>
                        <Button onClick={handleGoToStock} variant={'contained'} style={{backgroundColor: '#49945e'}}> Estoque </Button>
                        <Button onClick={handleGoToProducts} variant={'contained'} style={{backgroundColor: '#49945e'}}> Produtos </Button>
                        <Button onClick={handleGoToCart} variant={'contained'} style={{backgroundColor: '#49945e'}}> Carrinho </Button>
                    </ButtonGroup>
                </ButtonContainer>
            </Container>
        </div>
    )
}
