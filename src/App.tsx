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
  const { baseTemperature, monthlyVariance }: DataProps = data;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const json = res.json();
      
      setData(await json);
    };

    fetchData().catch((err) => console.error(err));

    fetchData();
  }, [data]);

  const [minYear, maxYear] = d3.extent(monthlyVariance, (d: Data) => d.year)

  return (
    <div className="App">
      <h1 id="title" className="title">Global temperature variance (monthly)</h1>
      <h2 id="description" className="desc">{`${minYear} - ${maxYear}: Base temp ${baseTemperature}°C`}</h2>
      <Heatmap data={monthlyVariance} />
    </div>
  );
};

export default App;
