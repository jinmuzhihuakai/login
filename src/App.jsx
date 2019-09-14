import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import routes from './config/routes';

class App extends Component {
    render() {
        return <Router>
            {/*<switch>*/}
            {/*<Route path="/" exact component={Home}></Route>*/}
            {/*<Route path="/login" component={Login}></Route>*/}

            {/*</switch>*/}
            {
                routes.map((route,index) => {
                    return <Route {...route} key={index}/>
                })
            }
        </Router>
    }
}

export default App;
