import { useEffect, useState } from "react";
import "./App.css";
import { url } from "./constants/constants";
import { DataProps, Data } from "./constants/types";
import * as d3 from "d3";
import Heatmap from "./Heatmap/Heatmap";
import Header from "./Header/Header";

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
  const validMinYear = minYear ?? "Loading...";
  const validMaxYear = maxYear ?? "Loading...";

  const validBaseTemp = baseTemperature === 0 ? "Loading..." : baseTemperature;
  
  return (
    <div className="App">
      <Header min={validMinYear} max={validMaxYear} baseTemp={validBaseTemp} />
      <Heatmap data={monthlyVariance} baseTemp={+(Math.round(baseTemperature * 100) / 100).toFixed(2)} />
    </div>
  );
};

export default App;
