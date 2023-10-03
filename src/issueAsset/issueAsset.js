import "./index.css";

import NavBar from "../navbar/navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IssueAsset = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [assetList, setAssetList] = useState([]);
  const [searchQuary, setSearchQuary] = useState({
    deviceName: "",
    category: "",
  });
  const availableAssets = async () => {
    const availableAssetUrl = `http://localhost:4000/available-assets?status=Available&deviceName=${searchQuary.deviceName}&category=${searchQuary.category}`;
    const response = await fetch(availableAssetUrl);
    const data = await response.json();
    setCategoryList(data.categoryList);
    setAssetList(data.availabileAssets);
  };

  const updateInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchQuary({ ...searchQuary, [name]: value });
  };

  useEffect(() => {
    availableAssets();
  }, [searchQuary]);
  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div className="right-container">
        <h1>Issue Asset</h1>
        <div className="issue-asset-row-one">
          <input
            className="issue-asset-input"
            value={searchQuary.deviceName}
            name="deviceName"
            placeholder="Enter Asset Name"
            onChange={updateInput}
          />
          <select
            className="issue-asset-select"
            value={searchQuary.category}
            name="category"
            onChange={updateInput}
          >
            <option value="">All</option>
            {categoryList.map((data, index) => {
              return (
                <option key={index} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
        {assetList.length === 0 && (
          <div className="no-data-available">
            <h3>No Data added still now.</h3>
          </div>
        )}
        {assetList.length > 0 && (
          <div className="issue-asset-row-two">
            <div className="issue-asset-card-heading">Asset Name</div>
            <div className="issue-asset-card-heading">Asset Category</div>
            <div className="issue-asset-card-heading">Asset ID</div>
          </div>
        )}
        {assetList.length > 0 && (
          <div className="scrole-area">
            {assetList.map((data) => {
              return (
                <div key={data._id} className="issue-asset-row-two">
                  <div className="issue-asset-card-items">
                    {data.deviceName}
                  </div>
                  <div className="issue-asset-card-items">{data.category}</div>
                  <div className="issue-asset-card-items">{data._id}</div>
                  <Link
                    className="issue-asset-card-button"
                    to={`/issue-asset-form/${data._id}/${data.deviceName}/${data.category}`}
                  >
                    Issue
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueAsset;
