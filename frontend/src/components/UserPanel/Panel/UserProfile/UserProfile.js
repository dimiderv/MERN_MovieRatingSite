// import styles of this component
import styles from './UserProfile.module.css'
// import other pkgs
import { Import } from 'iconsax-react'
import logo from './luffy.png';
const profile = ''

const UserProfile = ({ userProfile=logo, userBirthday, username, memberSince,userEmail }) => {
    // console.log(typeof memberSince)
    return (
       

        
        <div className={`${styles['user-profile']} d-flex flex-column align-items-center border bg-white`}>
            <label htmlFor="user-profile" className={styles['user-profile-label']}>
                <img src={userProfile} alt={userProfile} />
                <div className={`${styles['profile-icon-box']} bg-primary`}>
                    <Import size='20' color="white" />
                </div>
                <input type="file" className="d-none" id='user-profile' />
            </label>
            
            <h1 className={`${styles.username} mt-3`}> {username} </h1>
            <h3 className={`${styles.member} mt-1`}> Member since</h3>
            <h4 className={`${styles['member']}} mt-2`}>{memberSince} </h4>
            <h4 className={`${styles['user-birthday']} mt-1`}>🥳 {userBirthday} 🥳</h4>
            <h4 className={`${styles['user-email']} mt-1`}>{userEmail}</h4>

        </div>

    )
}

export default UserProfile