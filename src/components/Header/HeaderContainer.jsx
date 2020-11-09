import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {getAuthUserData, logout} from "../../redux/auth-reducer";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component{
    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return (
            <Header {...this.props}/>
        );
    }

}

const mapStateTpProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});


export default connect(mapStateTpProps, {getAuthUserData,logout})(HeaderContainer);
