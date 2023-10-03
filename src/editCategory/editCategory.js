import "./index.css";

import NavBar from "../navbar/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const EditCategory = () => {
  const navigate = useNavigate();
  const { _id, category } = useParams();
  const oldCategory = category;
  const [categoryData, setCategoryData] = useState({
    category: category,
  });

  const updateurl = `http://localhost:4000/category-update/${_id}`;

  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    if (categoryData.category === "") {
      alert("Enter Name to continue");
    } else {
      let response = await fetch(updateurl, option);
      let data = await response.json();
      if (data.status === "success") {
        alert("One Item update successfully");
        navigate("/asset-category-master", { replace: true });
      } else {
        alert("Something went wrong. Please try after sometimes");
      }
    }
  };

  const updateData = (e) => {
    const value = e.target.value;
    setCategoryData({ category: value, oldCategory });
  };

  return (
    <div className="screen-container">
      <div className="left-container">
        <NavBar />
      </div>
      <div className="right-container add-new-asset-card-parent-container">
        <form onSubmit={updateCategory} className="add-new-asset-card">
          <h2>Edit Category Name</h2>
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

export default EditCategory;
