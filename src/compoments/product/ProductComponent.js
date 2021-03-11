import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Container, Header, Icon, Menu, Table, Button } from "semantic-ui-react"
import Moment from 'react-moment';

import ProductService from '../../services/ProductService'

export const ProductComponent = () => {

    const history = useHistory()

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
           //  console.log(productResp)
             if(productResp && productResp.productList.length > 0) {
                setProducts(productResp)
             }
         })
         .catch(e => {
             console.log(e)
         })
    }, [])

    const onCreactProductRedirect = () => {
        history.push('/new-product')
    }

    const onDeleteEvent = productId => {
        ProductService.remove(productId)
         .then(res => {
             console.log(res.data)
             if(res.data.status) {
                 alert(res.data.message)
                 history.go(0)
                //console.log(products)
                // const newProductList = products.productList.filter(x => x.id !== productId)
               // console.log(newProductList)
                // const currentProd = products
                // currentProd.productList = products.productList.filter(x => x.id !== productId)
                // console.log(currentProd);
                // setProducts(currentProd)

             }
         })
    }

    const onEditProduct = id => {
        history.push(`/new-product/${id}`)
    }

    return (
        <Container> 
            <Header as='h1'> <Icon name='briefcase'></Icon> List of Products </Header>
            <Button primary onClick={onCreactProductRedirect}> Create Product </Button>
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
                    {/* {
                        console.log(products.productList)
                    } */}
                    {
                        products.productList
                                .map(product => <Table.Row key={product.id}>
                                    <Table.Cell>{product.name}</Table.Cell>
                                    <Table.Cell>{product.price}</Table.Cell>
                                    <Table.Cell><Moment format="YYYY/MM/DD">{product.productDate}</Moment></Table.Cell>
                                    <Table.Cell>  
                                        <Button.Group>
                                            <Button
                                                onClick={() => onEditProduct(product.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button.Or />
                                            <Button 
                                                negative 
                                                onClick={() => onDeleteEvent(product.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Button.Group>
                                    </Table.Cell>
                                </Table.Row>)
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