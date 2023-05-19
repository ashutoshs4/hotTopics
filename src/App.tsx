import * as React from "react";
import "./App.css";
import axios from "axios";
import moment from 'moment';
import LoadingComponent from "./loader/LoadingComponent";
import WeekDaysWeather from "./weather/WeekDaysWeather";
import WeatherSvg from "./svgIcons/WeatherSvg";
import NavbarTop from "./header/NavbarTop";


interface NewsDataInterface {
  title: string;
  urlToImage: any;
  publishedAt: any;
  url: any;
}

function App() {

  const [newsData, setNewsData] = React.useState<NewsDataInterface[]>([]); // Set news data in this state
  const [currPage, setCurrPage] = React.useState<number>(1); // For pagination
  const [loading, setLoading] = React.useState<boolean>(true); // Loader
  const [weatherData, setWeatherData] = React.useState<any[]>([]); // Set weather data in this state


  /**
   * Getting News Data
   */
  const getNews = async () => {
    await axios
      .get(`https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&pageSize=8&page=${currPage}&apiKey=ce842ce364474af1bbdc3fb1a2bda16f`)
      .then((data) => {
        setNewsData((prev) => [...prev, ...data.data.articles]);
        setLoading(false);

      })
      .catch((error) => console.log(error));
  }

  /**
   * Handling InfiniteScroll functionality
   */
  const handelInfiniteScroll = async () => {
    try {
      if (document.documentElement.scrollHeight < window.innerHeight + document.documentElement.scrollTop + 1) {
        setCurrPage((prev) => prev + 1);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Getting Weather Data
   * 
   * Note: I am traying to get weather information with this api but i am not getting weather information. Please check.
   * Error: Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan. Learn more here https://openweathermap.org/price.
   * Errorcode: 401
   */

  const getWeather = async () => {
    await axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=30.680439786468128&lon=-88.81896972656251&dt=1602702000&appid=550090e0a032df985195f4bc7b111ab5`)
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => console.log(error));
  }

  getWeather();

  React.useEffect(() => {
    getNews();
  }, [currPage]);


  React.useEffect(() => {
    window.addEventListener('scroll', handelInfiniteScroll);
    return () => window.removeEventListener('scroll', handelInfiniteScroll); // Remove handelInfiniteScroll function
  }, []);

  return (
    <div className="container">
      <NavbarTop />
      <div className="row mt-4">

        {/* Start Banner  */}
        <div className="col-sm-9 order-sm-first order-last">

          {newsData.map((data, key) => {
            if (key == 0)
              return (
                <div className="carousel-inner" key={key}>
                  <img
                    src={data.urlToImage}
                    alt="banner"
                    className="img-fluid banner-img"
                  />
                  <div className="carousel-caption text-start">
                    <h2 className="bannner-tilte">{data.title}</h2>
                    <p className="banner-p text-capitalize">{moment.utc(data.publishedAt).local().startOf('seconds').fromNow()}</p>
                  </div>
                </div>
              );
          })}

        </div>

        {/* End Banner */}

        <div className="col-sm-3 d-none d-lg-block d-md-block">
          <div className="rectangle">
            <div className="d-flex justify-content-between">
              <div>
                <h3 className="rectangle-text">17°</h3>
                <h5>London UK</h5>
              </div>

              <div>
                <WeatherSvg />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <WeekDaysWeather />
          </div>
        </div>
      </div>

      {/* Start Latest News */}

      <div className="row mt-5">
        <h2 className="latest-news mb-3">Latest News</h2>
        {newsData.map((data, key) => {
          if (key != 0)
            return (
              <div className="col-sm-3 mb-5" key={key}>
                <img src={data.urlToImage} className="img-fluid rounded set-image" />
                <div className="news-content">
                  <h4 className="text-capitalize news-title mt-3">
                    {data.title.substring(0, 60)} <a href={data.url} className="read-more">Read More</a>
                  </h4>
                </div>
                <p className="timer mt-4 text-capitalize">
                  {moment.utc(data.publishedAt).local().startOf('seconds').fromNow()}
                </p>
              </div>
            );
        })}
        {loading && <LoadingComponent />}
      </div>

      {/* End Latest News */}

    </div>
  );
}

export default App;
