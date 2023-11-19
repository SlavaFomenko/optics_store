import React, {useState} from 'react';
import Login from "./Login/Login";

function Autorization(props) {
    const [isRegisteredUser,setIsRegisteredUser] = useState(true)
    return (
        isRegisteredUser?
            (
                <Login setIsRegisteredUser={setIsRegisteredUser}/>
            )
            :
            (<h1>Noo</h1>)
    );
}

export default Autorization;