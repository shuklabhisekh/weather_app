import "../css/Navbar.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect } from "react";
function Navbar() {
  const takeLocation = () => {
    if ("geolocation" in navigator) {
      // check if geolocation is supported/enabled on current browser
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          // for when getting location is a success
          console.log(
            "latitude",
            position.coords.latitude,
            "longitude",
            position.coords.longitude
          );
        },
        function error(error_message) {
          // for when getting location results in an error
          console.error(
            "An error has occured while retrieving   location",
            error_message
          );
        }
      );
    } else {
      // geolocation is not supported
      // get your location some other way
      console.log("geolocation is not enabled on this browser");
    }
  };
  useEffect(() => {
    takeLocation();
  });
  return (
    <div>
      <div className="searchbar">
        <button className="location">
          <LocationOnIcon />
        </button>

        <input type="text" className="input" placeholder="Search" />
        <button className="searchIcon">
          <SearchOutlinedIcon fontSize="medium" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
