import "./index.css";

import NavBar from "../navbar/navbar";

import { Link } from "react-router-dom";

import { AiOutlineDown } from "react-icons/ai";
import { useEffect, useState } from "react";

const AssetMaster = () => {
  const [assetList, setAssetList] = useState([]);
  const [CategoryList, setCategoryList] = useState([]);
  const [searchQuary, setSearchQuary] = useState({
    deviceName: "",
    category: "",
  });
  const assetListUrl = `http://localhost:4000/asset-list?category=${searchQuary.category}&deviceName=${searchQuary.deviceName}`;

  const assetListFetch = async () => {
    const response = await fetch(assetListUrl);
    const data = await response.json();
    const { assetList, categoryList } = data;
    setAssetList(assetList);
    setCategoryList(categoryList);
  };

  const deleteFn = async (_id, category) => {
    const deleteUrl = `http://localhost:4000/asset-delete?_id=${_id}&category=${category}`;
    const option = {
      method: "DELETE",
    };
    const response = await fetch(deleteUrl, option);
    const data = await response.json();
    if (data.status === "success") {
      alert("One Asset deleted successfully");
      assetListFetch();
    } else if (data.status === "failed") {
      alert(data.message);
    } else {
      alert("Something went wrong. Please try after sometimes");
    }
  };

  const updateInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchQuary({ ...searchQuary, [name]: value });
  };

  const moveToScrapFn = async (_id) => {
    const moveToScrapUrl = `http://localhost:4000/switch-status?_id=${_id}&to_location=Scrap`;
    const moveToScrapOption = {
      method: "PUT",
    };
    const response = await fetch(moveToScrapUrl, moveToScrapOption);
    const data = await response.json();
    if (data.status === "success") {
      alert("One Item moved to scrap");
    } else if (data.status === "failed") {
      alert(data.message);
    } else {
      alert("Something went wrong. Please try after sometimes");
    }
  };

  useEffect(() => {
    assetListFetch();
  }, [searchQuary, moveToScrapFn]);

  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div className="right-container">
        <h1>Asset Master</h1>
        <div className="asset-master-row-one">
          <input
            className="asset-master-input"
            placeholder="Enter Asset Name"
            name="deviceName"
            value={searchQuary.deviceName}
            onChange={updateInput}
          />
          <select
            className="asset-master-select"
            name="category"
            value={searchQuary.category}
            onChange={updateInput}
          >
            <option value="">All</option>
            {CategoryList.map((data, index) => {
              return (
                <option key={index} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <Link to="/add-new-asset" className="asset-master-button">
            Add new asset
          </Link>
        </div>
        {assetList.length === 0 && (
          <div className="no-data-available">
            <h3>No Data added still now.</h3>
            <Link to="/add-new-asset">Add Now</Link>
          </div>
        )}
        {assetList.length > 0 && (
          <div className="asset-master-row-two">
            <div className="asset-master-card-heading">Asset Name</div>
            <div className="asset-master-card-heading">Asset Category</div>
            <div className="asset-master-card-heading">Asset ID</div>
          </div>
        )}
        <div className="scrole-area">
          {assetList.length > 0 &&
            assetList.map((data) => {
              return (
                <div key={data._id} className="asset-master-row-two">
                  <div className="asset-master-card-items">
                    {data.deviceName}
                  </div>
                  <div className="asset-master-card-items">{data.category}</div>
                  <div className="asset-master-card-items">{data._id}</div>
                  <button type="button" className="asset-master-card-button">
                    More <AiOutlineDown />
                    <div className="asset-master-card-button-options">
                      <div className="asset-master-card-button-option">
                        <Link
                          to={`/adit-asset/${data._id}/${data.category}/${data.deviceName}`}
                        >
                          Edit
                        </Link>
                      </div>
                      <div
                        className="asset-master-card-button-option"
                        onClick={() => {
                          deleteFn(data._id, data.category);
                        }}
                      >
                        Delete
                      </div>
                      <div
                        className="asset-master-card-button-option"
                        onClick={() => {
                          moveToScrapFn(data._id);
                        }}
                      >
                        Move to scrap
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AssetMaster;
