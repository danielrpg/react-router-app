import { Switch, Route } from 'react-router-dom'
import { HomeComponent } from './HomeComponent'
import { EmployeeComponent } from './employee/EmployeeComponent'
import { ProductComponent } from './product/ProductComponent'
import { NotFoundComponent } from './shared/404Component'
import { NewProductComponent } from './product/NewProductComponent'
import { CustomerComponent } from './customer/CustomerComponent'
import { NewCustomerComponent } from './customer/NewCustomerComponent'

export const MainRouter = () => {
    return (
            <Switch>
                <Route exact path='/' component={HomeComponent} />
                <Route exact path='/employee' component={EmployeeComponent} />
                <Route path='/product' component={ProductComponent} />
                <Route path='/new-product' component={NewProductComponent} />
                <Route path='/new-product/:id' component={NewProductComponent} />
                <Route exact path='/customer' component={CustomerComponent} />
                <Route exact path='/new-customer' component={NewCustomerComponent} />
                <Route exact path='/new-customer/:id' component={NewCustomerComponent} />
                <Route path='/*' component={NotFoundComponent} />
            </Switch>
    )
}