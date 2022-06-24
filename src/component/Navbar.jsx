import "../css/Navbar.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "@mui/material";
function Navbar() {
  const [city, setCity] = useState("");
  const [days, setDays] = useState([]);
  let waiting;
  console.log("again", days);
  const takeLocation = () => {
    axios.get("http://ip-api.com/json").then(
      function success(response) {
        console.log("User's State is ", response.data.regionName);
        console.log("User's City", response.data.city);
        console.log(city, "inside location");
        setCity(response.data.city);
        sendCity();
      },

      function fail(data, status) {
        console.log("Request failed.  Returned status of", status);
      }
    );
  };

  const debounce = (func, delay) => {
    if (waiting) {
      clearTimeout(waiting);
    }
    waiting = setTimeout(function () {
      func();
    }, delay);
  };
  const sendCity = () => {
    console.log(city, "city", "sendCity()");
    try {
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
    } catch (error) {}
  };
  const suggestion = (data) => {
    console.log(data, "suggestion");
  };
  const sevenDays = (lat, lon) => {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2ce49f5497b0e1543e90993ba28432a6&units=metric`
        )
        .then((res) => {
          setDays(res.data.daily);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch {}
  };
  useEffect(() => {
    takeLocation();
  }, [city]);
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
          onChange={(e) => {
            setCity(e.target.value);
            // debounce(sendCity, 1000);
          }}
        />
        <button className="searchIcon" onClick={sendCity}>
          <SearchOutlinedIcon fontSize="medium" />
        </button>
      </div>
      <div id="detail">
        {days.map((e) => (
          // console.log(e);
          <div>
            <div>{e.temp.day}℃</div>
            <img
              src="http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png"
              alt=""
            />
            <div>{e.weather[0].main}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
