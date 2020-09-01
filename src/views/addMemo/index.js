import React, { useState, useEffect, useContext } from "react";
import { WingBlank, InputItem, DatePicker, List, Toast, Button } from 'antd-mobile';
import "animate.css";
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContextData } from "../../useReducer";

const AddMemo = props => {
    // 获取到useContext中存的值
    const { state, dispatch } = useContext(ContextData);

    // const [date, setDate] = useState({});
    const [dateStart, setDateStart] = useState(new Date());  // 开始时间
    const [dateEnd, setDateEnd] = useState(dateStart);     // 结束时间
    const [selectedIndex, setSelectedIndex] = useState(0);  // 日期
    const [inputVal, setInputVal] = useState("");           // 备注信息


    useEffect(() => {
        initDateEnd();
    }, [])


    // 初始化结束时间
    const initDateEnd = () => {
        if (dateStart.getHours() >= 23) return;
        let hour_millisecond = 1000 * 60 * 60; // 一个小时的毫秒数
        let times = new Date().getTime();
        let result = times + hour_millisecond;
        setDateEnd(new Date(result))
    }

    /**
     * 改变时间 
     * @param {*} date  开始或结束时间
     * @param {*} flag  为true改变开始时间；false改变结束时间
     * 当flag为true时，如果开始时间大于结束时间，开始时间等于结束时间
     * 当flag为false时，如果结束时间小于于开始时间，结束时间等于开始时间
     */
    const changeDate = (date, flag) => {
        let dateStartTimes = new Date(dateStart).getTime(); // 开始时间的毫秒数
        let dateEndTimes = new Date(dateEnd).getTime();  // 结束时间的毫秒数
        if (flag) {
            dateStartTimes = new Date(date).getTime();
            dateStartTimes < dateEndTimes
                ? setDateStart(date)
                : setDateStart(dateEnd)
        } else {
            dateEndTimes = new Date(date).getTime();
            dateStartTimes < dateEndTimes
                ? setDateEnd(date)
                : setDateEnd(dateStart)
        }
    }

    // input改变
    const changeInputVal = val => {
        if (val.length < 16) {
            setInputVal(val);
        } else {
            Toast.info("备注信息不能超过15个字数")
        }
    }

    // 提交数据
    const addData = () => {
        // 将 localStorage中的selectedDate的选中日期的毫秒数times转换成正常日期
        let _date = new Date(state.selectedDate.times);
        let year = _date.getFullYear();
        let month = _date.getMonth();
        let day = _date.getDate();
        let reg = /^\s+$/;
        if (inputVal === "" || reg.test(inputVal)) {
            Toast.info("请填写备注")
            return;
        }
        let newItem = {
            id: new Date().getTime(),    // id值
            isFinished: false,           // 是否完成 
            tagIndex: selectedIndex,
            dateStart: new Date(year, month, day, dateStart.getHours(), dateStart.getMinutes()),
            dateEnd: new Date(year, month, day, dateEnd.getHours(), dateEnd.getMinutes()),
            text: inputVal
        };
        dispatch({
            type: "add",
            data: newItem
        });
        props.history.push("/");
        Toast.success("新建备忘录成功", 1);
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
                            {state.icons.map((item, index) => (
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
                        {/* 列表 */}
                        <List>
                            {/* 开始时间 */}
                            <DatePicker
                                mode="time"
                                value={dateStart}
                                onChange={date => changeDate(date, true)}
                            >
                                <List.Item arrow="horizontal">开始时间</List.Item>
                            </DatePicker>

                            {/* 结束时间 */}
                            <DatePicker
                                mode="time"
                                value={dateEnd}
                                onChange={date => changeDate(date, false)}
                            >
                                <List.Item arrow="horizontal">结束时间</List.Item>
                            </DatePicker>

                            {/* 确认按钮 */}
                            <List.Item>
                                <Button
                                    type="primary"
                                    onClick={() => addData()}
                                >确认</Button>
                            </List.Item>

                            {/* 返回首页按钮 */}
                            <List.Item>
                                <Button
                                    type="warning"
                                    onClick={() => {
                                        props.history.push("/");
                                        Toast.success("返回首页成功", 1)
                                    }}
                                >返回首页</Button>
                            </List.Item>

                        </List>

                    </section>
                </WingBlank>
            </div>
        </div>
    )
}
export default AddMemo;