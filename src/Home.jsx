import axios from 'axios';
import React, { useEffect, useState } from 'react';
import User from './User.jsx'
import AddUser from './AddUser.jsx';
import { render } from 'react-dom';
// creating props
const Home = () => {
  const [users,setUsers] = useState([]);
  // creating a function for fetching the data from json placeholder api
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users/').then(res => setUsers(res.data)).catch(err => alert("Could not fetch users"));
  },[])
// creating a function for deleting the the exist data
  const deleteUserFromArray = id => {
    const currentUsers = users;
    let updatedUsers = currentUsers.filter(user => user.id !== id);
    setUsers(updatedUsers);
  }

  const newUserAdd = user => {
    setUsers(prevState => {
      return [...prevState,user]
    });
  }

  return(
    <div style={{display: "flex", flexDirection: "column"}}>
      <AddUser newUserAdd = {(user) => newUserAdd(user)} />
      <div style={{display: "flex", flexWrap: 'wrap', justifyContent: 'center'}}>
        {users.map((user) => <User user={user} key={user.id} deleteUserFromArray={(id) => deleteUserFromArray(id)} />)}
      </div>
    </div>
  )
}

export default Home;