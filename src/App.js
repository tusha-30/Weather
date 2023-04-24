import cold from './pics/cold.jpg';
import hot from './pics/sun.jpg';
//import def from './pics/def.jpg';
//import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Descriptions from './comp/Descriptions';
import './App.css';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';


function App() {

  const [city,setCity]=useState("jalandar");
  const [weather,setWeather]=useState(null);
  const [units,setUnits]=useState("metric");
  const [bg,setBg]=useState(hot);

  useEffect(()=>{
    const fetchWeatherData=async()=>{

    
    const data=await getFormattedWeatherData(city,units);
  setWeather(data);

  //dynamic bg
  const thr=units==="metric"?20:60;
  if(data.temp<=thr) setBg(cold);
  else setBg(hot);

  };
  fetchWeatherData();
},[units,city]);

const handleUnitsClick=(e)=>{
const button=e.currentTarget;
const currentUnit=button.innerText.slice(1);
const isCelsius= currentUnit==='C';
button.innerText=isCelsius?'Convert in c':'Convert in f';
setUnits(isCelsius?"metric":"imperial");
};

const handleUnitsClickC=(e)=>{
  const button=e.currentTarget;
  const currentUnit=button.innerText.slice(1);
  const isCelsius= currentUnit==='F';
  button.innerText=isCelsius?'Convert in f':'Convert in c';
  setUnits(isCelsius?"imperial":"metric");
  };

const enterKey=(e)=>{
if(e.keyCode===13){
  setCity(e.currentTarget.value);
}
};
  return (
    <div className="app" style={{backgroundImage:`url(${bg})`}}>
<div className='overlay'>
  {
    weather && (<div className='container'>

    <div className='section section__inputs'>
      <input onKeyDown={enterKey} type='text' name='city' placeholder='Enter Cityname ..'/>
      <button onClick={(e)=> handleUnitsClick(e)}>Convert in F</button>
      <button onClick={(e)=> handleUnitsClickC(e)}>Convert in C</button>
    </div>


    <div className='section section__temperature'>
      <div className='icon'>
        <h3>{`${weather.name},${weather.country}`}</h3>
        <img src={weather.iconURL} alt='weathericon'/>
        <h3>{weather.description}</h3>
      </div>

      <div className='temperature'>
        <h2>{`${weather.temp.toFixed()} ${units === 'metric'? '°C' : '°F'} `}</h2>
      </div>

    </div>

    {/**buttom desc */}
    <Descriptions  weather={weather} units={units}/>
  </div>)
  }
  
  
</div>
    </div>
  );
}

export default App;
