import { useEffect, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { Form, Button, Container, Message } from 'semantic-ui-react'
import './product.css';
import ProductService from '../../services/ProductService'
import moment from 'moment'

export const NewProductComponent = () => {
    //const nameInput = useRef('')

    const history = useHistory()
    const location = useLocation()

    const defaultError = {
        status: {
            priceStatus: false,
            nameStatus: false,
            productDateStatus: false
        },
        messages: {
            nameMessage: "",
            priceMessage: "",
            productDateMessage: ""
        }
    }
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(0)
    const [productDate, setProductDate] = useState(null)
    const [idProduct, setIdProduct] = useState(0)
    const [error, setError] = useState(defaultError)
    const [isEditForm, setIsEditForm] = useState(false)

    useEffect(() => {
        const pathValues = location.pathname.split('/')

        if(pathValues[2]) {
            setIsEditForm(true)

            const productId = pathValues[pathValues.length - 1]
        
            ProductService.getById(productId)
                .then(resp => {
                   // console.log(resp.data)
                    if(resp.data) {
                        const productData = resp.data.productList[0]
                        setIdProduct(productData.id)
                        setName(productData.name)
                        setPrice(productData.price)
                        setProductDate(moment(productData.productDate).format('YYYY-MM-DD'))
                    }
                })
        }
    }, [location])

    const onProductSubmit = (e) => {
        e.preventDefault()

        const isDataValid =  name !== null && name !== '' && price > 0 && productDate !== null & productDate !== ''

        if(isDataValid)
        {
            const newProduct = {
                name,
                price,
                productDate
            };
            if(isEditForm) {
                ProductService.update(idProduct, newProduct)
                .then(resp => {
                    if(resp.data && resp.data.status) {
                        history.push('/product')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                ProductService.create(newProduct)
                .then(resp => {
                    if(resp.data && resp.data.status) {
                        history.push('/product')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
           
        } else {
            setError({
                status: {
                    priceStatus: price <= 0,
                    nameStatus: name === null || name === '',
                    productDateStatus: productDate === null || productDate  === ''
                },
                messages: {
                    nameMessage: name === null || name === ''? "Name empty is not valid!" : "",
                    priceMessage: price <= 0? "Price is not valid!" : "",
                    productDateMessage: productDate === null || productDate  === ''? "Date is not valid!": ""
                }
            })
        } 
    }

    const onHandleEventChangeName = (e) => {
        //console.log(e.target.value)
       // if ( e.target.value === '') return 
        
        const newName = e.target.value
        setName(newName)
        // setError({
        //     status: {
        //         priceStatus: false,
        //         nameStatus: false,
        //         productDateStatus: false
        //     },
        //     messages: {
        //         nameMessage: "",
        //         priceMessage: "",
        //         productDateMessage: ""
        //     }
        // })
        const currentError = error
      //  console.log(currentError)
        currentError.status.nameStatus = false
        currentError.messages.nameMessage = ''
        //console.log(currentError)
        setError(currentError)
        //console.log(error)

    }

    const onHandleEventChangePrice = (e) => {
        const newPrice = e.target.value
        setPrice(newPrice)

        const currentError = error    
        currentError.status.priceStatus = false
        currentError.messages.priceMessage = ''
        setError(currentError)
    }

    const onHandleEventChangeProductDateStatus = (e) => {
        const newProductDate = e.target.value
        setProductDate(newProductDate)

        const currentError = error    
        currentError.status.productDateStatus = false
        currentError.messages.productDateMessage = ''
        setError(currentError)
    }

    return (
        <Container>
            <Form onSubmit={onProductSubmit}>
                <Form.Field>
                    <label>Name</label>
                    {/* <input placeholder='Name' required ref={nameInput} /> */
                      // console.log(error)
                    }
                    <input
                        className={error.status.nameStatus? 'is-danger': ''} 
                        onChange={onHandleEventChangeName}
                        placeholder='Name'
                        type='text'
                        value={name? name : ''} 
                    />
                    {
                        error.status.nameStatus
                        ? <Message color='red'>{error.messages.nameMessage}</Message>
                        : '' 
                    }
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input
                        className={error.status.priceStatus? 'is-danger': ''}  
                        onChange={onHandleEventChangePrice}
                        placeholder='Price' 
                        type='number'
                        value={price} 
                    />
                    {
                        error.status.priceStatus 
                        ? <Message color='red'>{error.messages.priceMessage}</Message>
                        : '' 
                    }
                </Form.Field>
                <Form.Field>
                    <label>Date</label>
                    <input 
                        id='productDate'
                        className={error.status.productDateStatus? 'is-danger': ''} 
                        onChange={onHandleEventChangeProductDateStatus}
                        placeholder='Date'
                        type='date'
                        value={productDate? productDate : ''}  
                    />
                    {
                        error.status.productDateStatus 
                        ? <Message color='red'>{error.messages.productDateMessage}</Message>
                        : '' 
                    }
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>    
    )
}