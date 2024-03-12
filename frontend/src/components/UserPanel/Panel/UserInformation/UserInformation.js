import { useContext, useEffect, useState } from 'react';

// import other component
import FormInput from '../../Forms/FormInput/FormInput';
import Titles from '../../Titles/Titles';
import AuthContext from '../../../../context/AuthProvider';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
// import other pkg
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { object, string, date } from 'yup'
import {useUpdateUserDetailsMutation} from "../../../../features/auth/authApiSlice";




const UserInformation = ({ username , firstName, lastName, email, birthday, onChangeInfo,changeFirstName }) => {
    const [submit, setSubmit] = useState(false)
    const [userName, setUserName] = useState("")
    const [details,setDetails] =useState("");
    const [prevEmail, setPrevEmail] = useState("");
    const {auth} = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(false)
    const [updateUserDetails, {isLoading}]=useUpdateUserDetailsMutation()
    const formik = useFormik({
        initialValues: {
            firstName: firstName ? firstName : '',
            lastName: lastName ? lastName : '',
            email,
            birthday,
        },
        validationSchema: object({
            firstName: string().max(10, 'your fisrt name must be 10 or less'),
            lastName: string().max(10, 'your fisrt name must be 10 or less'),
            email: string().required('please enter your email').email('invalid email'),
            birthday: string(),
        }),
        onSubmit: ({ firstName, lastName, email, birthday }, { setFieldError }) => {

            
        //     if (boolIsIterateEmail) {
        //         if (!firstName && !lastName) {
        //             onChangeInfo(
        //                 ['firstName', 'lastName', 'email', 'birthday'], 
        //                 ['', '', email, birthday]
        //             )
        //         } else if (!firstName) {
        //             onChangeInfo(
        //                 ['firstName' , 'lastName', 'email', 'birthday'],
        //                 ['', lastName, email, birthday]
        //             )
        //         } else if (!lastName) {
        //             onChangeInfo(changeUserInformation
        //         } else {
        //             onChangeInfo(
        //                 ['firstName', 'lastName', 'email', 'birthday'],
        //                 [firstName, lastName, email, birthday]
        //             )
        //         }
        //     } else 
        //         setFieldError('email', "you can't choose this email")
        }
    })
    function handleFirstNameChange(e) {
        let x=e.target.value
        changeFirstName(prev =>({...prev,firstName: x}))
        //setUserName(x)
    }
    function handleLastNameChange(e) {
        let x=e.target.value
        changeFirstName(prev =>({...prev,lastName: x}))
        //setUserName(x)
    }
    function handleEmailChange(e) {
        let x=e.target.value
        changeFirstName(prev =>({...prev,email: x}))
        //setUserName(x)
    }
    function handleDateChange(e) {
        let x=e.target.value
        console.log(x)
        changeFirstName( prev=> ({...prev,birthday:x}))
        //setUserName(x)
        
    }
    function handlePrevEmail(emailP){
        changeFirstName(prev =>({...prev, email:emailP}))
    }
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    async function handleSubmit() {
      const dataObj = {
        'firstName': firstName,
        'lastName':lastName,
        'birthday':birthday,
        'email':email
      }
      setSubmit(true)
      setLoading(true);
      async function postDetails (){
            try{
                const responsE = await updateUserDetails({'dataObj':dataObj}).unwrap()
                // const responsE = await axiosPrivate.post('/updateUserDetails',
                // JSON.stringify({'dataObj':dataObj}),
                // {
                //     headers: {"Content-Type": 'application/json'},
                //     withCredentials: true
                // });
                const resData = responsE;
                alert(resData.message)
            }catch(err){

                alert(err.data.message)
                setSubmit(false)
                handlePrevEmail(err.data.prevEmail)
                
                
            }
        }
        postDetails();
      await delay(1000);
      setLoading(false);
    }
    const loadingDiv = (
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    

    return loading? loadingDiv :(
        <>
            <Titles title='Welcome to the Information' text="check or change your information as you want" />
            
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Row className="mt-5 px-3 ">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-1"
                        name="firstName"
                        controlId="first-name-input"
                        text="First Name"
                        placeholder={firstName}
                        value={firstName}
                        onChange={(e)=>handleFirstNameChange(e)}
                        size='sm'
                        invalid={formik.values.firstName === '' ? false : (
                            submit && formik.errors.firstName ? true : false
                        )}
                        errMsg={formik.errors.firstName || ''}
                        valid={formik.values.firstName === '' ? false : (
                            submit && !formik.errors.firstName ? true : false
                        )}
                        successMsg="done"
                        // {...formik.getFieldProps('firstName')}
                    />
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-1 ms-lg-5 mt-3 mt-lg-0"
                        name="lastName"
                        controlId="last-name-input"
                        text="Last Name"
                        placeholder={lastName}
                        value={lastName}
                        onChange={(e)=>handleLastNameChange(e)}
                        size='sm'
                        invalid={formik.values.lastName === '' ? false : (
                            submit && formik.errors.lastName ? true : false
                        )}
                        errMsg={formik.errors.lastName || ''}
                        valid={formik.values.lastName === '' ? false : (
                            submit && !formik.errors.lastName ? true : false
                        )}
                        successMsg="done"
                        // {...formik.getFieldProps('lastName')}
                    />
                </Row>

                <Row className="mt-3 mt-lg-4 px-3">
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-1"
                        name="email"
                        controlId="email-input"
                        text="Email"
                        placeholder={email}
                        value={email}
                        onChange={(e)=>handleEmailChange(e)}
                        size='sm'
                        errMsg={formik.errors.email || ''}
                        successMsg="done"
                        invalid={submit && formik.errors.email ? true : false}
                        valid={submit && !formik.errors.email ? true : false}
                        // {...formik.getFieldProps('email')}
                    />
                    <FormInput 
                        xs={12}
                        lg
                        as={Col}
                        inpClass='py-2'
                        className="p-1 ms-lg-5 mt-3 mt-lg-0"
                        name="birthday"
                        controlId="birthday-input"
                        text="birthday"
                        size='sm'
                        placeholder={birthday}
                        type="date"
                        value={birthday}
                        onChange={(e)=>handleDateChange(e)}
                        invalid={submit && formik.errors.birthday ? true : false}
                        errMsg={formik.errors.birthday || ''}
                        valid={submit && !formik.errors.birthday ? true : false}
                        successMsg="done"
                        // {...formik.getFieldProps('birthday')}
                    />
                </Row>
                
                <Button 
                    onClick={() => {setSubmit(true) ;handleSubmit()}}
                    disabled={submit && !formik.isValid ? true : false}
                    variant="primary" className='mt-5 py-2 px-4'
                    type="submit">
                    Update
                </Button>
            </Form>
        </>
    )
}


export default UserInformation