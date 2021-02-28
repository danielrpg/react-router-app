import http from '../config/HttpCommon'

const getAll = () => {
    return http.get(`/products`)
}

const remove = (id) => {
    return http.delete(`/products/${id}`)
}


export default {
    getAll,
    remove
}