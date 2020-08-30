import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import './index.scss';
import { WingBlank } from 'antd-mobile';
import Calender from "../../components/calendar";

const path = require("path");
function App() {
  const [date, setDate] = useState({});
  useEffect(() => {
  }, [])

  // 接收子组件传过来的日期数据
  const getSelectDate = data => {
    setDate(data);
  }

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
        <header className="header">
          <h1 className="title">
            橙子
          <img src={require("../../common/images/orange.png")} width="40px" />
          日历
          </h1>
        </header>
        <Router>
          <Switch>
            <Route path="/" render={() => (
              <Calender selectDate={data => getSelectDate(data)} />
            )} />
          </Switch>
        </Router>
      </WingBlank>
    </div>
  );
}

export default App;
