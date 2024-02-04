import { useParams, useNavigate } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContenxt"
import { useEffect } from "react"
import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import moment from "moment"

export function TodoComponent() {

    const { id } = useParams()
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    useEffect(() => retrieveTodos(), [id])

    function retrieveTodos() {

        if (id != -1) {
            retrieveTodoApi(username, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {

        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false,
        }

        if(id == -1){
            createTodoApi(username, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
        else{
            updateTodoApi(username, id, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
  
    }

    function validate(values) {
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid date'
        }

        if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 chars'
        }
        if (values.targetDate.length === null || values.targetDate=='' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter future date'
        }
        return errors
    }

    return (
        <div className="container">
            <h1>Enter todo details</h1>
            <Formik initialValues={{ description, targetDate }}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate" />
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}