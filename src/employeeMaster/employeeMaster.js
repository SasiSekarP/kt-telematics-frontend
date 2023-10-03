import "./index.css";

import NavBar from "../navbar/navbar";
import { Link } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { useEffect, useState } from "react";

const EmployeeMaster = () => {
  const [employeeList, setEmpolyeeList] = useState([]);

  const [searchQuary, setSearchQuary] = useState({
    employeeName: "",
    status: "",
  });
  const employeeListFetchFn = async () => {
    const employeeListUrl = `http://localhost:4000/employee-list?employeeName=${searchQuary.employeeName}&status=${searchQuary.status}`;
    const response = await fetch(employeeListUrl);
    const data = await response.json();
    setEmpolyeeList(data);
  };
  const callAlert = (a) => {
    alert(a);
  };

  const updateInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchQuary({ ...searchQuary, [name]: value });
  };

  const deleteEmployeeDetails = async (_id) => {
    const employeeDeleteUrl = `http://localhost:4000/delete-employee?_id=${_id}`;
    const deleteOption = {
      method: "DELETE",
    };
    const response = await fetch(employeeDeleteUrl, deleteOption);
    const data = await response.json();
    if (data.status === "success") {
      alert("One item deleted Successfully");
      employeeListFetchFn();
    } else if (data.status === "failed") {
      alert(data.message);
    } else {
      alert("Something went wrong. Please try after sometimes");
    }
  };

  useEffect(() => {
    employeeListFetchFn();
  }, [searchQuary]);

  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div className="right-container">
        <h1>Employee Master</h1>
        <div className="employee-master-row-one">
          <input
            className="employee-master-input"
            placeholder="Enter Employee Name"
            value={searchQuary.employeeName}
            name="employeeName"
            onChange={updateInput}
          />
          <select
            value={searchQuary.status}
            name="status"
            onChange={updateInput}
            className="asset-category-master-select"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inActive">In-active</option>
          </select>
          <Link to="/add-new-employee" className="employee-master-button">
            Add new employee
          </Link>
        </div>
        {employeeList.length === 0 && (
          <div className="no-data-available">
            <h3>No Data added still now.</h3>
            <Link to="/add-new-employee">Add Now</Link>
          </div>
        )}
        {employeeList.length > 0 && (
          <div className="employee-master-row-two">
            <div className="employee-master-card-heading">Employee Name</div>
            <div className="employee-master-card-heading">Employee Posting</div>
            <div className="employee-master-card-heading">Employee ID</div>
            <div className="employee-master-card-heading">Status</div>
          </div>
        )}
        {employeeList.length > 0 && (
          <div className="scrole-area">
            {employeeList.map((data) => {
              return (
                <div key={data._id} className="employee-master-row-two">
                  <div className="employee-master-card-items">
                    {data.employeeName}
                  </div>
                  <div className="employee-master-card-items">
                    {data.posting}
                  </div>
                  <div className="employee-master-card-items">{data._id}</div>
                  <div className="employee-master-card-items">
                    {data.status}
                  </div>
                  <button type="button" className="employee-master-card-button">
                    More <AiOutlineDown />
                    <div className="employee-master-card-button-options">
                      <div className="employee-master-card-button-option">
                        <Link
                          to={`/edit-employee/${data._id}/${data.employeeName}/${data.posting}/${data.status}`}
                        >
                          Edit
                        </Link>
                      </div>
                      <div
                        className="employee-master-card-button-option"
                        onClick={() => {
                          deleteEmployeeDetails(data._id);
                        }}
                      >
                        Delete
                      </div>
                      {/* <div
                        className="employee-master-card-button-option"
                        onClick={() => {
                          callAlert("Asset Holdings");
                        }}
                      >
                        Asset Holdings
                      </div> */}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeMaster;
