import React, { useState, useEffect, useContext } from "react";
import { withRouter } from 'react-router-dom';
// import { List } from 'antd-mobile';
import PropTypes from 'prop-types';
import "./index.scss";
import { ContextData } from "../../useReducer";

const DayMemo = props => {

    DayMemo.propTypes = {
        memos: PropTypes.array.isRequired
    }

    // 获取到useContext中存的值
    const { state, dispatch } = useContext(ContextData);

    useEffect(() => {
        // console.log(props)
    }, [])


    return (
        <div className="day_memo">
            {props.memos.map((item, index) => (
                <div
                    key={index}
                    className={`item ${item.isFinished
                        ? "finished"
                        : ""}`}
                >
                    <div className="time">
                        <p className="start">{
                            `${new Date(item.dateStart).getHours()}:${new Date(item.dateStart).getMinutes()}`
                        }</p>
                        <p className="end">{
                            `${new Date(item.dateEnd).getHours()}:${new Date(item.dateEnd).getMinutes()}`
                        }</p>
                    </div>
                    <div className="content">
                        <input
                            type="checkbox"
                            id={`checkbox${index}`}
                            className="checkbox"
                            defaultChecked={item.isFinished}
                            onChange={() => dispatch({ type: "changeIsFinish", data: { item } })}
                        />
                        <label className="text" for={`checkbox${index}`}>{item.text}</label>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default withRouter(DayMemo);