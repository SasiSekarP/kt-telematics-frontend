import "./index.css";

import NavBar from "../navbar/navbar";

import { AiOutlineDown } from "react-icons/ai";
import { useEffect, useState } from "react";

const ScrapAsset = () => {
  const [scrapAssetList, setScrapAssetList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchQuary, setSearchQuary] = useState({
    category: "",
    deviceName: "",
  });

  const scrapAssetFetchFn = async () => {
    const scrapAssetFetchUrl = `http://localhost:4000/scrap-asset?category=${searchQuary.category}&deviceName=${searchQuary.deviceName}`;
    const response = await fetch(scrapAssetFetchUrl);
    const data = await response.json();
    setScrapAssetList(data.scrapAssetList);
    setCategoryList(data.categoryList);
  };

  const addToAsset = async (_id) => {
    const addToAssetUrl = `http://localhost:4000/switch-status?_id=${_id}&to_location=Available`;
    const addToAssetOption = {
      method: "PUT",
    };
    const response = await fetch(addToAssetUrl, addToAssetOption);
    const data = await response.json();
    if (data.status === "success") {
      alert("One Item moved to Asset");
      scrapAssetFetchFn();
    } else if (data.status === "failed") {
      alert(data.message);
    } else {
      alert("Something went wrong. Please try after sometimes");
    }
  };

  const deleteFn = async (_id, category) => {
    const deleteUrl = `http://localhost:4000/asset-delete?_id=${_id}&category=${category}`;
    const option = {
      method: "DELETE",
    };
    const response = await fetch(deleteUrl, option);
    const data = await response.json();
    if (data.status === "success") {
      alert("One Scrap deleted successfully");
      scrapAssetFetchFn();
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

  useEffect(() => {
    scrapAssetFetchFn();
  }, [searchQuary]);

  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div className="right-container">
        <h1>Scrap Asset</h1>
        <div className="scrap-asset-row-one">
          <input
            className="scrap-asset-input"
            placeholder="Enter Asset Name"
            onChange={updateInput}
            value={searchQuary.deviceName}
            name="deviceName"
          />
          <select
            value={searchQuary.category}
            className="scrap-asset-select"
            onChange={updateInput}
            name="category"
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
        {scrapAssetList.length === 0 && (
          <div className="no-data-available">
            <h3>No Data added still now.</h3>
          </div>
        )}
        {scrapAssetList.length > 0 && (
          <div className="scrap-asset-row-two">
            <div className="scrap-asset-card-heading">Scrap Name</div>
            <div className="scrap-asset-card-heading">Scrap Category</div>
            <div className="scrap-asset-card-heading">Scrap ID</div>
          </div>
        )}
        {scrapAssetList.length > 0 && (
          <div className="scrole-area">
            {scrapAssetList.map((data) => {
              return (
                <div key={data._id} className="scrap-asset-row-two">
                  <div className="scrap-asset-card-items">
                    {data.deviceName}
                  </div>
                  <div className="scrap-asset-card-items">{data.category}</div>
                  <div className="scrap-asset-card-items">{data._id}</div>
                  <button type="button" className="scrap-asset-card-button">
                    More <AiOutlineDown />
                    <div className="scrap-asset-card-button-options">
                      <div
                        className="scrap-asset-card-button-option"
                        onClick={() => {
                          addToAsset(data._id);
                        }}
                      >
                        Add to Asset
                      </div>
                      <div
                        className="scrap-asset-card-button-option"
                        onClick={() => {
                          deleteFn(data._id, data.category);
                        }}
                      >
                        Delete permanently
                      </div>
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

export default ScrapAsset;
