import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    clearProfile,
    getStatus,
    getUserProfile,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    getUserProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    clearProfile: () => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

    getUserId() {
        let userId: number | null = +this.props.match.params.userId;
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

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    componentWillUnmount() {
        this.props.clearProfile();
    }

    render() {
        // if(!this.props.isAuth) {
        //     return <Redirect to={"/login"}/>
        // }
        return (
            <Profile key={this.getUserId()} {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     isOwner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto}
            />
    );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, clearProfile, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);