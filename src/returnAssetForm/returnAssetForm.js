import "./index.css";

import NavBar from "../navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReturnAssetForm = () => {
  const [reason, setReason] = useState("");

  const navigate = useNavigate();
  const { _id } = useParams();
  const [fetchedData, setFetchedData] = useState({
    deviceName: "",
    category: "",
    asset_id: "",
    employeeName: "",
    employeeId: "",
  });

  const fetchFn = async () => {
    const url = `http://localhost:4000/asset-details-for-returning-it?_id=${_id}`;
    const response = await fetch(url);
    const data = await response.json();
    setFetchedData(data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const option = {
      method: "PUT",
      body: JSON.stringify({ reason }),
      headers: {
        "content-type": "application/json",
      },
    };
    const url = `http://localhost:4000/return-asset?asset_id=${fetchedData.asset_id}&employeeId=${fetchedData.employeeId}&category=${fetchedData.category}`;
    if (reason !== "") {
      const response = await fetch(url, option);
      const data = await response.json();
      if (data.status === "success") {
        alert("One asset returned successfully");
        navigate("/return-asset", { replace: true });
      } else {
        alert("Something went wrong");
      }
    } else {
      alert("All Enter reason to continue");
    }
  };

  const updateReason = (e) => {
    setReason(e.target.value);
  };

  useEffect(() => {
    fetchFn();
  }, []);

  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>

      <div className="right-container">
        <h1>Assigning a Asset to an Employee</h1>
        <form className="return-asset-form" onSubmit={submitHandler}>
          <h3 className="assigning-asset-h3">Asset Details</h3>
          <label className="device-lable">Asset Name</label>
          <div className="device-detail">{fetchedData.deviceName}</div>
          <label className="device-lable">Asset Category</label>
          <div className="device-detail">{fetchedData.category}</div>
          <label className="device-lable">Asset id</label>
          <div className="device-detail">{fetchedData.asset_id}</div>
          <h3 className="assigning-asset-h3">Employee Details</h3>
          <label className="device-lable">Employee Name</label>
          <div className="device-detail">{fetchedData.employeeName}</div>
          <label className="device-lable">Employee Id</label>
          <div className="device-detail">{fetchedData.employeeId}</div>
          <label className="device-lable">Reason of returning</label>
          <div>
            <textarea
              className="reason-text-box"
              value={reason}
              onChange={updateReason}
              placeholder="Enter Reason of returning"
            />
          </div>
          <div className="assigning-asset-button-container">
            <button type="submit" className="assigning-asset-button">
              Submit
            </button>

            <Link className="assigning-asset-button" to="/return-asset">
              Close
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnAssetForm;
