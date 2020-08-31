import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.scss';
import { WingBlank } from 'antd-mobile';
import Calender from "../../components/calendar";
import DiyFooter from "../../components/footer";

function App() {
  const [date, setDate] = useState({});
  useEffect(() => {
  }, [])

  // 接收子组件传过来的日期数据
  const getSelectDate = data => {
    setDate(data);
  }


  return (
    <div className="App">
      <WingBlank>
        <header className="header">
          <h1 className="title">
          橙子
          <img src={require("../../common/images/orange.png")} width="40px" alt="logo" />
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

        {/* 底部组件 */}
        <Router>
            <Route path="/" component={DiyFooter} />
        </Router>

      </WingBlank>
    </div>
  );
}

export default App;
