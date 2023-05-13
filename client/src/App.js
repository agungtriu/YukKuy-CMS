import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Account, BarMenu } from './components';
import SideBar from './components/SideBar';
import React, { useState } from 'react';

function App() {
  const [loginStatus, setLoginStatus] = useState({
    status: false,
    data: {}
  })
  const loginCbHandler = (result) => {
    setLoginStatus(result);
  } 
  useState(() => {
    if (localStorage.getItem("access_token")) {
      setLoginStatus({
        status: true,
        data: {
          username: localStorage.username,
          avatar: localStorage.avatar
        }
      })
    } else (
      setLoginStatus({
        status: false, data: {}
      })
    )
  })
  return (
    <>
      <div className='container-fluid'>
        {loginStatus.status === false ? (
          <Account loginCbHandler={loginCbHandler}></Account>
          ) :
          <>
          <BarMenu loginStatus={loginStatus}></BarMenu>
            <SideBar></SideBar>
          </>
        }
      </div>
    </>
  );
}

export default App;
