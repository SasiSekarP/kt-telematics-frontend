import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AssetCategoryMaster from "./assetCategoryMaster/assetCategoryMaster";
import AssetHistory from "./assetHistory/assetHistory";
import AssetMaster from "./assetMaster/assetMaster";
import EmployeeMaster from "./employeeMaster/employeeMaster";
import IssueAsset from "./issueAsset/issueAsset";
import ReturnAsset from "./returnAsset/returnAsset";
import ScrapAsset from "./scrapAsset/scrapAsset";
import StockView from "./stockView/stockView";
import PageNotFound from "./pageNotFound/pageNotFound";
import AddNewExployee from "./addNewEmployee/addNewEmployee";
import AddNewAsset from "./addNewAsset/addNewAsset";
import AddNewCategory from "./addNewCategory/addNewCategory";
import EditCategory from "./editCategory/editCategory";
import EditAsset from "./editAsset/editAsset";
import EditEmployee from "./editEmployee/editEmployee";
import IssueAssetForm from "./issueAssetForm/issueAssetForm";
import ReturnAssetForm from "./returnAssetForm/returnAssetForm";
import SingleAssetHistory from "./singleAssetHistory/singleAssetHistory";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={EmployeeMaster} />
          <Route
            path="/asset-category-master"
            Component={AssetCategoryMaster}
          />
          <Route path="/asset-history" Component={AssetHistory} />
          <Route path="/asset-master" Component={AssetMaster} />
          <Route path="/issue-asset" Component={IssueAsset} />
          <Route path="/return-asset" Component={ReturnAsset} />
          <Route path="/scrap-asset" Component={ScrapAsset} />
          <Route path="/stock-view" Component={StockView} />
          <Route path="/add-new-employee" Component={AddNewExployee} />
          <Route path="/add-new-asset" Component={AddNewAsset} />
          <Route path="/add-new-category" Component={AddNewCategory} />
          <Route
            path="/edit-category/:_id/:category"
            Component={EditCategory}
          />
          <Route
            path="/adit-asset/:_id/:category/:deviceName"
            Component={EditAsset}
          />
          <Route
            path="/edit-employee/:_id/:employeeName/:posting/:status"
            Component={EditEmployee}
          />
          <Route
            path="/issue-asset-form/:_id/:deviceName/:category"
            Component={IssueAssetForm}
          />
          <Route path="/return-asset-form/:_id" Component={ReturnAssetForm} />
          <Route
            path="/single-asset-history/:_id"
            Component={SingleAssetHistory}
          />
          <Route path="*" Component={PageNotFound} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
