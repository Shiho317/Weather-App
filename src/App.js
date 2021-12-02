import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from './Components/Form';
import Weather from './Components/Weather';
import Background from './Components/Background';
import VideoThunderstorm from './videos/Thunderstorm.mp4';
import VideoRain from './videos/Rain.mp4';
import VideoDrizzle from './videos/Rain.mp4';
import VideoSnow from './videos/Snow.mp4';
import VideoAtomosphere from './videos/Atomosphere.mp4';
import VideoClear from './videos/Clear.mp4';
import VideoClouds from './videos/Clouds.mp4';

const API_key = '3484dba8a8313137cea9bc9bf5f8158c';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      video: "",
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false
    }

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atomosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }

    this.weatherVideo = {
      Thunderstorm: VideoThunderstorm,
      Drizzle: VideoDrizzle,
      Rain: VideoRain,
      Snow: VideoSnow,
      Atomosphere: VideoAtomosphere,
      Clear: VideoClear,
      Clouds: VideoClouds
    }

  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15)
    return cell
  }

  get_WeatherIcon(icons, rangeID){
    switch(true){
      case rangeID >= 200 && rangeID<= 232: this.setState({icon: icons.Thunderstorm});
      break;
      case rangeID >= 300 && rangeID<= 321: this.setState({icon: icons.Drizzle});
      break;
      case rangeID >= 500 && rangeID<= 531: this.setState({icon: icons.Rain});
      break;
      case rangeID >= 600 && rangeID<= 622: this.setState({icon: icons.Snow});
      break;
      case rangeID >= 701 && rangeID<= 781: this.setState({icon: icons.Atomosphere});
      break;
      case rangeID === 800: this.setState({icon: icons.Clear});
      break;
      case rangeID >= 801 && rangeID<= 804: this.setState({icon: icons.Clouds});
      break;
      default: this.setState({icon: icons.Clouds});
    }
  }

  get_WeatherBackground(videos, rangeID){
    switch(true){
      case rangeID >= 200 && rangeID<= 232: this.setState({video: videos.Thunderstorm});
      break;
      case rangeID >= 300 && rangeID<= 321: this.setState({video: videos.Drizzle});
      break;
      case rangeID >= 500 && rangeID<= 531: this.setState({video: videos.Rain});
      break;
      case rangeID >= 600 && rangeID<= 622: this.setState({video: videos.Snow});
      break;
      case rangeID >= 701 && rangeID<= 781: this.setState({video: videos.Atomosphere});
      break;
      case rangeID === 800: this.setState({video: videos.Clear});
      break;
      case rangeID >= 801 && rangeID<= 804: this.setState({video: videos.Clouds});
      break;
      default: this.setState({video: videos.Clouds});
    }
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country){
      const api_call = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max) ,
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
      this.get_WeatherBackground(this.weatherVideo, response.weather[0].id);

    } else {
      this.setState({error: true})
    }
  };

  render(){
    return (
    <div className="App">
      <Background video={this.state.video}/>
      <Form getWeather={this.getWeather} error={this.state.error}/>
      <Weather
      cityname={this.state.city} 
      description={this.state.description}
      temp_celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      weatherIcon={this.state.icon}
      />
    </div>
  );
  }
}

export default App;
