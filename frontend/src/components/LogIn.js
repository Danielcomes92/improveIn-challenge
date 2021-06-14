import React, { useState } from 'react'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button'
import { ToastContainer, toast } from 'react-toastify'
import {connect} from "react-redux"
import authActions from '../redux/actions/authActions'
import 'react-toastify/dist/ReactToastify.css'
const LogIn = (props) => {
    const [eye, setEye] = useState(false)
    const [logUser, setLogUser] = useState({
        emailOrUsername: '',
        password: ''
    })
    const { emailOrUsername, password } = logUser;

    const readInputUser = (e) => {
        setLogUser({
            ...logUser,
            [e.target.name] : e.target.value
        })
    }
    
    const sendValueUser = async (e = null, googleUser = null) => {
        e && e.preventDefault()
        let userGen = e ? logUser : googleUser
        if(Object.values(userGen).some(value => value === "")){
            return toast.error('Fill in the fields')
        }
        const response = await props.logInUser(userGen)
        if(response.error){
            toast.error(response.error)
        }else{
            toast.success('Welcome '+ response.respuesta.name)
        }
    }
    
    const responseGoogle = (response) => {
        if(response.profileObj) {
            const { email, googleId } = response.profileObj
            let googleUser = {
                email,
                password: 'a'+googleId
            }    
            sendValueUser(null, googleUser)
        }
    }
    return (
        <>
             <div className='containerFormAndTitle'>
                <h1>Log in!</h1>
                <form className='containerForm'>
                    <div className="containerPassword">
                        <input className='input' type="text" placeholder="Please, enter your first name"
                        onChange={readInputUser} value={emailOrUsername} name="emailOrUsername" />
                    </div>
                    <div className="containerError"></div>
                    <div className="containerPassword">
                        <input className='input' type={eye ? "text" : "password"} placeholder="Please, enter your password" onChange={readInputUser} value={password} name="password" />
                        {eye ? <VisibilityOffOutlinedIcon className='eye' onClick={()=>setEye(!eye)} /> : <VisibilityOutlinedIcon className='eye' onClick={()=>setEye(!eye)}/>}
                    </div>
                    <span className="btnAction" onClick={sendValueUser}>Log in!</span>
                    <GoogleLogin
                        clientId="797066481226-9dnjrg2cid15atkm14oao3snmncl8q6u.apps.googleusercontent.com"
                        render={renderProps => (
                            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
                        )}
                        buttonText="Sign in with google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <div className='containerTextForm'>
                        <span onClick={()=> props.setCard(false)}>Don't have an account yet?, click here!</span>
                    </div>
                </form>
            </div>
            <ToastContainer />
            
        </>
    )
}

const mapDispatchToProps = {
    logInUser: authActions.logInUser
}

export default connect(null ,mapDispatchToProps)(LogIn)