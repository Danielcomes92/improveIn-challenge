import React, {useState} from 'react'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'

const Auth = () => {
    const [card, setCard] = useState(true)
    return (
        <div className="mainAuthContainer">
            <div className="accessContainer">
            {
                card ? <LogIn setCard={setCard}/> : <SignUp setCard={setCard}/>
            }
            </div>
        </div>
    )
}
export default Auth;