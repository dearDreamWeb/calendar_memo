import React, { useState, useEffect } from 'react';
import './index.scss';
import { DatePicker } from 'antd-mobile';
import GetLunarDay from "../../utils/lunarCalendar";

const Calender = () => {
    const [itemsArr, setItemsArr] = useState(new Array(35));
    const [year, setYear] = useState(new Date().getFullYear());           // 年
    const [month, setMonth] = useState(new Date().getMonth() + 1);        // 月
    const [day, setDay] = useState(new Date().getDate());                 // 日
    const [week, setWeek] = useState(new Date().getDay());                // 周几
    const [monthStartIndex, setMonthStartIndex] = useState(0);                // 本月第一天是在itemsArr的下标值
    const [selectDay, setSelectDay] = useState(day);                         // 当前选中的日
    let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

    let monthDays = new Date(year, month, 0).getDate();         // 本月有多少天
    let lastMonthDays = new Date(year, month - 1, 0).getDate();         // 上个月有多少天
    let weekStart = new Date(year, month - 1, 1).getDay();          // 本月第一天是周几

    useEffect(() => {
        changeItemH();
    }, []);

    useEffect(() => {
        fillDate();
    }, [year, month, day]);

    useEffect(() => {
        setSelectDay(day);
    }, [day])

    useEffect(() => {
        showLunarDay();
    }, [monthStartIndex])

    // 改变元素的高度和宽度一致
    const changeItemH = () => {
        setTimeout(() => {
            const items = Array.from(document.getElementsByClassName("item"));
            const itemW = window.getComputedStyle(items[0]).width;
            items.forEach(el => {
                el.style.height = itemW;
            })
        }, 500)
    }

    // 把日期填充进数组
    const fillDate = () => {
        // 将"日", "一", "二", "三", "四", "五", "六"填充到数组的头部
        itemsArr.unshift(...["日", "一", "二", "三", "四", "五", "六"]);
        // 这个月天数遍历
        for (let i = 1; i <= monthDays; i++) {
            itemsArr[7 + weekStart + i - 1] = { solar: i }
        }
        // 上个月天数遍历
        let j = 0;
        for (let i = weekStart - 1; i >= 0; i--) {
            itemsArr[7 + i] = { solar: lastMonthDays - j };
            j++;
        }
        // 计算出本月第一天是在itemsArr的下标值
        let nowMonthStartIndex = 0;
        itemsArr.forEach((item, i) => {
            if (i > 6 && item.solar === 1) {
                nowMonthStartIndex = i;
            }
        })

        // 填充下个月
        if (itemsArr.length % 7 !== 0 || itemsArr.includes(undefined)) {
            let k = 1;
            // 下个月开始的位置

            let nextMonthStartIndex = nowMonthStartIndex + monthDays;
            // 下个月的出现的天数
            let nextMonthLength = itemsArr.length % 7 !== 0
                ? 7 - itemsArr.length % 7
                : itemsArr.length - nextMonthStartIndex;
            for (let i = 0; i < nextMonthLength; i++) {
                itemsArr[i + nextMonthStartIndex] = { solar: k };
                k++;
            }
        }

        setItemsArr([...itemsArr]);
        setMonthStartIndex(nowMonthStartIndex);
    }

    // 判断是否是今天
    const isToday = (num) => {
        let isNowYear = new Date().getFullYear() === year ? true : false;
        let isNowMonth = new Date().getMonth() + 1 === month ? true : false;
        let isNowDay = new Date().getDate() === num ? true : false;
        return isNowYear && isNowMonth && isNowDay;
    }

    // 选择多少号
    const selectMonthDay = (index) => {
        if (index >= monthStartIndex && index < monthStartIndex + monthDays) {
            setSelectDay(index - monthStartIndex + 1);
            setWeek(new Date(year, month - 1, index - monthStartIndex + 1).getDay());
        }
    }

    // 选择日期
    const changeDate = (date) => {
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
        setWeek(date.getDay());
        setItemsArr(new Array(35));
    }

    // 判断是几月份
    const diffMonth = (index) => {
        console.log(monthStartIndex)
        if (index >= monthStartIndex && index < monthStartIndex + monthDays) {
            return month;
        } else if (index > 6 && monthStartIndex > index) {
            return month - 1;
        } else if (index > monthStartIndex + monthDays) {
            return month + 1;
        }
    }

    // 把农历传入到itemsArr数组中
    const showLunarDay = () => {
        itemsArr.forEach((item, index) => {
            if (index > 6) {
                let readyMonth = diffMonth(index);
                // console.log(readyMonth)
                item.lunar = GetLunarDay(year, readyMonth, item.solar)
            }
        })
        setItemsArr([...itemsArr]);
    }

    // 只要最后两个农历初几
    const sliceLunar = (item) => {
        let i = item.indexOf("月");
        item = item.slice(i+1);
        return item;
    }

    return (
        <div className="calender">
            <DatePicker
                mode="date"
                value={new Date(year, month - 1, day)}
                onChange={date => changeDate(date)}
            >
                <header className="calender_header">
                    {year}年{month}月
                <span className="week">{weeks[week]}</span>
                </header>
                {/* <List.Item arrow="horizontal">Date</List.Item> */}
            </DatePicker>

            <main className="clender_main">
                {
                    itemsArr.map((item, index) => (
                        <div
                            onClick={() => selectMonthDay(index)}
                            className={
                                // 区分 表头和表格
                                `${index > 6
                                    ? "item"
                                    : "grid_header"
                                } ${
                                // 区分本月和其他月
                                index >= monthStartIndex && index < monthStartIndex + monthDays
                                    ? "currentMonth"
                                    : "othersMonth"
                                } ${
                                // 区分是不是已选中，再判断是不是今天
                                selectDay === index - monthStartIndex + 1 && index >= monthStartIndex && index < monthStartIndex + monthDays
                                    ? isToday(item.solar)
                                        ? "today"
                                        : "selectDay"
                                    : ""
                                }`
                            }
                            key={index}
                        >
                            {index > 6 ? item.solar : item}
                            <p className="lunar">{index > 6 ? sliceLunar(item.lunar) : ""}</p>

                        </div>)
                    )
                }
            </main>
        </div>
    )
}
export default Calender;