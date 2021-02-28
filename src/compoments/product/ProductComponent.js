import { useEffect, useState } from "react"
import { Container, Header, Icon, Menu, Table, Button } from "semantic-ui-react"
import ProductService from '../../services/ProductService'

export const ProductComponent = () => {

    const initialProducts = {
            status: false,
            errorCode: 0,
            message: "",
            productList: []
    }

    const [products, setProducts] = useState(initialProducts)

    useEffect(() => {
        ProductService.getAll()
         .then(resp => {
             const productResp = resp.data
             if(productResp && productResp.productList.length > 0) {
                setProducts(productResp)
             }
         })
         .catch(e => {
             console.log(e)
         })
    }, [])

    return (
        <Container> 
            <Header as='h1'> <Icon name='briefcase'></Icon> List of Products </Header>
            <Button primary> Create </Button>
            <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        products.productList.map(product => {
                            return (
                                <Table.Row key={product.id}>
                                    <Table.Cell>{product.name}</Table.Cell>
                                    <Table.Cell>{product.price}</Table.Cell>
                                    <Table.Cell>{product.productDate}</Table.Cell>
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