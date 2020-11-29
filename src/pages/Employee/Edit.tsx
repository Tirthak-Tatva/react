import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import ValidationFormSchema from '../../validationSchema/ValidationFormSchema';
import { withTranslation } from 'react-i18next';
import i18n from '../../translations/config';

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: number,
    employee: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
class EditEmployee extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            employee: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/employees/${this.state.id}`).then(data => {
            this.setState({ employee: data.data });
        })
    }
    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/employees/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }
    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }
    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <>
                {i18n.t("hello")}
                <div className={"col-md-12 form-wrapper"}>
                    <h1> Employee Details Edit</h1>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to edit Employee
                        </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Employee's details has been edited successfully
                        </div>
                    )}
                    <Formik
                        initialValues={this.state.employee}
                        validationSchema={ValidationFormSchema}
                        onSubmit={async => {
                            this.setState({ loading: true });
                            axios.patch(`http://localhost:5000/employees/${this.state.id}`, this.state.values).then(data => {
                                this.setState({ submitSuccess: true, loading: false })
                                setTimeout(() => {
                                    this.props.history.push('/');
                                }, 1500)
                            })
                        }}>

                        {({ errors, touched }) => {
                            return (
                                <Form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="first_name"> First Name </label>
                                        <input type="text" id="first_name" defaultValue={this.state.employee.first_name} onChange={(e) => this.handleInputChanges(e)} name="first_name" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} placeholder="Enter employee's first name" />
                                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="last_name"> Last Name </label>
                                        <input type="text" id="last_name" defaultValue={this.state.employee.last_name} onChange={(e) => this.handleInputChanges(e)} name="last_name" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} placeholder="Enter employee's last name" />
                                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="email"> Email </label>
                                        <input type="email" id="email" defaultValue={this.state.employee.email} onChange={(e) => this.handleInputChanges(e)} name="email" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} placeholder="Enter employee's email address" />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="password"> Password </label>
                                        <input type="password" id="password" defaultValue={this.state.employee.password} onChange={(e) => this.handleInputChanges(e)} name="password" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} placeholder="Enter employee's password number" />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Employee </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </>
        )
    }
}
export default withRouter(EditEmployee);





