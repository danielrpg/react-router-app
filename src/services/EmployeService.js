import http from '../config/HttpCommon'

const getAll = () => {
    return http.get(`/employees`)
}

const remove = (id) => {
    return http.delete(`/employees/${id}`)
}


const EmployeeService = {
    getAll,
    remove
}

export default EmployeeService;