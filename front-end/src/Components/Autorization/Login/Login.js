import React, {useContext, useState} from 'react';
import styles from './Login.module.css'
import UserContext from "../../../Context/UserContext";

const Login = () => {
    const [login,setLogin] = useState('')
    const [password,setPassword]=useState('')
    const [msgFail,setMsgFail] = useState(false)
    const context = useContext(UserContext)

    const sendDataToServer = () => {

        if(password === '' || login === ''){
            return
        }
        // Создаем объект XMLHttpRequest
        const xhr = new XMLHttpRequest();

// Настраиваем запрос
        const url = "/check/user/validate";
        const jsonData = {
            login: login,
            password: password
        };
        const jsonString = JSON.stringify(jsonData);
        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function () {
            console.log(xhr)
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText)
                if(response.status === 'success'){
                    console.log(response.user)
                    context.successAutorization(response.user)
                }
                if(response.status === 'faild'){
                    setMsgFail(true)
                    setTimeout(()=>{
                        setMsgFail(false)
                    },5000)
                    setPassword('')
                    setLogin('')
                }
            }
        };

        xhr.send(jsonString);
    };

    return (
        <section className={styles.section}>
            {msgFail?<div className={styles.msgFailed}>Не вірний логін або пароль!</div>:''}
            <main className={styles.login_form_wrapper}>
                <h1>Авторизація</h1>
                <form className={styles.login_form}>
                    <div className={styles.input_wrapper}>
                        <input value={login} onInput={(e) => setLogin(e.target.value.trim())} placeholder={'Логін'}/>
                    </div>
                    <div className={styles.input_wrapper}>
                        <input type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Пароль'}/>
                    </div>
                    <button type="button" onClick={sendDataToServer}>Увійти</button>
                    <span>Ще немає аккаунту?<br/><a href={"@"}>Зареєструватись!</a></span>
                </form>
            </main>
        </section>
    );
};

export default Login;