import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export interface IValues {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
class Create extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            team_id: this.props.match.params.id,
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    public render() {
        const { submitSuccess } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Employee </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new Employee
                        </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                        </div>
                    )}
                    <Formik
                        initialValues={this.state}
                        validationSchema={Yup.object().shape({
                            id: Yup.string()
                                .required('ID is required'),
                            first_name: Yup.string()
                                .required('First Name is required'),
                            last_name: Yup.string()
                                .required('Last Name is required'),
                            email: Yup.string()
                                .email('Email is invalid')
                                .required('Email is required'),
                            password: Yup.string()
                                .required('Password is required')
                                .min(6, 'Password must be at least 6 characters'),
                        })}
                        onSubmit={async values => {
                            this.setState({ loading: true });
                            const formData = {
                                id: values.id,
                                team_id: this.state.team_id,
                                first_name: values.first_name,
                                last_name: values.last_name,
                                email: values.email,
                                password: values.password,
                            }
                            this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
                            axios.post(`http://localhost:5000/employees`, formData).then(data => [
                                setTimeout(() => {
                                    this.props.history.push('/');
                                }, 1500)
                            ]);
                        }}>
                        {({ errors, touched, isSubmitting }) => {
                            return (
                                <Form>
                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <label>ID</label>
                                            <Field name="id" type="text" className={'form-control' + (errors.id && touched.id ? ' is-invalid' : '')} />
                                            <ErrorMessage name="id" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label>First Name</label>
                                            <Field name="first_name" type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} />
                                            <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label>Last Name</label>
                                            <Field name="last_name" type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} />
                                            <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                        </div>
                                        <div className="form-group col-6">
                                            <label>Email</label>
                                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                        </div>
                                    </div>
                                        <div className="form-group col-12">
                                            <label>Password</label>
                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </div>
                                    <div className="form-group">
                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Save
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        )
    }
}
export default withRouter(Create);