import "./index.css";

import NavBar from "../navbar/navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AssetHistory = () => {
  const [searchQuery, setSearchQuery] = useState({
    category: "",
    deviceName: "",
  });

  const [categoryList, setCategoryList] = useState([]);
  const [assetList, setAssetList] = useState([]);

  const fetchData = async () => {
    const url = `http://localhost:4000/asset-list?category=${searchQuery.category}&deviceName=${searchQuery.deviceName}`;
    const response = await fetch(url);
    const data = await response.json();
    setCategoryList(data.categoryList);
    setAssetList(data.assetList);
  };

  const updateInput = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div className="right-container">
        <h1>Asset History</h1>
        <div className="asset-history-row-one">
          <input
            className="asset-history-input"
            placeholder="Enter Asset Name"
            name="deviceName"
            value={searchQuery.deviceName}
            onChange={updateInput}
          />
          <select
            className="asset-history-select"
            value={searchQuery.category}
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
          <div className="asset-history-row-two">
            <div className="asset-history-card-heading">Asset Name</div>
            <div className="asset-history-card-heading">Asset Category</div>
            <div className="asset-history-card-heading">Asset ID</div>
          </div>
        )}
        {assetList.length > 0 && (
          <div className="scrole-area">
            {assetList.map((data) => {
              return (
                <div key={data._id} className="asset-history-row-two">
                  <div className="asset-history-card-items">
                    {data.deviceName}
                  </div>
                  <div className="asset-history-card-items">
                    {data.category}
                  </div>
                  <div className="asset-history-card-items">{data._id}</div>
                  <Link
                    to={`/single-asset-history/${data._id}`}
                    className="issue-asset-card-button"
                  >
                    History
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

export default AssetHistory;
