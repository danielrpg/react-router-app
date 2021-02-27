import { Switch, Route } from 'react-router-dom'
import { HomeComponent } from './HomeComponent'
import { EmployeeComponent } from './employee/EmployeeComponent'
import { ProductComponent } from './product/ProductComponent'
import { NotFoundComponent } from './shared/404Component'

export const MainRouter = () => {
    return (
            <Switch>
                <Route exact path='/' component={HomeComponent} />
                <Route exact path='/employee' component={EmployeeComponent} />
                <Route path='/product' component={ProductComponent} />
                <Route path='/*' component={NotFoundComponent} />
            </Switch>
    )
}