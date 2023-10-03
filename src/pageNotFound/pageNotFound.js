import { Link } from "react-router-dom";

import "./index.css";

const PageNotFound = () => {
  return (
    <div className="pagenotfound">
      <div className="errornumber">404</div>
      <h1>Oops!</h1>
      <h1>Page not found</h1>

      <div className="pagenotfoundlink">
        Back to Employee Master?{" "}
        <Link className="click-me-link" to="/">
          Click me
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
