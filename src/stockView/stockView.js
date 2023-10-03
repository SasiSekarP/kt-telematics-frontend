import "./index.css";

import NavBar from "../navbar/navbar";
import { useEffect, useState } from "react";

const StockView = () => {
  let [arrData, setArrData] = useState([]);
  let [category, setCategory] = useState("");
  const url = `http://localhost:4000/stock-view?category=${category}`;

  const dataFetching = async () => {
    let response = await fetch(url);
    let data = await response.json();
    setArrData(data);
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
        <h1>Stock View</h1>

        <div className="stock-view-row-one">
          <input
            className="stock-view-input"
            placeholder="Enter a new Asset Category Name"
            value={category}
            onChange={updateValue}
          />
        </div>

        {arrData.length === 0 && (
          <div className="no-data-available">
            <h3>No Data added still now.</h3>
          </div>
        )}

        {arrData.length > 0 && (
          <div className="stock-view-row-two">
            <div className="stock-view-card-heading">Category</div>
            <div className="stock-view-card-heading">Available</div>
            <div className="stock-view-card-heading">Issued</div>
            <div className="stock-view-card-heading">Scrap</div>
          </div>
        )}
        {arrData.length > 0 && (
          <div className="scrole-area">
            {arrData.map((data) => {
              return (
                <div className="stock-view-row-two" key={data._id}>
                  <div className="stock-view-card-items">{data.category}</div>
                  <div className="stock-view-card-items">{data.available}</div>
                  <div className="stock-view-card-items">{data.issued}</div>
                  <div className="stock-view-card-items">{data.scrap}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockView;
