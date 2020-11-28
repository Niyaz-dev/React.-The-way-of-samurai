import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from "../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png'
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);
    
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={(props.profile && props.profile.photos && props.profile.photos.large) ? props.profile.photos.large : userPhoto}
                     className={(props.profile && props.profile.photos && props.profile.photos.large) ? s.mainPhoto : s.mainAvatar}/>
                {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                {editMode ? 
                    <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> : 
                    <ProfileData profile={props.profile} 
                                 isOwner={props.isOwner}
                                 goToEditMode={() => {setEditMode(true)} }
                    />}
                

                <ProfileStatusWithHooks updateStatus={props.updateStatus} status={props.status}/>
            </div>
        </div>
    );
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    console.log(profile)
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
            }
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>

            })}
            </div>
        </div>)
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;