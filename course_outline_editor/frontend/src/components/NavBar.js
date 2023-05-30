import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return(
        <nav>
        <ul>
          {/* ***OPEN*** */}
          <li><Link to="/home"> Home </Link> </li>

          {/* ***INSTRUCTOR*** */}
          <li><Link to="/instructor/courses">Courses</Link> </li>

          {/* ***ADMIN*** */}
          <li><Link to="/admin/assign-instructor"> Assign Instructor </Link> </li>
          {/* <li><Link to="/admin/instructorhistory"> Inst Hist </Link> </li> */}
          <li><Link to="/admin/edithistory"> Edit Hist </Link> </li>

          {/* ***REVIEWER*** */}
          <li><Link to="/reviewer/pending"> Review </Link> </li>

          <li><Link to= "/instructor/my-outlines"> My Outlines </Link></li>


          <li><Link to="/"> Login/out </Link> </li>

        </ul>
      </nav>
    );
}

export default NavBar;