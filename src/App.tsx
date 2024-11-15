import { useEffect, useState } from "react";
import "./App.css";
import { url } from "./constants/constants";
import { DataProps, Data } from "./constants/types";
import * as d3 from "d3";
import Heatmap from "./Heatmap/Heatmap";

const initObj = {
  baseTemperature: 0,
  monthlyVariance: [],
};

const App = () => {
  const [data, setData] = useState<DataProps>(initObj);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchData();
  }, []);

  const { baseTemperature, monthlyVariance }: DataProps = data;
  
  const [minYear, maxYear] = d3.extent(monthlyVariance, (d: Data) => d.year);
  const validMinYear = minYear ?? "No data";
  const validMaxYear = maxYear ?? "No data";
  
  return (
    <div className="App">
      <div className="header-bar">
        <h1 id="title" className="title">
          Global temperature <b>variance</b> (monthly)
        </h1>
        <p
          id="description"
          className="desc"
        >{`${validMinYear} - ${validMaxYear}: Base temp. ${baseTemperature}°C`}</p>
      </div>
      <Heatmap data={monthlyVariance} baseTemp={baseTemperature} />
    </div>
  );
};

export default App;
