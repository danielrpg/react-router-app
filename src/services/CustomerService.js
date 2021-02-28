import http from '../config/HttpCommon'

const getAll = () => {
    return http.get(`/customers`)
}

export default {
    getAll
}