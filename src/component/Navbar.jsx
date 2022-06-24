import "../css/Navbar.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
function Navbar() {
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
