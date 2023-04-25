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
button.innerText=isCelsius?'C':'F';
setUnits(isCelsius?"metric":"imperial");
};

const handleUnitsClickC=(e)=>{
  const button=e.currentTarget;
  const currentUnit=button.innerText.slice(1);
  const isCelsius= currentUnit==='F';
  button.innerText=isCelsius?'F':'C';
  setUnits(isCelsius?"imperial":"metric");
  };

const enterKey=(e)=>{
if(e.keyCode===13){
  setCity(e.currentTarget.value);
}
};

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);

const handleLogin = (e) => {
  e.preventDefault();
  // Check if the username and password match the dummy credentials
  if (username === 'admin' && password === 'admin') {
    // Set the isLoggedIn state to true and save it to localStorage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
  } else {
    alert('Incorrect username or password');
  }
};

const handleLogout = () => {
  // Set the isLoggedIn state to false and remove it from localStorage
  setIsLoggedIn(false);
  localStorage.removeItem('isLoggedIn');
};

if (!isLoggedIn) {
  return (
    <div className='Form-outer'>
      
    <form className="login-form" onSubmit={handleLogin}>
    <h1>Login to Use the Weather App</h1>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
    </div>
  );
}


  return (
    <div className="app" style={{backgroundImage:`url(${bg})`}}>
<div className='overlay'>
  {
    weather && (<div className='container'>

    <div className='section section__inputs'>
      <input onKeyDown={enterKey} type='text' name='city' placeholder='Enter Cityname ..'/>
      <button onClick={(e)=> handleUnitsClick(e)}>F</button>
      <button onClick={(e)=> handleUnitsClickC(e)}>C</button>
      <button onClick={handleLogout}>Logout</button>
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