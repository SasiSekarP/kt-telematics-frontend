import "./index.css";

import { NavLink } from "react-router-dom";

import { AiFillFolderOpen } from "react-icons/ai";

const NavBar = () => {
  return (
    <div className="navbar-conatainer">
      <div className="navbar-row-1">
        <h3>Company name and logo</h3>
      </div>
      <div className="navbar-row-2">
        <div className="navlink-row">
          <div className="navlink-icon">
            <AiFillFolderOpen />
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-tab nav-link" : "nav-link"
            }
            to="/"
          >
            Employee Master
          </NavLink>
        </div>
        <div className="navlink-row">
          <div className="navlink-icon">
            <AiFillFolderOpen />
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-tab nav-link" : "nav-link"
            }
            to="/asset-master"
          >
            Asset Master
          </NavLink>
        </div>
        <div className="navlink-row">
          <div className="navlink-icon">
            <AiFillFolderOpen />
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-tab nav-link" : "nav-link"
            }
            to="/asset-category-master"
          >
            Asset Category Master
          </NavLink>
        </div>
        <div className="navlink-row">
          <div className="navlink-icon">
            <AiFillFolderOpen />
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-tab nav-link" : "nav-link"
            }
            to="/stock-view"
          >
            Stock View
          </NavLink>
        </div>
        <div className="navlink-row">
          <div className="navlink-icon">
            <AiFillFolderOpen />
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-tab nav-link" : "nav-link"
            }
            to="/issue-asset"
          >
            Issue Asset
          </NavLink>
        </div>
        <div className="navlink-row">
          <div className="navlink-icon">
            <AiFillFolderOpen />
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-tab nav-link" : "nav-link"
            }
            to="/return-asset"
          >
            Return Asset
          </NavLink>
        </div>

        <div className="navlink-row">
          <div className="navlink-icon">
            <AiFillFolderOpen />
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-tab nav-link" : "nav-link"
            }
            to="/scrap-asset"
          >
            Scrap Asset
          </NavLink>
        </div>
        <div className="navlink-row">
          <div className="navlink-icon">
            <AiFillFolderOpen />
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-tab nav-link" : "nav-link"
            }
            to="/asset-history"
          >
            Asset History
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
