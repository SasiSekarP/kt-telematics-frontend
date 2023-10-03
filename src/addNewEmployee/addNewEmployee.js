import "./index.css";

import NavBar from "../navbar/navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddNewExployee = () => {
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    posting: "",
    status: "active",
  });

  const url = "http://localhost:4000/add-new-employee";

  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  };

  const updateData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (employeeData.employeeName !== "" && employeeData.posting !== "") {
      const response = await fetch(url, option);
      const data = await response.json();
      if (data.status === "success") {
        setEmployeeData({
          employeeName: "",
          posting: "",
          status: "active",
        });
        alert("New Employee added successfully");
      } else {
        alert("Something went wrong. Please try after sometimes");
      }
    } else {
      alert("All datas are mandatory to continue");
    }
  };

  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div
        onSubmit={submitForm}
        className="right-container add-new-empolyee-card-parent-container"
      >
        <form className="add-new-empolyee-card">
          <h2>New Employee</h2>
          <label className="add-new-empolyee-lable">Name</label>
          <input
            className="add-new-empolyee-input"
            placeholder="Employee Name"
            name="employeeName"
            value={employeeData.employeeName}
            onChange={updateData}
          />
          <label className="add-new-empolyee-lable">Posting</label>
          <input
            className="add-new-empolyee-input"
            name="posting"
            value={employeeData.posting}
            onChange={updateData}
            placeholder="Posting"
          />
          <label className="add-new-empolyee-lable">Status</label>
          <select
            className="add-new-empolyee-input"
            name="status"
            value={employeeData.status}
            onChange={updateData}
          >
            <option value="active">Active</option>
            <option value="inActive">In-active</option>
          </select>
          <div className="add-new-employee-button-row">
            <button type="submit" className="add-new-empolyee-button">
              Submit
            </button>
            <Link to="/" className="add-new-empolyee-button">
              Close
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewExployee;
