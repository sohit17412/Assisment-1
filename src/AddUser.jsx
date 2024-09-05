import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
//creating the props for adding new data into the array
const AddUser = (props) => {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  // function for adding new data into the array after clicking the submit button
  const addUser = () => {
    setLoading(true);
    const payload = {
      name: name,
      email: email,
      phone: phone,
    };
      // adding the data through axios post method into the api
    axios
      .post(`https://jsonplaceholder.typicode.com/users/`, payload)
      .then((res) => {
        props.newUserAdd(res.data);
        setButtonVisible(true);
        setLoading(false);
      })
      // error handlling
      .catch((err) => {
        alert("Could not create user. Please try after some time.");
        setLoading(false);
      });
  };
  return (
    // creating the button for opening the form for adding the data
    <div>
      {buttonVisible ? (
        <div
          style={{
            padding: "10px 15px",
            width: "100px",
            textAlign: "center",
            borderRadius: "10px",
            color: "white",
            backgroundColor: "#39e75f",
            marginLeft: "auto",
            marginRight: "20px",
            cursor: "pointer",
          }}
          onClick={() => setButtonVisible(false)}
        >
          + Add User
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid black",
            borderRadius: "10px",
            margin: "10px auto",
            padding: "20px",
            width: "75%",
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
          <div>
            <input
              type="text"
              placeholder="Enter your username"
              style={{
                margin: "7px 10px",
                padding: "10px",
                width: "300px",
                borderRadius: "5px",
                fontSize: "15px",
              }}
              value={name}
              onInput={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                margin: "7px 10px",
                padding: "10px",
                width: "300px",
                borderRadius: "5px",
                fontSize: "15px",
              }}
              value={email}
              onInput={(event) => setEmail(event.target.value)}
            />
            <input
              type="phone"
              placeholder="Enter your phone number"
              style={{
                margin: "7px 10px",
                padding: "10px",
                width: "300px",
                borderRadius: "5px",
                fontSize: "15px",
              }}
              value={phone}
              onInput={(event) => setPhone(event.target.value)}
            />
          </div>
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
            onClick={addUser}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
