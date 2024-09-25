import React from 'react';

export default function Daily({ forecast }) {
  return (
    <div className="daily-forecast">
      <h3>10-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <span>{day.date}</span>
            <span>{day.temperature}°</span>
            <img src={day.icon} alt={day.description} />
          </div>
        ))}
      </div>
    </div>
  );
}
