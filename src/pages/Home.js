import React from 'react';

const Home = (props) => {
  const getSession = () => {
    fetch('/api/getSession').then(response=>{
      return response.json()
    })
      .then(result=>{
        console.log(result);
        if (result.auth) props.history.push('/dashboard');
      })
      .catch(err=>{
        console.log("Error>>>>", err)
      });
  };
  const setSession = () => {
    fetch('/api/setSession').then(response=>{
      // session message is set in this backend endpoint.
      return response.json()
    })
      .then(result=>{
        console.log('session set to: ', result);
        if (result.auth) props.history.push('/dashboard');
      })
      .catch(err=>{
        console.log("Error>>>>", err)
      })
  };
  getSession();
  const handleClick = () => {
    setSession();
  };
  return (
    <div>
      <h1>Log In</h1>
      <button onClick={handleClick}>
        Set Session for Log in
      </button>
    </div>
  )
};

export default Home;
