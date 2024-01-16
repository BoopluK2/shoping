import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const {page, pages, keyword = ""} = props
  return (
    pages > 1 && (
      <nav>
        <ul className="pagination justify-content-center">
          {
            [...Array(pages).keys()].map((e) => (
              <li className={`page-item ${e + 1 === page ? "active" : ""} `} key={e + 1}>
              <Link className="page-link" to={keyword ? `/search/${keyword}/page/${e + 1}` : `/page/${e + 1}`}>
                {e + 1}
              </Link>
            </li>
            ))
          }
       
      
      </ul>
    </nav>
    )
    
  );
};

export default Pagination;
