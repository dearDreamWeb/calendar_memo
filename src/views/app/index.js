import React, { useReducer, useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import './index.scss';
import { WingBlank } from 'antd-mobile';
import { reducer, ContextData, initData } from "../../useReducer" //引入useReducer文件
import Calender from "../../components/calendar";  // 日历组件
import DiyFooter from "../../components/footer";   // 底部组件
import Memo from "../../views/memo";      // 待办
import AddMemo from "../../views/addMemo";      // 添加备忘录

function App() {

  //  获取是state和dispatch 
  const [state, dispatch] = useReducer(reducer, initData);

  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    phoneOrPc();
  }, [])

  const phoneOrPc = () => {
    let result = navigator.userAgent.match(
      /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
    );
    setIsPhone(result);
  }

  return (
    // 获取到useContext中存的值
    <ContextData.Provider value={{
      state,
      dispatch // 把 dispatch 也作为 context 的一部分共享下去，从而在嵌套组件中调用以实现更新顶层的 state
    }}>
      <div className="App">
        {/* 判断是否是手机 */}
        {isPhone
          ? ""
          : (<div className="tip-wrap">
            <div className="tip">
              <div
                className="close"
                onClick={() => setIsPhone(true)}
              >X</div>
              <h1 className="title">
                请手机扫描二维码或者使用浏览器手机模式浏览
                </h1>
              <div className="img_wrap">
                <img
                  src="https://s1.ax1x.com/2020/09/07/wnPSCF.png"
                  alt="二维码"
                />
              </div>
            </div>
          </div>)
        }

        <WingBlank>
          <header className="header">
            <h1 className="title">
              橙子
          <img src={require("../../common/images/orange.png")} width="40px" alt="logo" />
          日历
          </h1>
          </header>
          <Switch>

            <Route exact path="/home" component={Calender} />

            <Route exact path="/memo" component={Memo} />

            <Route exact path="/addmemo" component={AddMemo} />

            <Redirect from='/' to='/home'></Redirect>
          </Switch>

          {/* 底部组件 */}
          <DiyFooter />

        </WingBlank>

      </div>
    </ContextData.Provider>

  );
}

export default App;
