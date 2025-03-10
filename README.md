# Modern Weather Dashboard 🌦️

A sleek and responsive weather dashboard that provides real-time weather information with beautiful, dynamic backgrounds. Built with React, Vite, and TailwindCSS, featuring OpenWeather API integration.

![Weather Dashboard Demo](image.png)

## 🎯 Live Demo

[View Live Demo](https://weather-real-time-ochre.vercel.app/) - Live!

## ✨ Features

### Core Features
- 🌡️ Real-time weather data and conditions
- 📈 24-hour temperature forecast chart
- 🎨 Dynamic backgrounds based on weather
- 📱 Fully responsive design
- 🔍 Global city search
- 💨 Wind speed and direction
- 💧 Humidity levels
- 🌡️ "Feels like" temperature
- 🌪️ Pressure readings
  
### UI/UX Features
- ✨ Particle effects for clear weather
- 🌧️ Animated grid patterns for rain
- ❄️ Snowfall effect for snowy conditions
- ☁️ Cloud patterns for overcast weather
- 🎭 Smooth transitions between states
- 📊 Interactive temperature charts

## 🛠️ Built With
- [React](https://reactjs.org/) - UI Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [OpenWeather API](https://openweathermap.org/api) - Weather Data
- [Recharts](https://recharts.org/) - Charts
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [TailwindCSS Animate](https://github.com/jamiebuilds/tailwindcss-animate) - CSS Animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeather API key

### Installation

1. Clone the repository
2. Install dependencies (npm install)
3. Start the development server (npm run dev)
   
## 📦 Project Structure
<div style="display: flex; justify-content: space-between; gap: 20px;">

<pre>
📁 weather-dashboard/           # Root directory
|
|-- 📁 public/                  # Static files directory
|     |-- favicon.jpeg          # Website favicon
|
|-- 📁 src/                      # Source code directory
|     |
|     |-- 📁 components/ # React components
|     |     |
|     |     |-- WeatherCard.jsx           # Main weather component
|     |     |
|     |     |-- 📁 ui/   # UI components directory
|          |-- grid-pattern.jsx           # Grid pattern effect
|          |-- grid-background.jsx        # Background grid
|          |-- sparkles.jsx               # Sparkle effects
|     |
|     |-- App.jsx        # Root React component
|     |-- main.jsx       # Entry point
|     |-- index.css      # Global styles
|
|-- .env                 # Environment variables
|-- .gitignore           # Git ignore rules
|-- package.json         # Project dependencies
|-- tailwind.config.js   # Tailwind configuration
|-- vite.config.js       # Vite configuration
|-- README.md            # Project documentation
</pre>

<div>
  
# Weather Dashboard - Technical Documentation
## Core Concept
The Weather Dashboard is a React-based application that provides real-time weather information with an intuitive user interface and dynamic backgrounds. It leverages the OpenWeather API for data and implements modern web technologies for visualization.

## Key Components

### 1. WeatherCard Component
- **Purpose**: Main container for weather information
- **Functionality**:
  - Handles API calls to OpenWeather
  - Manages state for weather data
  - Controls background patterns
  - Renders weather metrics and charts

### 2. Background Effects
- **Types**:
  - Clear Weather: Sparkle particles using tsParticles
  - Rain: Animated grid pattern
  - Snow: White particle effect
  - Cloudy: Subtle grid background

### 3. API Integration
- **Endpoints Used**:
  - Current Weather: For immediate conditions
  - 5-Day Forecast: For hourly predictions

### 4. State Management
- React useState for local state
- useEffect for API calls and side effects
  
  
### Extra Features Implemented 🚀

1. **Enhanced UI/UX**
   - Dynamic backgrounds based on weather conditions
   - Smooth animations and transitions

2. **Advanced Weather Data**
   - 24-hour temperature forecast
   - Detailed metrics:
     - Wind speed
     - Humidity levels
     - Pressure readings

3. **Visual Enhancements**
   - Interactive temperature charts using Recharts
   - Weather-specific animations:
     - Particle effects for clear weather
     - Custom backgrounds for different conditions

4. **Technical Improvements**
   - API error handling
   - Performance optimizations

## 👏 Acknowledgments

- OpenWeather API for weather data
- Aceternity UI for background patterns
- TailwindCSS community

## 📧 Contact & Support

- Created by [Pranav Kamble]
- LinkedIn: [@LinkedIn](https://www.linkedin.com/in/pranav-kamble-a92a99204)
- Email: Pvkamble02@gmail.com

