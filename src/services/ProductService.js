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

const update = (id, newProduct) => {
    return http.put(`/products/${id}`, newProduct)
}

const ProductService = {
    getAll,
    remove,
    create,
    getById,
    update
}

export default ProductService