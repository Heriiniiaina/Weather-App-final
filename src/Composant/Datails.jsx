import React from 'react';

export default function Details({ details }) {
  return (
    <div className="weather-details">
      {details.map((detail, index) => (
        <div key={index} className="detail-box">
          <h4>{detail.title}</h4>
          <p>{detail.value}</p>
        </div>
      ))}
    </div>
  );
}
