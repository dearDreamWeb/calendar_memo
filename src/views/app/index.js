import React, { useEffect } from "react";
import './index.scss';
import { WingBlank } from 'antd-mobile';
import Calender from "../../components/calendar";


function App() {
  useEffect(() => {
    // init()

  }, [])

  // function init() {
  //   window.AMap.plugin('AMap.CitySearch', function () {
  //     var citySearch = new window.AMap.CitySearch()
  //     citySearch.getLocalCity(function (status, result) {
  //       if (status === 'complete' && result.info === 'OK') {
  //         // 查询成功，result即为当前所在城市信息
  //         console.log(result)
  //       }
  //     })
  //   })
  // }

  return (
    <div className="App">
      <WingBlank>
        <header className="header">橙子日历</header>
        <Calender />
      </WingBlank>
    </div>
  );
}

export default App;
