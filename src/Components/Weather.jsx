import React from 'react';

export default function Weather(props) {
  return (
    <div>
      <div className="weather">
        <h1 className="city-name">{props.cityname}</h1>
        <div className="weather-icon">
          <i className={`wi ${props.weatherIcon} display-1 `} />
        </div>

        {props.temp_celsius ? (<h1 className="tempreture">{props.temp_celsius}&deg;</h1>) : null}
        
        
        {minmaxTemp(props.temp_min, props.temp_max)}

        <h4 className="description">{props.description.charAt(0).toUpperCase() +
          props.description.slice(1)}</h4>
      </div>
    </div>
  )
};

function minmaxTemp(min, max){
  if(min && max){
    return(
      <h3>
        <span className="min-temp">{min}&deg;</span>
        <span className="max-temp">{max}&deg;</span>
      </h3>
    )
  }
}
