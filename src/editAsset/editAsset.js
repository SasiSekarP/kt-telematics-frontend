import "./index.css";

import NavBar from "../navbar/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditAsset = () => {
  const navigate = useNavigate();
  const { category, _id, deviceName } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [assetData, setAssetData] = useState({
    deviceName: deviceName,
    category: category,
    _id,
  });

  const submitUrl = `http://localhost:4000/edit-asset`;

  let submitOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assetData),
  };

  const categoryListFetchUrl = "http://localhost:4000/get-category-list";

  const categoryListFetch = async () => {
    const response = await fetch(categoryListFetchUrl);
    const data = await response.json();
    setCategoryList(data);
  };

  useEffect(() => {
    categoryListFetch();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (assetData.category !== "" && assetData.deviceName !== "") {
      const response = await fetch(submitUrl, submitOption);
      const data = await response.json();
      if (data.status === "success") {
        setAssetData({
          deviceName: "",
          category: "",
        });
        alert("Asset edited successfully");
        navigate("/asset-master", { replace: true });
      } else {
        alert("Something went wrong. Please try after sometimes");
      }
    } else {
      alert("All datas are mandatory to continue");
    }
  };

  const updateData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAssetData({ ...assetData, [name]: value });
  };
  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div className="right-container add-new-asset-card-parent-container">
        <form onSubmit={submitHandler} className="add-new-asset-card">
          <h2>Edit Asset</h2>
          <label className="add-new-asset-lable">Device Name</label>
          <input
            className="add-new-asset-input"
            placeholder="Device Name"
            name="deviceName"
            value={assetData.deviceName}
            onChange={updateData}
          />
          <label className="add-new-asset-lable">Category</label>
          <select
            className="add-new-asset-input"
            name="category"
            value={assetData.category}
            onChange={updateData}
          >
            <option value="">-select-</option>
            {categoryList.length > 0 &&
              categoryList.map((data, index) => {
                return (
                  <option key={index} value={data}>
                    {data}
                  </option>
                );
              })}
            {categoryList.length === 0 && (
              <option value="">Add category to continue</option>
            )}
          </select>
          <div className="add-new-employee-button-row">
            <button type="submit" className="add-new-asset-button">
              Submit
            </button>
            <Link to="/asset-master" className="add-new-asset-button">
              Close
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAsset;
