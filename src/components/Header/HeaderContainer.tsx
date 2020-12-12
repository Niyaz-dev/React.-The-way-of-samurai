import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import Header, {DispatchPropsType, MapPropsType} from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {authAPI} from "../../api/auth-api";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType>{

    render() {
        return (
            <Header {...this.props}/>
        );
    }

}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});


export default connect<MapPropsType,DispatchPropsType,{}, AppStateType>(mapStateToProps, {logout})(HeaderContainer);
