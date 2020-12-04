import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Profile from "./Profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {
    clearProfile,
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfile,
    setStatus,
    updateStatus
} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    getUserId() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        return userId;
    }

    refreshProfile() {
        let userId = this.getUserId();
        if (!userId) {
            this.props.history.push("/login");
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    componentWillUnmount() {
        this.props.clearProfile();
    }

    render() {
        if(!this.props.isAuth) {
            return <Redirect to={"/login"}/>
        }
        return (
            <Profile key={this.getUserId()} {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}/>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, clearProfile, savePhoto, saveProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);