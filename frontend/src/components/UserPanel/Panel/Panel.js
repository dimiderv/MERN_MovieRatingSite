import React from 'react'
import styles from './Panel.module.css'
import { Row, Col, Button } from 'react-bootstrap'
import { UserEdit, Lock, ProfileCircle, Code1 } from "iconsax-react";
import { useState,useContext,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import UserCard from './UserCard/UserCard'
import UserInformation from './UserInformation/UserInformation'
import UserChangePassword from './UserChangePassword/UserChangePassword'
import Profile from './Profile/Profile';
import { axiosPrivate } from '../../../fetch/api/axios';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import AuthContext from '../../../context/AuthProvider';
import {useSelector} from "react-redux";
import {selectCurrentToken} from "../../../features/auth/authSlice";

function Panel() {
   const [userDetails,setUserDetails] = useState([]);
   const axiosPrivate = useAxiosPrivate();
   const [toggleState, setToggleState] = useState('information')
   const {auth} = useContext(AuthContext);
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "login";
   const token = useSelector(selectCurrentToken)
   useEffect(function () {
    async function fetchData() {

      try {
        const response = await axiosPrivate.get('http://localhost/user',{
          headers: {Authorization: `Bearer ${token}`}
        });
        //const resData = response;
        // response.birthday = "2023-09-01"
        // console.log(response.data)
        setUserDetails(response.data);
        
        // setSearch(resData.data.movies);

      } catch (err) {
        setError(
          err.message ||
            'Fetching goals failed - the server responded with an error.'
        );
        navigate(from, { state: { from: location }, replace: true });
      }
      
    }
    // console.log("ti ginetai re",auth)
    fetchData();
    
    
  }, [auth, axiosPrivate]);
//   console.log(userDetails.favorites)
    const {email,username,password,firstName,lastName,entryDate,birthday} = userDetails;
    // const birthday = "2001-09-01"
    
   const sidebarLinks = [
        {
            id: 1,
            border: true,
            text: 'Information',
            icon: <UserEdit size='20' color="black"/>,
            active: true,
        },
        {
            id: 2,
            border: true,
            text: 'Password',
            icon: <Lock size="20" color="black" />,
            active: false,
        },
        {
            id: 3,
            border: true,
            text: 'Profile',
            icon: <ProfileCircle size="20" color="black" />,
            active: false,
        },
        {
            id: 4,
            border: false,
            href: 'https://github.com/dimiderv',
            text: 'Github',
            icon: <Code1 size="20" color="black" />,
        }
    ]
    function changeToggle(toggle) {
        setToggleState(toggle )
    }
    function changeUserInformation(keyInfos, valInfos) {
        let newInfo = {}
        
        keyInfos.forEach((keyInfo, idx) => (
            newInfo[keyInfo] = valInfos[idx]
        ))

        this.setState(prev => {
            return {
                user: {
                    ...prev.user,
                    ...newInfo,
                }
            }
        })
    }
    const prevEmail = email;
    const loadingDiv = (
        <div className="d-flex justify-content-center">
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    return (
        <div className={`${styles['panel-wrapper']} d-flex align-items-center justify-content-center`}>
            {/* <div className={styles['bg-overlay']}></div> TODO */} 
            <div className={`${styles.container} d-flex justify-content-center align-items-center p-3 `}>
                <Row className={`${styles['panel']} flex-column flex-md-row justify-content-center align-items-center px-3`}>
                    <Col xs={12} sm={8} md={4} className="d-flex flex-column justify-content-center p-0 m-2">
                        <UserCard 
                            username={username} 
                            userBirthday={birthday} 
                            userEmail={email} 
                            memberSince = {entryDate?.split('T')[0]} 
                            sidebarLinks={sidebarLinks}
                            onChangeToggle={changeToggle}
                        />
                    </Col>
                    {/* ?.split('T')[0] */}
                    <Col xs={12} sm={8} md={7} className={`${styles['panel-column']} bg-white border mt-5 mt-md-0 ms-md-5 m-2 p-5`}>
                        {toggleState === 'information' && (
                            <UserInformation 
                                pEmail={prevEmail}
                                username={username}
                                firstName={firstName}
                                lastName={lastName}
                                email={email} 
                                birthday={birthday}
                                onChangeInfo={changeUserInformation}
                                changeFirstName={setUserDetails}
                            />
                        )}
                        {toggleState === 'password' && (
                            <UserChangePassword 
                                password={password}
                                onChangeInfo={"[asss"} 
                            />
                        )}
                        {toggleState === 'profile' && (
                            <Profile 
                                // password={"password"}
                                // onChangeInfo={"[asss"} 
                            />
                        )}
                    </Col>
                </Row>
            </div >
        </div>
    )
}

export default Panel