import { useEffect, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { Form, Button, Container, Message } from 'semantic-ui-react'
import '../../css/main.css';
import CustomerService from '../../services/CustomerService'
import moment from 'moment'

export const NewCustomerComponent = () => {

    const history = useHistory()
    const location = useLocation()

    const customerDefault = {
        name: "",
        lastName: "",
        cellphone: "",
        address: "",
        zipCode: ""
    }

    const defaultError = {
        status: {
            nameStatus: '',
            lastNameStatus: '',
            cellphoneStatus: '',
            addressStatus: '',
            zipCodeStatus: ''
        },
        messages: {
            nameError: '',
            lastNameError: '',
            cellphoneError: '',
            addressError: '',
            zipCodeError: ''
        }
    }

    const [customer, setCustomer] = useState(customerDefault)
    const [error, setError] = useState(defaultError)
    const [isEditForm, setIsEditForm] = useState(false)
    const [idCustomer, setIdCustomer] = useState(0)

    useEffect(() => {
        const pathValues = location.pathname.split('/')

        if(pathValues[2]) {
            setIsEditForm(true)

            const customerId = pathValues[pathValues.length - 1]
        
            CustomerService.getById(customerId)
                .then(resp => {
                   // console.log(resp.data)
                    if(resp.data) {

                    }
                })
        }
    }, [location])

    const onCustomerSubmit = (e) => {
        e.preventDefault()

        const isDataValid =  customer.name !== null && customer.name !== '' 
                           && customer.lastName !== null && customer.lastName !== '' 
                           && customer.cellphone !== null && customer.cellphone !== '' 
                           && customer.address !== null && customer.address !== '' 
                           && customer.zipCode !== null && customer.zipCode !== '' 

        if(isDataValid)
        {
            const newCustomer = {
                name: customer.name,
                lastName: customer.lastName,
                cellphone: customer.cellphone,
                address: customer.address,
                zipCode: customer.zipCode                
                
            };
            if(isEditForm) {
                CustomerService.update(idCustomer, newCustomer)
                .then(resp => {
                    if(resp.data && resp.data.status) {
                        history.push('/customer')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                CustomerService.create(newCustomer)
                .then(resp => {
                    if(resp.data && resp.data.status) {
                        history.push('/customer')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
           
        } else {
            setError({
                status: {
                    nameStatus: customer.name === null || customer.name === '',
                    lastNameStatus: customer.lastName === null || customer.lastName === '',
                    cellphoneStatus: customer.cellphone === null || customer.cellphone === '',
                    addressStatus: customer.address === null || customer.address === '',
                    zipCodeStatus: customer.zipCode === null || customer.zipCode === ''
                },
                messages: {
                    nameMessage: customer.name === null || customer.name === ''? "Name empty is not valid!" : "",
                    lastNameMessage: customer.lastName === null || customer.lastName === ''? "Last Name empty is not valid!" : "",
                    cellphoneMessage: customer.cellphone === null || customer.cellphone === ''? "Cellphone empty is not valid!" : "",
                    addressMessage: customer.address === null || customer.address === ''? "Address empty is not valid!" : "",
                    zipCodeMessage: customer.zipCode === null || customer.zipCode === ''? "Zip Code empty is not valid!" : ""
                }
            })
        } 
    }

    const onHandleEventChangeName = (e) => {

    }

    const onHandleEventChangeLastName = (e) => {

    }

    const onHandleEventChangeCellphone = (e) => {

    }

    const onHandleEventChangeAddress = (e) => {

    }

    const onHandleEventChangeZipCode = (e) => {

    }

    return (
        <Container>
            <Form onSubmit={onCustomerSubmit}>
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
                        value={customer.name? customer.name : ''} 
                    />
                    {
                        error.status.nameStatus
                        ? <Message color='red'>{error.messages.nameMessage}</Message>
                        : '' 
                    }
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        className={error.status.lastNameStatus? 'is-danger': ''} 
                        onChange={onHandleEventChangeLastName}
                        placeholder='Last Name'
                        type='text'
                        value={customer.lastName? customer.lastName : ''} 
                    />
                    {
                        error.status.lastNameStatus
                        ? <Message color='red'>{error.messages.lastNameMessage}</Message>
                        : '' 
                    }
                </Form.Field>
                <Form.Field>
                    <label>Cellphone</label>
                    <input
                        className={error.status.cellphoneStatus? 'is-danger': ''} 
                        onChange={onHandleEventChangeCellphone}
                        placeholder='Cellphone'
                        type='text'
                        value={customer.cellphone? customer.cellphone : ''} 
                    />
                    {
                        error.status.cellphoneStatus
                        ? <Message color='red'>{error.messages.cellphoneMessage}</Message>
                        : '' 
                    }
                </Form.Field>
                <Form.Field>
                    <label>Address</label>
                    <input
                        className={error.status.addressStatus? 'is-danger': ''} 
                        onChange={onHandleEventChangeAddress}
                        placeholder='Address'
                        type='text'
                        value={customer.address? customer.address : ''} 
                    />
                    {
                        error.status.cellphoneStatus
                        ? <Message color='red'>{error.messages.addressMessage}</Message>
                        : '' 
                    }
                </Form.Field>
                <Form.Field>
                    <label>Zip Code</label>
                    <input
                        className={error.status.zipCodeStatus? 'is-danger': ''} 
                        onChange={onHandleEventChangeZipCode}
                        placeholder='Address'
                        type='text'
                        value={customer.zipCode? customer.zipCode : ''} 
                    />
                    {
                        error.status.zipCodeStatus
                        ? <Message color='red'>{error.messages.zipCodeMessage}</Message>
                        : '' 
                    }
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>    
    )
}