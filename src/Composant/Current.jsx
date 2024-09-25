import React from 'react';
import Detail from './Detail';

export default function Current({ weather,details }) {
  console.log(details)
  return (
    
    <div className="current-weather">
     
      <div className="current-temperature">
        <span>{weather.temperature}°</span><br />
        <span>{weather.description} Day</span>
      </div>
      

    </div>
  );
}
