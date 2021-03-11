import http from '../config/HttpCommon'

const getAll = () => {
    return http.get(`/products`)
}

const create = product => {
    return http.post(`/products`, product)
}

const remove = (id) => {
    return http.delete(`/products/${id}`)
}

const getById = id => {
    return http.get(`/products/${id}`)
}


const ProductService = {
    getAll,
    remove,
    create,
    getById
}

export default ProductService