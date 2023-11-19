
import styles from './App.module.css'
import UserContext from "./Context/UserContext";
import {useState} from "react";
import Header from "./Components/Header/Header";
import Autorization from "./Components/Autorization/Autorization";
// import

function App() {
  // const [path,setPath] = useState(null)
  //
  // useEffect(() => {
  //   fetch('/get_image')
  //       .then(r=> r.blob())
  //       .then(data => {
  //         setPath(URL.createObjectURL(data))
  //       })
  // }, []);
    const [user,setUser]=useState(false)
    const [registerIsOpen,setRegisterIsOpen] = useState(false)

    const successAutorization = (user) =>{
        setUser(user)
        setRegisterIsOpen(false)
    }


  return (
    <div className={styles.app}>
        <UserContext.Provider value={{user:user,successAutorization}}>
            {registerIsOpen?(<Autorization />):(
            <Header setRegisterIsOpen={setRegisterIsOpen}/>)}
        </UserContext.Provider>
    </div>
  );
}

export default App;
