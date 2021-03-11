import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Container, Header, Icon, Menu, Table, Button } from "semantic-ui-react"
import EmployeeService from "../../services/EmployeService";

export const EmployeeComponent = () => {

    const history = useHistory()

    const initialEmploye = {
            status: false,
            errorCode: 0,
            message: "",
            employeeList: []
    }

    const [employees, setEmployees] = useState(initialEmploye)

    useEffect(() => {
        EmployeeService.getAll()
         .then(resp => {
             const employeeResp = resp.data
             if(employeeResp && employeeResp.employeeList.length > 0) {
                setEmployees(employeeResp)
             }
         })
         .catch(e => {
             console.log(e)
         })
    }, [])

    const onCreateEmployeeRedirect = () => {
        history.push('/new-employee')
    }
    return (
        <Container> 
            <Header as='h1'> <Icon name='briefcase'></Icon> List of Empoloyee </Header>
            <Button primary onClick={onCreateEmployeeRedirect}> Create Employee </Button>
            <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        employees.employeeList.map(employee => {
                            return (
                                <Table.Row key={employee.id}>
                                    <Table.Cell>{employee.name}</Table.Cell>
                                    <Table.Cell>{employee.price}</Table.Cell>
                                    <Table.Cell>{employee.productDate}</Table.Cell>
                                    <Table.Cell>  
                                        <Button.Group>
                                            <Button>Edit</Button>
                                            <Button.Or />
                                            <Button negative>Delete</Button>
                                        </Button.Group>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                    
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                            <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                            <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Container>
    )
}