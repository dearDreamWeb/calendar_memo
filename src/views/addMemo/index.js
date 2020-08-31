import React, { useState, useEffect } from "react";
import { WingBlank, InputItem, DatePicker, List, Toast } from 'antd-mobile';
import "animate.css";
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faStar, faCertificate, faBell } from '@fortawesome/fontawesome-free-solid';

const AddMemo = props => {

    const [dateStart, setDateStart] = useState(new Date());  // 开始时间
    const [dateEnd, setDateEnd] = useState(new Date());     // 结束时间
    const [selectedIndex, setSelectedIndex] = useState(0);  // 日期
    const [inputVal, setInputVal] = useState("");  // 日期

    //icon图标
    const icons = [
        {
            icon: faStar,
            text: "日程"
        },
        {
            icon: faBirthdayCake,
            text: "生日"
        },
        {
            icon: faBell,
            text: "纪念日"
        },
        {
            icon: faCertificate,
            text: "其他"
        }];

    useEffect(() => {
        initDateEnd()
    }, [])

    // 初始化结束时间
    const initDateEnd = () => {
        let hour_millisecond = 1000 * 60 * 60; // 一个小时的毫秒数
        let times = new Date().getTime();
        let result = times + hour_millisecond;
        setDateEnd(new Date(result))
    }

    /**
     * 改变时间 
     * @param {*} date  开始或结束时间
     * @param {*} flag  为true改变开始时间；false改变结束时间
     * 当flag为true时，如果开始时间大于结束时间，开始时间变成比结束时间少一小时
     * 当flag为false时，如果结束时间小于于开始时间，结束时间变成比开始时间多一小时
     */
    const changeDate = (date, flag) => {
        let dateStartTimes = new Date(dateStart).getTime(); // 开始时间的毫秒数
        let dateEndTimes = new Date(dateEnd).getTime();  // 结束时间的毫秒数
        if (flag) {
            dateStartTimes = new Date(date).getTime();
            if (dateStartTimes < dateEndTimes) {
                setDateStart(date);
            } else {
                let hour_millisecond = 1000 * 60 * 60; // 一个小时的毫秒数
                let result = dateEndTimes - hour_millisecond;
                setDateStart(new Date(result));
            }
        } else {
            dateEndTimes = new Date(date).getTime();
            if (dateStartTimes < dateEndTimes) {
                setDateEnd(date);
            } else {
                console.log(22)
                let hour_millisecond = 1000 * 60 * 60; // 一个小时的毫秒数
                let result = dateStartTimes + hour_millisecond;
                setDateEnd(new Date(result));
            }
        }
    }

    // input改变
    const changeInputVal = val => {
        if (val.length < 16) {
            setInputVal(val);
        }else{
            Toast.info("备注信息不能超过15个字数")
        }
    }

    return (
        <div className="add_memo">
            <div className="animate__animated animate__zoomInUp container">
                <WingBlank>
                    {/* 头部 */}
                    <section className="memo_header">
                        <p className="title">创建备忘录</p>
                        {/* 图标 */}
                        <div className="icons">
                            {icons.map((item, index) => (
                                <div key={index}
                                    className={selectedIndex === index
                                        ? "selected"
                                        : ""
                                    }
                                    onClick={() => setSelectedIndex(index)}
                                >
                                    <FontAwesomeIcon
                                        className="icon_item "
                                        icon={item.icon}
                                    />
                                    <p className="text">{item.text}</p>
                                </div>

                            ))}
                        </div>
                    </section>

                    {/* 主体部分 */}
                    <section className="memo_main">
                        <InputItem
                            type="text"
                            value={inputVal}
                            onChange={val => changeInputVal(val)}
                            className="mark"
                            placeholder="请输入备注"
                        />
                        {/* 开始时间和结束时间 */}
                        <List>
                            {/* 开始时间 */}
                            <DatePicker
                                value={dateStart}
                                onChange={date => changeDate(date, true)}
                            >
                                <List.Item arrow="horizontal">开始时间</List.Item>
                            </DatePicker>

                            {/* 结束时间 */}
                            <DatePicker
                                value={dateEnd}
                                onChange={date => changeDate(date, false)}
                            >
                                <List.Item arrow="horizontal">结束时间</List.Item>
                            </DatePicker>
                        </List>

                    </section>
                </WingBlank>
            </div>
        </div>
    )
}
export default AddMemo;