import React from 'react';

const Dashboard = (props) => {
  const getSession = () => {
    fetch('/api/getSession').then(response=>{
      return response.json()
    })
      .then(result=>{
        console.log(result);
        if (!result.auth) props.history.push('/');
      })
      .catch(err=>{
        console.log("Error>>>>", err)
      });
  };
  getSession();
  return (
    <h1>Dashboard</h1>
  )
};

export default Dashboard;
