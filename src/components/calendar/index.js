import React, { useState, useEffect } from 'react';
import './index.scss';

const Calender = () => {
    const [itemsArr, setItemsArr] = useState(new Array(35));
    const [year, setYear] = useState(new Date().getFullYear());           // 年
    const [month, setMonth] = useState(new Date().getMonth() + 1);        // 月
    const [day, setDay] = useState(new Date().getDate());                 // 日
    const [week, setWeek] = useState(new Date().getDay());                // 周几
    let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

    let monthDays = new Date(year, month + 1, 0).getDate();   // 本月有多少天
    let lastMonthDays = new Date(year, month, 0).getDate();   // 本月有多少天
    let weekStart = new Date(year, month - 1, 1).getDay(); // 本月第一天是周几

    useEffect(() => {
        fillDate()
    }, [])

    // 把日期填充进数组
    const fillDate = () => {
        itemsArr.unshift(...["日", "一", "二", "三", "四", "五", "六"]);
        // 这个月天数遍历
        for (let i = 1; i <= monthDays; i++) {
            itemsArr[7 + weekStart + i - 1] = i
        }
        // 上个月天数遍历
        let j = 0;
        for (let i = weekStart - 1; i >= 0; i--) {
            itemsArr[7 + i] = lastMonthDays - j;
            j++;
        }
        setItemsArr(JSON.parse(JSON.stringify(itemsArr)));
    }

    return (
        <div className="calender">
            <header className="calender_header">
                {year}年{month}月
                <span className="week">{weeks[week]}</span>
            </header>
            <main className="clender_main">
                {
                    itemsArr.map((item, index) => (
                        <div className={index > 6 ? "item" : "grid_header"} key={index}>{item}
                        </div>))
                }
            </main>
        </div>
    )
}
export default Calender;