import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route,withRouter} from 'react-router-dom';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import {compose} from "redux";
import store from "./redux/redux-store";


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                        <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path="/news" component={News}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/music" component={Music}/>
                        <Route path="/login" component={Login}/>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

let AppContainer = compose( 
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = (props) => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
}

export default SamuraiJSApp;