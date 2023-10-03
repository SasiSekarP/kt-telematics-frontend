import "./index.css";

import NavBar from "../navbar/navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

const AddNewCategory = () => {
  const [categoryData, setCategoryData] = useState({
    category: "",
  });

  const url = "http://localhost:4000/add-new-category";

  let option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (categoryData.category !== "") {
      const response = await fetch(url, option);
      const data = await response.json();
      if (data.status === "success") {
        setCategoryData({
          category: "",
        });
        alert("New Category added successfully");
      } else if (data.status === "failed") {
        alert("All ready the name is available");
      } else {
        alert("Something went wrong. Please try after sometimes");
      }
    } else {
      alert("All datas are mandatory to continue");
    }
  };

  const updateData = (e) => {
    const value = e.target.value;
    setCategoryData({ category: value });
  };

  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div className="right-container add-new-asset-card-parent-container">
        <form onSubmit={submitHandler} className="add-new-asset-card">
          <h2>New Category</h2>
          <label className="add-new-asset-lable">Cadetory</label>
          <input
            className="add-new-asset-input"
            placeholder="Enter Category Name"
            name="category"
            value={categoryData.category}
            onChange={updateData}
          />
          <div className="add-new-employee-button-row">
            <button type="submit" className="add-new-asset-button">
              Submit
            </button>
            <Link to="/asset-category-master" className="add-new-asset-button">
              Close
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
