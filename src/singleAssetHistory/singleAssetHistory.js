import "./index.css";

import NavBar from "../navbar/navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SingleAssetHistory = () => {
  const { _id } = useParams();
  const [assetHistory, setAssetHistory] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const url = `http://localhost:4000/single-asset-data?_id=${_id}`;
  const fetchFn = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setAssetHistory(data);
    setHistoryList(data.history);
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
        <h1>Asset History</h1>
        <div className="single-asset-history-container">
          <div className="single-asset-history-row1">
            <div className="single-asset-history-coloum">
              <label className="single-asset-history-lable">Asset Name</label>
              <div className="single-asset-history-tag">
                {assetHistory.deviceName}
              </div>
            </div>
            <div className="single-asset-history-coloum">
              <label className="single-asset-history-lable">Category</label>
              <div className="single-asset-history-tag">
                {assetHistory.category}
              </div>
            </div>
          </div>
          <div className="single-asset-history-row2">
            <label className="single-asset-history-lable">Asset Id</label>
            <div className="single-asset-history-tag">{assetHistory._id}</div>
          </div>
        </div>
        {historyList.length === 0 && (
          <div className="no-data-available">
            <h3>No Data added still now.</h3>
          </div>
        )}
        {historyList.length > 0 && (
          <div className="asset-history-card-row-heading-container">
            <div className="asset-history-card-row-heading1 asset-history-card-row-heading">
              Employee name
            </div>
            <div className="asset-history-card-row-heading2 asset-history-card-row-heading">
              Employee ID
            </div>
            <div className="asset-history-card-row-heading3 asset-history-card-row-heading">
              Reason
            </div>
          </div>
        )}

        {historyList.length > 0 && (
          <div className="asset-history-card-scrole-area">
            {historyList.map((data) => {
              return (
                <div
                  key={data._id}
                  className="asset-history-card-row-heading-container"
                >
                  <div className="asset-history-card-row-heading1">
                    {data.employeeName}
                  </div>
                  <div className="asset-history-card-row-heading2">
                    {data._id}
                  </div>
                  <div className="asset-history-card-row-heading3">
                    {data.reason_for_return === "" && "Current user"}
                    {data.reason_for_return === "" || (
                      <div>{data.reason_for_return}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="asset-history-card-button-container-close">
          <Link to={`/asset-history`} className="issue-asset-card-button">
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SingleAssetHistory;
