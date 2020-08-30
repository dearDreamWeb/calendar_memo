import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './index.scss';
import { DatePicker, Button } from 'antd-mobile';
import GetLunarDay from "../../utils/lunarCalendar";
import "animate.css";
import PropTypes from 'prop-types';
import Weather from "../weather";

const Calender = props => {

    Calender.propTypes = {
        selectDate: PropTypes.func.isRequired
    }

    const [itemsArr, setItemsArr] = useState(new Array(35));
    const [year, setYear] = useState(new Date().getFullYear());           // 年
    const [month, setMonth] = useState(new Date().getMonth() + 1);        // 月
    const [day, setDay] = useState(new Date().getDate());                 // 日
    const [week, setWeek] = useState(new Date().getDay());                // 周几
    const [monthStartIndex, setMonthStartIndex] = useState(0);           // 本月第一天是在itemsArr的下标值
    const [selectDay, setSelectDay] = useState(day);                         // 当前选中的日
    const [isShow, setIsShow] = useState(true);                           // 日历表格是否显示
    const [animateState, setAnimateState] = useState(0);                   // 日历动画的状态,0,1,2三种过渡动画
    const [resultDate, setResultDate] = useState({});                     // 最终整合版日期

    let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    let monthDays = new Date(year, month, 0).getDate();         // 本月有多少天
    let lastMonthDays = new Date(year, month - 1, 0).getDate();         // 上个月有多少天
    let weekStart = new Date(year, month - 1, 1).getDay();          // 本月第一天是周几


    useEffect(() => {
        fillDate();
        showLunarDay();
        changeItemH();
        setSelectDay(day);
    }, [year, month, day]);


    // 当每月的开始的下标值变化了说明日期变化了，农历也跟着变化
    useEffect(() => {
        showLunarDay();
    }, [monthStartIndex])


    // 当isShow改变时，把isShow变成true，实现动画效果
    useEffect(() => {
        setIsShow(true);
    }, [isShow])

    // 更新resultDate数据
    useEffect(() => {
        setResultDate(Object.assign(
            { ...itemsArr[selectDay + monthStartIndex - 1] },
            { solar: `${year}年${month}月${day}日${weeks[week]}` }
        ))
    }, [year, month, selectDay, monthStartIndex]);

    // 向父元素传递日期数据
    useEffect(() => {
        props.selectDate(resultDate)
    }, [resultDate])


    // 改变元素的高度和宽度一致
    const changeItemH = () => {
        setTimeout(() => {
            const items = Array.from(document.getElementsByClassName("item"));
            const itemW = window.getComputedStyle(items[0]).width;
            items.forEach(el => {
                el.style.height = itemW;
            })
        }, 50)
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
        for (let i = 0; i < itemsArr.length; i++) {
            if (i > 6 && itemsArr[i].solar === 1) {
                nowMonthStartIndex = i;
                break;
            }
        }

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
    const isToday = num => {
        let isNowYear = new Date().getFullYear() === year ? true : false;
        let isNowMonth = new Date().getMonth() + 1 === month ? true : false;
        let isNowDay = new Date().getDate() === num ? true : false;
        return isNowYear && isNowMonth && isNowDay;
    }

    // 选择多少号
    const selectMonthDay = index => {
        if (index >= monthStartIndex && index < monthStartIndex + monthDays) {
            setSelectDay(index - monthStartIndex + 1);
            setWeek(new Date(year, month - 1, index - monthStartIndex + 1).getDay());
        }
    }

    // 选择日期
    const changeDate = date => {
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
        setWeek(date.getDay());
        setItemsArr(new Array(35));
        setAnimateState(0)
    }

    // 判断是几月份
    const diffMonth = index => {
        if (index >= monthStartIndex && index < monthStartIndex + monthDays) {
            return month;
        } else if (index > 6 && monthStartIndex > index) {
            return month - 1;
        } else if (index >= monthStartIndex + monthDays) {
            return month + 1;
        }
    }

    // 把农历传入到itemsArr数组中
    const showLunarDay = () => {
        itemsArr.forEach((item, index) => {
            if (index > 6) {
                let readyMonth = diffMonth(index);
                let resultObj = GetLunarDay(year, readyMonth, item.solar);
                item.lunar = `${resultObj.gzYear}${resultObj.Animal}年 ${resultObj.gzMonth}月 ${resultObj.gzDay}日 农历${resultObj.IMonthCn}${resultObj.IDayCn}`
            }
        })
        setItemsArr([...itemsArr]);
    }

    // 只要最后两个农历初几
    const sliceLunar = item => {
        if (!item) return "";
        let i = item.lastIndexOf("月");
        item = item.slice(i + 1);
        return item;
    }

    // 切换到上个月或下个月
    const changeMonth = type => {
        let newMonth = type === "left" ? month - 1 : month + 1;
        let newYear = year;
        /**
         * 如果月份大于12，年份加一年，月份改为1
         * 如果月份小于1，年份减一年，月份改为12
         */
        if (newMonth > 12) {
            newYear++;
            newMonth = 1;
        } else if (newMonth < 1) {
            newYear--;
            newMonth = 12;
        }
        type === "left" ? setAnimateState(1) : setAnimateState(2);
        setIsShow(!isShow);
        setYear(newYear);
        setMonth(newMonth);
        setDay(1);
        setWeek(new Date(newYear, newMonth - 1, 1).getDay());
        setItemsArr(new Array(35));
    }

    return (
        <div className="calender">
            {/* 头部 */}
            <header className="calender_header">
                {/* 上个月按钮 */}
                <Button
                    icon="left"
                    size="small"
                    inline={true}
                    style={{ backgroundColor: "#ffc55a", color: "#fff" }}
                    onClick={() => changeMonth("left")}
                />

                {/* 日期 */}
                <div className="date">
                    <DatePicker
                        mode="date"
                        value={new Date(year, month - 1, day)}
                        onChange={date => changeDate(date)}
                    >
                        <div>
                            <span>{year}年{month}月</span>
                            <span className="week">{weeks[week]}</span>
                        </div>
                    </DatePicker>
                </div>
                {/* 下个月按钮 */}
                <Button
                    icon="right"
                    size="small"
                    inline={true}
                    style={{ backgroundColor: "#ffc55a", color: "#fff" }}
                    onClick={() => changeMonth("right")}
                />
            </header>

            {/* 主要部分 */}
            <main
                className={`clender_main animate__animated ${
                    animateState === 0
                        ? "animate__flipInX"
                        : animateState === 1
                            ? "animate__lightSpeedInLeft"
                            : "animate__lightSpeedInRight"
                    }`
                }
                style={{ display: isShow ? "grid" : "none" }}
            >
                {
                    itemsArr.map((item, index) => (
                        <div
                            onClick={() => selectMonthDay(index)}
                            className={
                                // 区分 表头和表格
                                `animate__animated ${
                                index > 6
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
                                        ? "today animate__rubberBand"
                                        : "selectDay animate__rubberBand"
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

            {/* 天气和农历 */}
            <Weather date={resultDate} isToday={isToday(selectDay)} />
        </div>
    )
}
export default withRouter(Calender);