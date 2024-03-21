import { useState } from 'react';

// import other component
import Titles from '../../Titles/Titles'
import FormInput from '../../Forms/FormInput/FormInput'
import { Form, Button } from 'react-bootstrap'
import { useFormik, } from 'formik'
import { string, object, ref } from 'yup'

import {useUpdatePasswordMutation} from "../../../../features/auth/authApiSlice";

const UserChangePassword = ({ password, onChangeInfo }) => {
    const [submit, setSubmit] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [matchPassword, setMatchPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [updatePassword] = useUpdatePasswordMutation()
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            matchPassword: '',
          },
        //   the matchPassword message shows when we start typing. Should fix that.
        validationSchema: object({
            currentPassword: string().required('please enter your current password')
                .min(4, 'your current password must be 4 characters or more'),
                // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/, 'invalid password'),
                
            newPassword: string().required('please enter your new password')
                .min(4, 'your new password must be 4 characters or more')
                .test('not-same-as-current', 'New password must be different from the current one', function (value) {
                    // Access form values using formik.values
                    return value !== formik.values.currentPassword;
                  }),
                //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/, 'invalid password'),

            matchPassword: string().required('please confirm new password')
                // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/, 'invalid password')
                .oneOf([ref('newPassword')], 'password must match'),

        }),
       onSubmit: async (values,actions) => {
        const dataObj = {
            'currentPassword': formik.values.currentPassword,
            'newPassword': formik.values.newPassword,
        }
        setSubmit(true)
        setLoading(true)
        async function postPassword(){

            console.log(dataObj)
            try{
                const response = await updatePassword({'dataObj':dataObj}).unwrap()
                    const resData = response;
                    console.log(resData)
                    console.log(resData.message)
                    alert(resData?.message)
                    actions.resetForm()
            }catch(err){
                alert(err.data.message)
                setSubmit(false)
                // setCurrentPassword('')
                // setMatchPassword('')
                // setNewPassword('')
                actions.resetForm()
            }
    
        }
        postPassword()
        await delay(1000);
        setLoading(false)


    },
        });
   
    // useEffect(()=>{
    //     console.log(newPassword,matchPassword,currentPassword)
    // },[newPassword,matchPassword,currentPassword])
    function handleCurrentChange(e){
        setCurrentPassword(e.target.value)
    }
    function handleNewChange(e){
        setNewPassword(e.target.value)
    }
    function handleMatchChange(e){
        setMatchPassword(e.target.value)
    }

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const loadingDiv = (
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    //   console.log('currentPassword:', currentPassword);
    //   console.log('newPassword:', newPassword);
    //   console.log('matchPassword:', matchPassword);
    //   console.log('formik values:', formik.values);
    //   console.log('formik errors:', formik.errors);
    //   console.log('formik errors:',  formik.values.currentPassword.le>0);
    console.log("reprints")

    return loading? loadingDiv :(    
        <>
            <Titles title="Welcome to the change password" text="change your password as you want" />
        
            <Form className="mt-5" noValidate onSubmit={formik.handleSubmit}>
                <FormInput 
                    type="Password"
                    className="p-0"
                    inpClass='px-3 py-2'
                    name="currentPassword"
                    controlId="current-password-input"
                    text="Current Password"
                    // placeholder="Enter your Current Password"
                    value={currentPassword}
                    onChange={(e)=>handleCurrentChange(e)}
                    valid={!formik.errors.currentPassword && formik.values.currentPassword.length>0 ? true : false}
                    errMsg={formik.errors.currentPassword || ''}
                    invalid={submit && formik.errors.currentPassword ? true : false}
                    successMsg="done"
                    {...formik.getFieldProps('currentPassword')}
                />
                <FormInput 
                    type="password"
                    inpClass='px-3 py-2'
                    className="p-0 mt-3"
                    name="newPassword"
                    controlId="new-password-input"
                    text="New Password"
                    value={newPassword}
                    onChange={(e)=>handleNewChange(e)}
                    placeholder="Enter your New Password"
                    valid={!formik.errors.newPassword && formik.values.newPassword.length>0? true : false}
                    errMsg={formik.errors.newPassword || ''}
                    invalid={formik.errors.newPassword ? true : false} //submit && formik.errors.newPassword
                    successMsg="done"
                    {...formik.getFieldProps('newPassword')}
                />
                <FormInput 
                    type="password"
                    inpClass='px-3 py-2'
                    className="p-0 mt-3"
                    name="matchPassword"
                    controlId="confirm-new-password-input"
                    text="Confirm New Password"
                    value={matchPassword}
                    onChange={(e)=>handleMatchChange(e)}
                    placeholder="Confirm New Password"
                    valid={!formik.errors.matchPassword && formik.values.matchPassword.length>0? true : false}
                    errMsg={formik.errors.matchPassword || ''}
                    invalid={formik.errors.matchPassword ? true : false}
                    successMsg="done"
                    {...formik.getFieldProps('matchPassword')}
                />
                <Button 
                    variant="primary" 
                    disabled={!formik.isValid || formik.values.newPassword !== formik.values.matchPassword || loading}




                    className='mt-5 py-2 px-4' 
                    type="submit" 
         >
                    Update
                </Button>
            </Form>
        </>
    )
}

export default UserChangePassword