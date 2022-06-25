import "../css/Navbar.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { ApexOptios } from "apexcharts";

function Navbar() {
  const [city, setCity] = useState("");
  const [days, setDays] = useState([]);
  let waiting;
  // console.log("again", days);

  const chartData = {
    chart: {
      id: "apexchart-example",
      // foreColor: theme.palette.primary.main,
      type: "line",
    },
    xaxis: {
      categories: [
        12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12,
      ],
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        // colorStops: []
      },
    },
    legend: {
      // position: '',
      width: 400,
      // position: 'top',
    },
    series: [
      {
        name: "Temperature",
        type: "area",
        data: [440, 505, 414, 571, 227, 413, 201, 352, 652, 320, 257, 160],
      },
    ],
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
        // console.log("User's State is ", response.data.regionName);
        // console.log("User's City", response.data.city);
        // console.log(city, "inside location");
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

  const detailDiv = (data) => {
    console.log("detailDiv", data);
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
          <div onClick={() => detailDiv(e)} tabIndex="1">
            <span>{e.temp.day}℃</span>
            <img
              src={`http://openweathermap.org/img/wn/${e.weather[0].icon}.png`}
              alt=""
            />

            <div>{e.weather[0].main}</div>
          </div>
        ))}
      </div>
      <div className="tempChart">
        <Chart
          options={chartData}
          series={chartData.series}
          // type="area"
          // width={500}
          // height={320}
        />
      </div>
    </div>
  );
}

export default Navbar;
