import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Crud.css";

const Crud = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [viewData, setViewData] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/get-all-user");
        console.log(response.data.getUser);
        setViewData(response.data.getUser);
      } catch (err) {
        console.log("user data not get" + err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData) {
      if (updateId !== null) {
        handleEditData();
      } else {
        try {
          const response = await axios.post("http://localhost:7000/api/user-register", {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          });
          alert("form submitted: " + response.data.message);
          setFormData({
            name: "",
            email: "",
            password: "",
          });
          setViewData([...viewData, response.data.user]); // update view data after successful submission
        } catch (err) {
          console.log(err);
          alert("form not submitted");
        }
      }
    }
  };

  const handleUpdate = (id) => {
    const updateData = viewData.find((user) => user._id === id);
    if (updateData) {
      setFormData({
        name: updateData.name || "",
        email: updateData.email || "",
        password: updateData.password || "",
      });
      console.log("update data: ", updateData);
      setUpdateId(id);
    } else {
      alert("User data not found for update");
    }
  };

  const handleEditData = async () => {
    try {
      const response = await axios.put(`http://localhost:7000/api/update-user-id/${updateId}`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setViewData(viewData.map(user => (user._id === updateId ? response.data.user : user))); // update view data after successful edit
      setUpdateId(null);
    } catch (err) {
      alert("data is not updated: " + err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:7000/api/delete-user-id/${id}`);
      alert(response.data.message);
      setViewData(viewData.filter(user => user._id !== id)); // remove deleted user from view data
    } catch (err) {
      alert("user data is not deleted: " + err);
    }
  };

  return (
    <>
      <h1>Crud</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button>{updateId !== null ? "Edit" : "Submit"}</button>
      </form>
      <div className="viewData">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewData.length === 0 ? (
              <tr>
                <td colSpan="4">No user records</td>
              </tr>
            ) : (
              viewData.map((item) => (
                item ? (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>
                      <button onClick={() => handleUpdate(item._id)}>Update</button>
                      <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={Math.random()}>
                    <td colSpan="4">Invalid user data</td>
                  </tr>
                )
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Crud;
