import { useEffect, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { Form, Button, Container, Message } from 'semantic-ui-react'
import './product.css';
import EmployeService from '../../services/EmployeService'
import moment from 'moment'

export const NewEmployeeComponent = () => {


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