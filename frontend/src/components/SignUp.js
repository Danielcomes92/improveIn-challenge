import { useEffect, useState } from "react"
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'
import {connect} from "react-redux"
import authActions from '../redux/actions/authActions'
import GoogleLogin from 'react-google-login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GoogleButton from 'react-google-button'

const SignUp = (props) => { 
    const [user, setUser] = useState({name: '', userName: '', email: '', password: ''})
    const [eye, setEye] = useState(false)
    const [mistakes, setMistakes] = useState({name: '', userName: '', email: '', password: ''})
    useEffect(()=>{
        window.scrollTo(0,0)
    },[props.userLogged])

    const readInputUser = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        })
    }

    const sendValueUser = async (e = null, googleUser = null) => {
        setMistakes({name: '', userName: '', email: '', password: ''})
        e && e.preventDefault()
        let userGen = e ? user : googleUser
        
        if(Object.values(userGen).some(value => value === "")){
            return toast.error('Fill in the fields')
        }
        const response = await props.createUser(userGen)
        
        if(response){
            if(response.controllers){
                if(response.controllers === "There was an error in the user engraving. Retry"){
                    return toast.error(response.controllers)
                }
                return setMistakes({'email': response.controllers})
            }
            response.map(error => setMistakes((prevState) =>{ 
                return {...prevState, [error.context.label]: error.message}
             }))
        }else{
            toast.success(`Welcome ${userGen.name}`)
        }
    }
    const responseGoogle = (response) => {
        const {givenName, familyName, email, googleId} = response.profileObj
        sendValueUser(null, {name: givenName, userName: familyName , email, password: "a"+googleId, google: true})
    }
    return(
        <>
            <div className='containerFormAndTitle'>
                <h1>SIGN UP</h1>
                <form className='containerForm'>
                    <div className='containerPassword'>
                            <input className='input' type="text" placeholder="Your first name"
                            onChange={readInputUser} value={user.name} name="name" />
                    </div>
                    <div className='containerError'>
                        {mistakes.name ? <span className='error'>{mistakes.name}</span> : null} 
                    </div>
                    <div className='containerPassword'>
                            <input className='input' type="text" placeholder="Your user name"
                            onChange={readInputUser} value={user.userName} name="userName" />
                    </div>
                    <div className='containerError'>
                        {mistakes.userName ? <span className='error'>{mistakes.userName}</span> : null} 
                    </div>
                    <div className='containerPassword'>
                            <input className='input' type="text" placeholder="Your email adress"
                            onChange={readInputUser} value={user.email} name="email" />
                    </div>
                    <div className='containerError'>
                        {mistakes.email ? <span className='error'>{mistakes.email}</span> : null} 
                    </div>
                    <div className='containerPassword'>
                        <input className='input' type={eye ? "text" : "password"} placeholder="Your password"
                        onChange={readInputUser} value={user.password} name="password" />
                        {eye ? <VisibilityOffOutlinedIcon className='eye' onClick={()=>setEye(!eye)} /> : <VisibilityOutlinedIcon className='eye' onClick={()=>setEye(!eye)}/>}
                    </div>
                    <div className='containerError'>
                        {mistakes.password ? <span className='error'>{mistakes.password}</span> : null} 
                    </div>
                    <span className="btnAction" onClick={sendValueUser}>Sign up</span>
                    <GoogleLogin
                        clientId="797066481226-9dnjrg2cid15atkm14oao3snmncl8q6u.apps.googleusercontent.com"
                        render={renderProps => (
                            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign up with Google</GoogleButton>
                        )}
                        buttonText="Sign up with google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <div className='containerTextForm'>
                        <span onClick={()=> props.setCard(true)}> Already have an account?</span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

const mapStateToProps = state =>{
    return{
      userLogged: state.userLogged
    }
}

const mapDispatchToProps = {
    createUser: authActions.createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)