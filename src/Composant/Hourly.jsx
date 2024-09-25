import React from 'react';

export default function Hourly({ forecast }) {
  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="forecast-container">
        {forecast.map((hour, index) => (
          <div key={index} className="forecast-hour">
            <span>{hour.time}</span>
            <span>{hour.temperature}°</span>
            <img src={hour.icon} alt={hour.description} />
          </div>
        ))}
      </div>
    </div>
  );
}
