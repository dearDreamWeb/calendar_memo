import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./index.scss";

const Weather = props => {

    Weather.propTypes = {
        date: PropTypes.object.isRequired,
        isToday: PropTypes.bool.isRequired
    }
    const [date, setDate] = useState({});  // 日期
    const [locationWeather, setLocationWeather] = useState({});  // 城市的天气数据


    useEffect(() => {
        getLocation();
    }, [])

    useEffect(() => {
        setDate(props.date)
    }, [props.date])

    // 获取所在地
    const getLocation = () => {
        window.AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new window.AMap.CitySearch()
            citySearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    // 查询成功，result即为当前所在城市信息
                    getWeather(result.adcode);
                }
            })
        })
    }

    // 获取所在地天气
    const getWeather = adcode => {
        //加载天气查询插件
        window.AMap.plugin('AMap.Weather', function () {
            //创建天气查询实例
            var weather = new window.AMap.Weather();
            //执行实时天气信息查询
            weather.getLive(adcode, function (err, data) {
                if (err) return;
                setLocationWeather(data);
            });
        });
    }

    return (
        <div className="weather">
            <div className="left">
                <p className="info_top">{date.lunar ? date.lunar.slice(date.lunar.indexOf("农历")) : ""}</p>
                <p className="info_bottom">{date.lunar ? date.lunar.slice(0, date.lunar.indexOf("农历")) : ""}</p>
            </div>
            {
                locationWeather.temperature && props.isToday
                    ? (
                        <div className="right">
                            <p className="info_top">{`${locationWeather.temperature}℃ ${locationWeather.weather}`}</p>
                            <p className="info_bottom">{locationWeather.province} {locationWeather.city}</p>
                        </div>
                    )
                    : null
            }

        </div>
    )
}
export default Weather;