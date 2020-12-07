import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {authAPI} from "../../api/auth-api";

class HeaderContainer extends React.Component{

    render() {
        return (
            <Header {...this.props}/>
        );
    }

}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});


export default connect(mapStateToProps, {logout})(HeaderContainer);
