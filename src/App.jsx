import React, { useEffect, useState, useCallback } from 'react';
import Daily from './Composant/Daily';
import Hourly from './Composant/Hourly';
import Details from './Composant/Datails';
import Current from './Composant/Current';
import axios from 'axios';
import { styled } from "@mui/material/styles";
import Detail from './Composant/Detail';
import Loader from './Loader/Loader';
import { TextField, Autocomplete } from '@mui/material';
import "./App.css";

const InputSuggest = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiFormLabel-root': {
    color: 'white',
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
});

const AutoComp = styled(Autocomplete)({
  width: '300px',
  '& .MuiAutocomplete-listbox': {
    fontSize: '16px',
    maxHeight: '300px',
  },
});

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = '0f5c9de4e91047abbd795306240608';
  const [city, setCity] = useState('Antananarivo');
  const [suggestions, setSuggestions] = useState([]);

  // Fonction pour charger les données météo
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
        params: {
          key: apiKey,
          q: city,
          days: 10,
          aqi: 'yes',
          alerts: 'no'
        }
      });
      setWeatherData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [city, apiKey]);

  // Appel de fetchData si city change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const miovaCity = useCallback((event, value) => {
    if (value) {
      setCity(value);
    }
  }, []);

  const MakaSuggestion = useCallback(async (query) => {
    try {
      const response = await axios.get('https://api.weatherapi.com/v1/search.json', {
        params: {
          key: apiKey,
          q: query,
        },
      });
      setSuggestions(response.data.map((item) => item.name));
    } catch (error) {
      console.error('Erreur :', error);
    }
  }, [apiKey]);

  const miovaInput = useCallback((event, value) => {
    MakaSuggestion(value);
  }, [MakaSuggestion]);

  if (loading) return <Loader />;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!weatherData) return <Loader />;

  const current = {
    location: weatherData.location.name,
    temperature: weatherData.current.temp_c,
    description: weatherData.current.condition.text,
    summary: weatherData.current.condition.text,
  };

  const hourly = weatherData.forecast.forecastday[0].hour.map(hour => ({
    time: hour.time.split(' ')[1],
    temperature: hour.temp_c,
    icon: hour.condition.icon,
    description: hour.condition.text,
  }));

  const daily = weatherData.forecast.forecastday.map(day => ({
    date: day.date,
    temperature: day.day.avgtemp_c,
    icon: day.day.condition.icon,
    description: day.day.condition.text,
  }));

  const details = [
    { title: 'Feels Like', value: `${weatherData.current.feelslike_c}°` },
    { title: 'Precipitation', value: `${weatherData.current.precip_mm} mm` },
    { title: 'Visibility', value: `${weatherData.current.vis_km} km` },
    { title: 'Humidity', value: `${weatherData.current.humidity}%` },
    { title: 'UV Index', value: weatherData.current.uv },
    { title: 'Wind', value: `${weatherData.current.wind_kph} kph` },
  ];

  return (
    <div className='App'>
      <div className='search-bar'>
        <AutoComp
          freeSolo
          options={suggestions}
          onInputChange={miovaInput}
          onChange={miovaCity}
          renderInput={(params) => <InputSuggest {...params} label='Ville' variant='outlined' />}
          value={city}
        />
      </div>
      <div className='current'>
        <Current weather={current} details={details} />
        <Detail details={details} />
      </div>
      <div className='forecast'>
        <Hourly forecast={hourly} />
        <Daily forecast={daily} />
        <Details details={details} />
      </div>
    </div>
  );
}
