import http from '../config/HttpCommon'

const getAll = () => {
    return http.get(`/customers`)
}

const getById = id => {
    return http.get(`/customers/${id}`)
}

const create = (newCustomer) => {
    return http.post(`/customers`, newCustomer)
}

const update = (id, updateCustomer) => {
    return http.put(`/customers/${id}`, updateCustomer)
}

const remove = id => {
    return http.delete(`/customers/${id}`)
}

const CustomerService = {
    getAll,
    saveCustomer: create,
    update,
    remove,
    getById
}

export default CustomerService;