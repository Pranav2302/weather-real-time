import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconCloud, IconSun, IconCloudRain, IconSnowflake } from "@tabler/icons-react";
import { SparklesCore } from "./ui/sparkles";
import { GridPattern } from "./ui/grid-pattern";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("London");
  const [bgPattern, setBgPattern] = useState("clear");
  const [error, setError] = useState("");

  const API_KEY = "18158c1652af7c9ab554bc0efebb2c6c";

  // Add this function to determine background pattern based on weather
  const getBackgroundPattern = (weatherCode, temp) => {
    if (!weatherCode) return "clear";
    
    const code = weatherCode.toLowerCase();
    if (code.includes('clear')) {
      return "clear";
    } else if (code.includes('rain')) {
      return "rain";
    } else if (code.includes('snow')) {
      return "snow";
    } else if (code.includes('cloud')) {
      return "clouds";
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
    const fetchWeather = async () => {
      if (!city.trim()) return;
      
      setLoading(true);
      setError("");
      
      try {
        const formattedCity = city.trim().replace(/\s+/g, ' ');
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(formattedCity)}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("City not found. Please check the spelling.");
          }
          throw new Error(`Weather service error: ${response.status}`);
        }
        
        const data = await response.json();
        setWeather(data);
        setBgPattern(getBackgroundPattern(data.weather[0]?.main, data.main?.temp));
        setError("");
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather(null);
        setBgPattern("clear");
        setError(error.message || "Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (city.trim()) {
        fetchWeather();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [city]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
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
      
      {bgPattern === "rain" && (
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

      {bgPattern === "clouds" && (
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
      <div className="w-full max-w-md px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 shadow-lg"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-cyan-500"
            placeholder="Enter city name..."
          />
          
          {loading ? (
            <div className="text-center text-white">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : weather ? (
            <div className="text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{weather.name}</h2>
                {getWeatherIcon(weather.weather[0]?.main)}
              </div>
              <div className="mt-4">
                <p className="text-4xl font-bold">{Math.round(weather.main?.temp)}°C</p>
                <p className="text-slate-400">{weather.weather[0]?.description}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <p className="text-slate-400">Humidity</p>
                  <p className="text-xl">{weather.main?.humidity}%</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <p className="text-slate-400">Wind Speed</p>
                  <p className="text-xl">{weather.wind?.speed} m/s</p>
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