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
  const [tempgraph, setTempgraph] = useState("");
  const [tempicon, setTempicon] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  let waiting;

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
        // stops: [0, 50, 100],
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
        data: [28, 26, 30, 27, 25, 30, 31, 28, 26, 30, 27, 30, 27, 24, 30],
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
    axios
      .get("http://ip-api.com/json")
      .then((response) => {
        setCity(response.data.city);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${response.data.city}&appid=44d2f0f421a5b483b38e2ea12704107e&units=metric`
          )
          .then((res) => {
            console.log(res.data, "res");
            sevenDays(res.data.coord.lat, res.data.coord.lon);
            detailDiv(
              res.data.main.temp,
              res.data.weather[0].icon,
              res.data.sys.sunrise,
              res.data.sys.sunset,
              res.data.main.pressure,
              res.data.main.humidity
            );
            // setSunrise();
            // setSunset(res.data.sys.sunset);
          })
          .catch((err) => {
            console.log(err);
          });
      })

      .catch((status) => {
        console.log("Request failed.  Returned status of", status);
      });
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

  const detailDiv = (data1, data2, sunRise, sunSet, presure, humdity) => {
    console.log("detailDiv", sunRise, sunSet, presure, humdity);
    let hrRise = new Date(sunRise * 1000).getHours();
    let minRise = "0" + new Date(sunRise * 1000).getMinutes();
    let hrSet = new Date(sunSet * 1000).getHours();
    let minSet = "0" + new Date(sunSet * 1000).getMinutes();
    let rise = hrRise + ":" + minRise.substr(-2);
    let set = (hrSet % 12) + ":" + minSet.substr(-2);

    // console.log(hrRise, minRise.substr(-2));
    setTempgraph(data1);
    setTempicon(data2);
    setSunrise(rise);
    setSunset(set);
    setPressure(presure);
    setHumidity(humdity);
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
          value={city}
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
          <div
            key={e.id}
            onClick={() => {
              detailDiv(
                e.temp.day,
                e.weather[0].icon,
                e.sunrise,
                e.sunset,
                e.pressure,
                e.humidity
              );
            }}
            tabIndex="1"
          >
            <div>
              {new Date(`${e.dt}` * 1000).toLocaleDateString("en", {
                weekday: "long",
              })}
            </div>
            <span>{Math.ceil(e.temp.day)}℃</span>
            <img
              src={`https://openweathermap.org/img/wn/${e.weather[0].icon}.png`}
              alt=""
            />

            <div>{e.weather[0].main}</div>
          </div>
        ))}
      </div>
      <div className="tempChart">
        <div className="tempChartTemp">
          <span>{Math.ceil(tempgraph)}℃</span>
          <img
            src={`https://openweathermap.org/img/wn/${tempicon || "10d"}.png`}
            alt=""
          />
        </div>
        <Chart
          options={chartData}
          series={chartData.series}
          // type="area"
          // width={500}
          // height={320}
        />
        <div className="PressureHumidity">
          <div>
            <div className="pressure">Pressure</div>
            <div>{pressure || 1210} hpa</div>
          </div>
          <div>
            <div className="humidity">Humidity</div>
            <div>{humidity || 43} %</div>
          </div>
        </div>
        <div className="sunriseSunset">
          <div>
            <div className="sunrise">Sunrise</div>
            <div>{sunrise || "6:00"}am</div>
          </div>
          <div>
            <div className="sunset">Sunset</div>
            <div>{sunset || "7:00"}pm</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
