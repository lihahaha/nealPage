import React from 'react';

// import Login from './Login';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';

class App extends React.Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                </Switch>
            </BrowserRouter>
        )
    }
}
export default App;