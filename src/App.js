import React, { useEffect } from 'react';
import './App.css';
// import { Button } from 'antd-mobile';
import { Map } from 'react-amap';


function App() {
   //eslint-disable-next-line
  const citySearch = new AMap.CitySearch();
  useEffect(() => {
    init()

  }, [])

  function init() {
    citySearch.getLocalCity((status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        // 查询成功，result即为当前所在城市信息
        console.log('当前所在城市：', result)
        if (result && result.city && result.bounds) {
          // 当前城市名称
          // const cityinfo = result.city;

        
        }
      }
    })
    // citySearch.getLocalCity(function (status, result) {
    //   if (status === 'complete' && result.info === 'OK') {
    //     // 查询成功，result即为当前所在城市信息
    //     console.log(result)
    //   }
    // })
  }

  return (
    <div className="App">
      <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <Map amapkey={"84b770bc352b74056e4a1a21f3c8d109"}>

        </Map>
      </div>
    </div>
  );
}

export default App;
