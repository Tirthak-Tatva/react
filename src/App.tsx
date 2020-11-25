import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import Employees from './components/Employees';
import Create from './components/Employees/Create';
import EditCustomer from './components/Employees/Edit';
import Navbar from './header/navbar';
import "../node_modules/bootstrap/dist/css/bootstrap.css";

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path={'/'} exact component={Employees} />
          <Route path={'/create/:id'} exact component={Create} />
          <Route path={'/edit/:id'} exact component={EditCustomer} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);