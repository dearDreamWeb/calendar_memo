import React, { useContext, useEffect } from "react";
// import PropTypes from 'prop-types';
import "./index.scss";
import { ContextData } from "../../useReducer";

const MemoItem = props => {

    // 获取到useContext中存的值
    const { state, dispatch } = useContext(ContextData);

    // MemoItem.propTypes = {
    //     date: PropTypes.object.isRequired,
    //     isToday: PropTypes.bool.isRequired
    // }



    useEffect(() => {

    }, [])



    return (
        <ul className="memoItem_wrap">
            {props.memoData.map((item, index) => (
                <li key={index}
                    className={`memo_item ${
                        item.isFinished
                            ? "finished"
                            : ""}`}
                >
                    <div className="input_wrap">
                        <input
                            type="checkbox"
                            id={`checkbox${index}`}
                            className="checkbox"
                            defaultChecked={item.isFinished}
                            onChange={() => dispatch({ type: "changeIsFinish", data: { item } })}
                        />
                        <label className="text" htmlFor={`checkbox${index}`}>{item.text}</label>
                    </div>
                </li>
            ))}

        </ul>
    )
}
export default MemoItem;