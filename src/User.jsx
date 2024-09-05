import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const User = (props) => {
  const [name, setName] = useState(props.user.name);
  const [phone, setPhone] = useState(props.user.phone);
  const [email, setEmail] = useState(props.user.email);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const editUser = () => {
    setLoading(true);
    const payload = props.user;
    payload.name = name;
    payload.email = email;
    payload.phone = phone;
    axios
      .put(
        `https://jsonplaceholder.typicode.com/users/${props.user.id}`,
        payload
      )
      .then((res) => {
        setLoading(false);
        setEdit(false);
      })
      .catch((err) => {
        alert("Cannot edit user");
        setLoading(false);
        setEdit(false);
      });
  };
   // creating the function for deleting the users id
  const deleteUser = () => {
    setLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${props.user.id}`)
      .then((res) => {
        props.deleteUserFromArray(props.user.id);
        setLoading(false);
      })

      // errroe handling
      .catch((err) => {
        alert(
          "Cannot delete user. Please try reloading and then again deleting the user"
        );
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "20px",
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
      }}
    >
      <ClipLoader
        color={"#000000"}
        loading={loading}
        cssOverride={{
          margin: "10px",
        }}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {edit ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Enter your username"
            style={{ margin: "7px", padding: "5px" }}
            value={name}
            onInput={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            style={{ margin: "7px", padding: "5px" }}
            value={email}
            onInput={(event) => setEmail(event.target.value)}
          />
          <input
            type="phone"
            placeholder="Enter your phone number"
            style={{ margin: "7px", padding: "5px" }}
            value={phone}
            onInput={(event) => setPhone(event.target.value)}
          />
          <div
            style={{
              padding: "10px",
              borderRadius: "5px",
              margin: "10px 15px",
              width: "100px",
              textAlign: "center",
              backgroundColor: "#1877F2",
              color: "white",
              cursor: "pointer",
            }}
            onClick={editUser}
          >
            Submit
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>{name}</h3>
          <p>{email}</p>
          <p>{phone}</p>
          <button
            style={{
              padding: "10px",
              borderRadius: "5px",
              margin: "10px 15px",
              width: "100px",
              textAlign: "center",
              backgroundColor: "#1877F2",
              color: "white",
              cursor: "pointer",
              border: "none",
            }}
            onClick={() => setEdit(true)}
          >
            Edit User
          </button>
          <button
            style={{
              padding: "10px",
              borderRadius: "5px",
              margin: "10px 15px",
              width: "100px",
              textAlign: "center",
              backgroundColor: "#FF5733",
              color: "black",
              cursor: "pointer",
              border: "none",
            }}
            onClick={deleteUser}
          >
            Delete User
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
