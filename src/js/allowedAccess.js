import {Redirect, Route} from 'react-router-dom'; 

const AllowedAccess = ({component: Component, isAuth, thePath, ...rest}) => (
  isAuth ? <Route path={thePath} component={Component} /> : 
  (isAuth == false) ?  <Redirect to='/' /> : null
);

export default AllowedAccess;