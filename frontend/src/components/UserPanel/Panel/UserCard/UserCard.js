// import other component 
import UserProfile from '../UserProfile/UserProfile'
import SideBarLinks from '../SideBarLinks/SideBarLinks'

const UserCard = ({ sidebarLinks, username, userBirthday, userEmail, memberSince, onChangeToggle }) => {
    return (
        <>
            <UserProfile memberSince={memberSince} username={username} userBirthday={userBirthday} userEmail={userEmail} />
            <SideBarLinks sidebarLinks={sidebarLinks} onChangeToggle={onChangeToggle} />
        </>
    )
}

export default UserCard