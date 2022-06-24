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
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=44d2f0f421a5b483b38e2ea12704107e&units=metric`
        )
        .then((res) => {
          sevenDays(res.data.coord.lat, res.data.coord.lon);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };
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
  const suggestion = (data) => {
    console.log(data, "suggestion");
  };
  const sevenDays = (lat, lon) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=44d2f0f421a5b483b38e2ea12704107e&units=metric`
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
            <span>{e.temp.day}℃</span>
            <img
              src={`http://openweathermap.org/img/wn/${e.weather[0].icon}.png`}
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
