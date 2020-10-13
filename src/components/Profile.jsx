import React from 'react';
import s from './Profile.module.css'


const Profile = () => {
    return (
        <div className={s.content}>
        <div>
          <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt="" />
        </div>
        <div>
          ava + description
        </div>
        <div>
          My posts
          <div>
            New post
          </div>
          <div>
            <div>post1</div>
            <div>post2</div> 
          </div>
        </div>
      </div>
    );
}

export default Profile;