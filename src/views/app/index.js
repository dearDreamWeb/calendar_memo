import React, { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './index.scss';
import { WingBlank } from 'antd-mobile';
import { reducer, ContextData, initData } from "../../useReducer" //引入useReducer文件
import Calender from "../../components/calendar";  // 日历组件
import DiyFooter from "../../components/footer";   // 底部组件
import Undone from "../../views/undone";      // 待办
import AddMemo from "../../views/addMemo";      // 添加备忘录

function App() {

  const [date, setDate] = useState({});
  //  获取是state和dispatch 
  const [state, dispatch] = useReducer(reducer, initData);

  // 接收子组件传过来的日期数据
  const getSelectDate = data => {
    setDate(data);
  }


  return (
    // 获取到useContext中存的值
    <ContextData.Provider value={{
      state,
      dispatch // 把 dispatch 也作为 context 的一部分共享下去，从而在嵌套组件中调用以实现更新顶层的 state
    }}>
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

              <Route exact path="/home" render={() => (
                <Calender selectDate={data => getSelectDate(data)} />
              )} />

              <Route path="/undone" render={() => (
                <Undone date={date} />
              )} />

              <Route path="/addmemo" component={AddMemo} />

              <Redirect from='/' to='/home'></Redirect>
            </Switch>
          </Router>

          {/* 底部组件 */}
          <DiyFooter date={date} />

        </WingBlank>
      </div>
    </ContextData.Provider>

  );
}

export default App;
