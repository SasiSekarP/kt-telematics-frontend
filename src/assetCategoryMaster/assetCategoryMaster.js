import "./index.css";

import NavBar from "../navbar/navbar";

import { AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AssetCategoryMaster = () => {
  let [arrData, setArrData] = useState([]);

  let [category, setCategory] = useState("");

  const fetchurl = `http://localhost:4000/stock-view?category=${category}`;

  const dataFetching = async () => {
    let response = await fetch(fetchurl);
    let data = await response.json();
    setArrData(data);
  };

  const deleteCategory = async (_id, category) => {
    const deleteurl = `http://localhost:4000/category-delete?_id=${_id}&category=${category}`;
    const deleteOption = {
      method: "DELETE",
    };
    let response = await fetch(deleteurl, deleteOption);
    let data = await response.json();
    if (data.status === "success") {
      alert("One Item deleted successfully");
      dataFetching();
    } else if (data.status === "failed") {
      alert(`${data.message}`);
    } else {
      alert("Something went wrong. Please try after sometimes");
    }
  };

  const updateValue = (e) => {
    let value = e.target.value;
    setCategory(value);
  };

  useEffect(() => {
    dataFetching();
  }, [category]);

  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div className="right-container">
        <h1>Asset Category Master</h1>
        <div className="asset-category-master-row-one">
          <input
            className="asset-category-master-input"
            placeholder="Enter a new Asset Category Name"
            onChange={updateValue}
          />
          <Link to="/add-new-category" className="asset-category-master-button">
            Add New Category
          </Link>
        </div>
        {arrData.length === 0 && (
          <div className="no-data-available">
            <h3>No Data added still now.</h3>
            <Link to="/add-new-category">Add Now</Link>
          </div>
        )}
        {arrData.length > 0 && (
          <div className="asset-category-master-row-two">
            <div className="asset-category-master-card-heading">Category</div>
          </div>
        )}
        {arrData.length > 0 && (
          <div className="scrole-area">
            {arrData.map((data) => {
              return (
                <div className="asset-category-master-row-two" key={data._id}>
                  <div className="asset-category-master-card-items">
                    {data.category}
                  </div>
                  <button
                    type="button"
                    className="asset-category-master-card-button"
                  >
                    More <AiOutlineDown />
                    <div className="asset-category-master-card-button-options">
                      <div className="asset-category-master-card-button-option">
                        <Link
                          to={`/edit-category/${data._id}/${data.category}`}
                        >
                          Edit
                        </Link>
                      </div>
                      <div
                        className="asset-category-master-card-button-option"
                        onClick={() => {
                          deleteCategory(data._id, data.category);
                        }}
                      >
                        Delete
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

export default AssetCategoryMaster;
