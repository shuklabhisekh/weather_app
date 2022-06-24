import "../css/Navbar.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
function Navbar() {
  const [city, setCity] = useState("");
  const takeLocation = () => {
    axios.get("http://ip-api.com/json").then(
      function success(response) {
        console.log("User's State is ", response.data.regionName);
        console.log("User's City", response.data.city);
      },

      function fail(data, status) {
        console.log("Request failed.  Returned status of", status);
      }
    );
  };

  const showData = () => {
    console.log(city, "cityname");
  };
  useEffect(() => {
    takeLocation();
  }, []);
  return (
    <div>
      <div className="searchbar">
        <button className="location">
          <LocationOnIcon />
        </button>

        <input
          type="text"
          className="input"
          placeholder="Search"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="searchIcon" onClick={showData}>
          <SearchOutlinedIcon fontSize="medium" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
