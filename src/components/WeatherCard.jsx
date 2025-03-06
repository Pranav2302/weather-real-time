import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconCloud, IconSun, IconCloudRain, IconSnowflake } from "@tabler/icons-react";
import { SparklesCore } from "./ui/sparkles";
import { GridPattern } from "./ui/grid-pattern";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {Toaster} from "./ui/sonner"
import { toast } from "sonner"

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Pune");
  const [bgPattern, setBgPattern] = useState("clear");
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState(null);
 
  const API_KEY = import.meta.env.VITE_API_KEY;

  // this function to determine background pattern based on weather
  const getBackgroundPattern = (weatherCode, temp) => {
    if (!weatherCode) return "clear";
    
    const code = weatherCode.toLowerCase();
    if (code.includes('clear')) {
      return "clear";
    } else if (code.includes('rain')) {
      return "rainy";
    } else if (code.includes('snow')) {
      return "snow";
    } else if (code.includes('clouds')) {
      return "cloudy";
    }
    return "clear"; // default pattern
  };

  const getWeatherIcon = (weatherCode) => {
    if (!weatherCode) return <IconCloud className="w-12 h-12" />;
    
    const code = weatherCode.toLowerCase();
    if (code.includes('clear')) return <IconSun className="w-12 h-12 text-yellow-400" />;
    if (code.includes('rain')) return <IconCloudRain className="w-12 h-12 text-blue-400" />;
    if (code.includes('snow')) return <IconSnowflake className="w-12 h-12 text-blue-200" />;
    return <IconCloud className="w-12 h-12 text-gray-400" />;
  };
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city.trim()) return;
      
      setLoading(true);
      setError("");
      
      try {
        const formattedCity = city.trim().replace(/\s+/g, ' ');
        
        // First, get coordinates from city name
        const geoResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(formattedCity)}&appid=${API_KEY}&units=metric`
        );
        
        if (!geoResponse.ok) {
          if (geoResponse.status === 404) {
            throw new Error("City not found. Please check the spelling.");
          }
          throw new Error(`Weather service error: ${geoResponse.status}`);
        }
        
        const weatherData = await geoResponse.json();
        setWeather(weatherData);
        setBgPattern(getBackgroundPattern(weatherData.weather[0]?.main, weatherData.main?.temp));

        // Then, get hourly forecast using coordinates
        const { lat, lon } = weatherData.coord;
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!forecastResponse.ok) {
          throw new Error(`Forecast service error: ${forecastResponse.status}`);
        }
  const forecastData = await forecastResponse.json();
        setForecast(forecastData);
        setError("");
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather(null);
        setForecast(null);
        setBgPattern("clear");
        toast(error.message || "Failed to fetch weather data")
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (city.trim()) {
        if(city.length >= 3){
          fetchWeatherData();
        }
        else{
          console.log("Choose diferent city");
          toast(error.message || "Choose diferent city with letter greater then 3");
          setError("Choose diferent city with letter greater then 3")
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [city]);

  // Format forecast data for the chart
  const formatForecastData = () => {
    if (!forecast) return [];
    return forecast.list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      description: item.weather[0].description
    }));
  };
 
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
      <Toaster/>
      
      {/* Dynamic Background based on weather */}
      {bgPattern === "clear" && (
        <SparklesCore
          id="tsparticlesfull"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full absolute inset-0"
          particleColor="#FFFF00"
        />
      )}
      
      {bgPattern === "rainy" && (
        <div className="absolute inset-0">
          <GridPattern
            width={40}
            height={40}
            className="absolute inset-0 h-full w-full dark:stroke-white/[0.1] stroke-slate-200/[0.2]"
            squares={[
              [0, 2],
              [1, 4],
            ]}
          />
        </div>
      )}

      {bgPattern === "snow" && (
        <SparklesCore
          id="tsparticlessnow"
          background="transparent"
          minSize={0.2}
          maxSize={1}
          particleDensity={70}
          className="w-full h-full absolute inset-0"
          particleColor="#FFFFFF"
        />
      )}

      {bgPattern === "cloudy" && (
        <div className="absolute inset-0">
          <GridPattern
            width={60}
            height={60}
            className="absolute inset-0 h-full w-full dark:stroke-white/[0.1] stroke-slate-200/[0.2]"
            squares={[
              [0, 1],
              [1, 3],
            ]}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-3xl px-4 relative z-10 sm:px-6 md:px-8"> 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6 shadow-lg mx-auto
                  max-h-[85vh] overflow-y-auto
                  w-full sm:w-[90%] md:w-full
                  mt-16 sm:mt-0 " // Add top margin on mobile
      >
        {/* Search Input - Made smaller on mobile */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full mb-3 sm:mb-4 p-2 text-sm sm:text-base rounded bg-slate-800 text-white 
                    border border-slate-700 focus:outline-none focus:border-cyan-500"
          placeholder="Enter city name..."
        />
        
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 p-2 sm:p-4 text-sm sm:text-base">{error}</div>
        ) : weather ? (
          <div className="text-white">
            {/* Current Weather Header - Smaller on mobile */}
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">{weather.name}</h2>
              <div className="scale-75 sm:scale-100">
                {getWeatherIcon(weather.weather[0]?.main)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              {/* Current Weather Stats - Compact on mobile */}
              <div>
                <div className="mb-3 sm:mb-4">
                  <p className="text-3xl sm:text-4xl font-bold">{Math.round(weather.main?.temp)}°C</p>
                  <p className="text-sm sm:text-base text-slate-400">{weather.weather[0]?.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {/* Weather Stat Cards - Smaller padding on mobile */}
                  <div className="bg-slate-800/50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-slate-400">Humidity</p>
                    <p className="text-base sm:text-xl">{weather.main?.humidity}%</p>
                  </div>
                  <div className="bg-slate-800/50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-slate-400">Wind Speed</p>
                    <p className="text-base sm:text-xl">{weather.wind?.speed} m/s</p>
                  </div>
                  <div className="bg-slate-800/50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-slate-400">Feels Like</p>
                    <p className="text-base sm:text-xl">{Math.round(weather.main?.feels_like)}°C</p>
                  </div>
                  <div className="bg-slate-800/50 p-2 sm:p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-slate-400">Pressure</p>
                    <p className="text-base sm:text-xl">{weather.main?.pressure} hPa</p>
                  </div>
                  

                </div>
              </div>

              {/* Forecast Chart - Adjusted height for mobile */}
              <div className="bg-slate-800/30 p-2 sm:p-4 rounded-lg">
                <h3 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-4">24-Hour Forecast</h3>
                <div className="h-[150px] sm:h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatForecastData()}>
                      <XAxis 
                        dataKey="time" 
                        stroke="#fff" 
                        fontSize={10}
                        tick={{ fontSize: '10px' }}
                      />
                      <YAxis 
                        stroke="#fff" 
                        fontSize={10}
                        tickFormatter={(value) => `${value}°`}
                        tick={{ fontSize: '10px' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#fff',
                          fontSize: '12px'
                        }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="#60a5fa" 
                        strokeWidth={2} 
                        dot={{ fill: '#60a5fa', r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Hourly Forecast Cards - Compact on mobile */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  {formatForecastData().slice(0, 4).map((item, index) => (
                    <div key={index} className="bg-slate-800/30 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-slate-400">{item.time}</p>
                      <p className="text-base sm:text-xl font-bold">{item.temp}°C</p>
                      <p className="text-xs sm:text-sm text-slate-400 truncate">{item.description}</p>
                      <p className="text-xs sm:text-sm text-slate-400">Humidity: {item.humidity}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>
      </div>
    </div>
  );
};

export default WeatherCard;