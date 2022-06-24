import "../css/Navbar.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
function Navbar() {
  const [city, setCity] = useState("");
  let [days, setDays] = useState([]);
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

  const sendCity = () => {
    if (city.length == 0) {
      alert("Please enter city");
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2ce49f5497b0e1543e90993ba28432a6&units=metric`
      )
      .then((res) => {
        sevenDays(res.data.coord.lat, res.data.coord.lon);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sevenDays = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2ce49f5497b0e1543e90993ba28432a6&units=metric`
      )
      .then((res) => {
        setDays(res.data.daily);
        console.log(days);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <button className="searchIcon" onClick={sendCity}>
          <SearchOutlinedIcon fontSize="medium" />
        </button>
      </div>
      <div id="suggest"></div>
    </div>
  );
}

export default Navbar;
