import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Cart } from "./pages/cart/Cart";
import { Products } from "./pages/products/Products";
   

export function Router () {

    return(

        <BrowserRouter>
            <Switch>
                <Route exact path={'/products'}>
                    <Products></Products>
                </Route>
                <Route exact path={'/cart'}>
                    <Cart> </Cart>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}