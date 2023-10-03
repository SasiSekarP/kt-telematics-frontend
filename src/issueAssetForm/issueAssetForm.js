import "./index.css";

import NavBar from "../navbar/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const IssueAssetForm = () => {
  const navigate = useNavigate();
  const { _id, deviceName, category } = useParams();

  const [current_user_id, setCurrent_user_id] = useState("");

  const [employeeId, setEmployeeId] = useState("");

  const inputUpdate = async (e) => {
    const value = e.target.value;
    setEmployeeId(value);
    setCurrent_user_id(value);
  };

  const [employeeList, setEmployeeList] = useState([]);
  const status = "";
  const employeeName = "";

  const fetchEmployeeListFn = async () => {
    const url = `http://localhost:4000/employee-list?status=${status}&employeeName=${employeeName}`;
    const response = await fetch(url);
    const data = await response.json();
    setEmployeeList(data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (current_user_id !== "") {
      const url = `http://localhost:4000/issue-asset?current_user_id=${current_user_id}&asset_id=${_id}`;
      const option = {
        method: "PUT",
      };
      const response = await fetch(url, option);
      const data = await response.json();
      if (data.status === "success") {
        alert("Asset asigned succesfully");
        navigate("/issue-asset", { replace: true });
      }
    } else {
      alert("Select any one of the employee to continue");
    }
  };

  useEffect(() => {
    fetchEmployeeListFn();
  }, []);
  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>

      <div className="right-container">
        <h1>Assigning a Asset to an Employee</h1>
        <form onSubmit={submitHandler} className="issue-asset-form">
          <h3 className="assigning-asset-h3">Asset Details</h3>
          <label className="device-lable">Asset Name</label>
          <div className="device-detail">{deviceName}</div>
          <label className="device-lable">Asset Category</label>
          <div className="device-detail">{category}</div>
          <label className="device-lable">Asset id</label>
          <div className="device-detail">{_id}</div>
          <h3 className="assigning-asset-h3">Select Employee</h3>
          <select
            className="assigning-asset-select"
            onChange={inputUpdate}
            value={employeeId}
          >
            <option value="">-Select-</option>
            {employeeList.map((data) => {
              return (
                <option key={data._id} value={data._id}>
                  {data._id} &nbsp; &nbsp; &nbsp; {data.employeeName}
                </option>
              );
            })}
          </select>
          <div className="assigning-asset-button-container">
            <button type="submit" className="assigning-asset-button">
              Submit
            </button>
            <Link className="assigning-asset-button" to="/issue-asset">
              Close
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueAssetForm;
