import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Container, Header, Icon, Menu, Table, Button } from "semantic-ui-react"
import CustomerService from '../../services/CustomerService'

export const CustomerComponent = () => {

    const history = useHistory()

    const initialCustomers = {
            status: false,
            errorCode: 0,
            message: "",
            customer: []
    }

    const [customers, setCustomers] = useState(initialCustomers)

    useEffect(() => {
        CustomerService.getAll()
         .then(resp => {
             const customerResp = resp.data

             if(customerResp && customerResp.customer.length > 0) {
                setCustomers(customerResp)
             }
         })
         .catch(e => {
             console.log(e)
         })
    }, [])

    const onCreateCustomerRedirect = () => {
        history.push('/new-customer')
    }

    return (
        <Container> 
            <Header as='h1'> <Icon name='briefcase'></Icon> List of Customers </Header>
            <Button primary onClick={onCreateCustomerRedirect}> Create Customer </Button>
            <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>CellPhone</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>ZipCode</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        customers.customer.map(customer => {
                            return (
                                <Table.Row key={customer.id}>
                                    <Table.Cell>{customer.name}</Table.Cell>
                                    <Table.Cell>{customer.lastName}</Table.Cell>
                                    <Table.Cell>{customer.cellphone}</Table.Cell>
                                    <Table.Cell>{customer.address}</Table.Cell>
                                    <Table.Cell>{customer.zipCode}</Table.Cell>
                                    <Table.Cell>  
                                        <Button.Group>
                                            <Button>Edit</Button>
                                            <Button.Or />
                                            <Button negative>Delete</Button>
                                        </Button.Group>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                    
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                            <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                            <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Container>
    )
}