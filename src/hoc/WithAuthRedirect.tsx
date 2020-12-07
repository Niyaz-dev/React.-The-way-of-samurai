import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
})

type MapPropsType = ReturnType<typeof mapStateToPropsForRedirect>;

export function withAuthRedirect(WrappedComponent: React.ComponentType){
    let ConnectedAuthRedirectComponent:React.ComponentType = connect<MapPropsType,{},{},AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
    
    function RedirectComponent(props: any) {
        if (!props.isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <WrappedComponent {...props}/>
    }

    
    return ConnectedAuthRedirectComponent;
}