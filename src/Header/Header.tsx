import { HeaderProps } from "../constants/types";
import "./Header.css";

const Header = ({ min, max, baseTemp }: HeaderProps) => (
    <div className="header-bar">
      <h1 id="title" className="title">
        Global temperature <b>variance</b> (monthly)
      </h1>
      <p
        id="description"
        className="desc"
      >{`${min} - ${max}: Base temp. ${baseTemp}°C`}</p>
    </div>
  );

export default Header
