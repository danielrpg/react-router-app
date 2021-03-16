import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export const MenuComponent = () => {
    return (
        <Menu>
            <Menu.Item
                name='home'
            >
                <Link to="/">Home</Link>
            </Menu.Item>

            <Menu.Item
                name='employee'
            >
                <Link to="/employee">Employee</Link>
            </Menu.Item>

            <Menu.Item
                name='product'
            >
                <Link to="/product">Product</Link>
            </Menu.Item>

            <Menu.Item
                name='product'
            >
                <Link to="/customer">Customer</Link>
            </Menu.Item>

            <Menu.Item
                name='upcomingEvents'           
            >
                Upcoming Events
            </Menu.Item>
      </Menu>
    )
}