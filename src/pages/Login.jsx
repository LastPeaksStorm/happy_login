import React, { useState, useContext, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/navbar/Navbar';
import LoginContext from '../contexts/LoginContext';

function Login() {
  const { setUsername } = useContext(LoginContext);
  const [auth] = useState(false);

  useEffect(() => {
    let loggedUser = localStorage.getItem('username');
    if(loggedUser){
        window.location.replace("http://localhost:3000/profile");
    }
}, []);

  const handleSubmit = async (formData) => {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          localStorage.setItem('username', formData.username);
          setUsername(formData.username);
          window.location.replace("http://localhost:3000/profile");
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
  };

  return (
    <div>
      <Navbar />
      { auth
        ? <h1>Loading...</h1>
        : <div><h1>Anmeldung</h1> <LoginForm onSubmit={handleSubmit}></LoginForm></div>
      }
      
    </div>
  );
}

export default Login;
