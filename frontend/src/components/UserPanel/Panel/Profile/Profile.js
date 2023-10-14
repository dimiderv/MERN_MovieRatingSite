import React from "react";
import styles from './Profile.module.css'


const desc = `Hi,I am interested in Drama, Comedies and Action movies. Not a big fan of long series but I have a soft spot for "The Office" and "Friends". My favorite actors are Megan Fox and Vin Diesel. I can talk for hours about anime and video games.`;

function Profile() {
  return (
    <div>
        
        <div className={`${styles['description']} `}>
        <h3
        className="text-black">Info</h3>
        {desc}
        </div>

    </div>
  );
}

export default Profile;
