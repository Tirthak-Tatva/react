import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withTranslation } from "react-i18next";
import { IProps, IState } from "../api/types/stateProps";
import i18n from '../translations/config';
import { Popups } from '../component/popup'

class Employees extends React.Component<IProps, IState> {
  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.state = {
      employees: [],
      selectValue: [],
      isOpen: false
    };
  }
  public componentDidMount(): void {
    axios.get(`http://localhost:5000/employees`).then((data) => {
      this.setState({ employees: data.data });
    });
  }
  public deleteEmployee(id: number) {
    axios.delete(`http://localhost:5000/employees/${id}`).then(data => {
      const index = this.state.employees.findIndex(employee => employee.id === id);
      this.state.employees.splice(index, 1);
      this.props.history.push('/');
    })
  }
  handleChange = (selectValue: any) => {
    this.setState({ selectValue });
    console.log(selectValue.length);
  };
  setSelectValue = () => {
    console.log("hiii");
    this.setState({ selectValue: [] });
    console.log();
  }
  render() {
    const employees = this.state.employees;
    const { selectValue } = this.state;
    const options = employees.map((employee) => (employee.id));
    return (
      <>
        {i18n.t("hello")}
        <div className="container">
          <div className="row">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <th scope="col">
                      <Link
                        to={`Create/${employee.id}`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        <FontAwesomeIcon icon={faPlusSquare} />
                      </Link>
                    </th>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.password}</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="btn-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Link
                            to={`edit/${employee.id}`}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Edit Employee{" "}
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {if(window.confirm('Delete the item?')){this.deleteEmployee(employee.id)}}}
                              
                          >
                            Delete Employee
                          </button>
                          <Popups
                            first_name={employee.first_name}
                            employees={employees}
                            selectValue={selectValue}
                            id={employee.id}
                            handleChange={this.handleChange}
                            options={options}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div >
      </>
    );
  }
}

export default withTranslation()(Employees);
