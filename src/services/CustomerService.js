import http from '../config/HttpCommon'

const getAll = () => {
    return http.get(`/customers`)
}

const create = (Customer) => {
    return http.post('/customers')
}

const CustomerService = {
    getAll,
    saveCustomer: create
}

export default CustomerService;