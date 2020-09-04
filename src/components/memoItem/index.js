import React, { useContext, useEffect, useState, memo } from "react";
import PropTypes from 'prop-types';
import "./index.scss";
import { ContextData } from "../../useReducer";

const MemoItem = props => {

    MemoItem.propTypes = {
        memoData: PropTypes.array.isRequired,   // 备忘录数据
    }

    // 获取到useContext中存的值
    const { state, dispatch } = useContext(ContextData);

    const [isShow, setIsShow] = useState(false);       // 是否加载
    const [memoData, setMemoData] = useState(props.memoData);

    useEffect(() => {
        sortMemoData()
    }, [props.memoData])

    /**
     * 按日期将备忘录进行分组   
     * 1. 冒泡排序  
     * 2. 然后递归把同一年月日的备忘录给整合起来，形成二维数组，例如：[{},[{},{}],{}]
     */
    const sortMemoData = () => {
        // 冒泡排序  
        for (let i = 0; i < memoData.length - 1; i++) {
            memoData.forEach((item, index) => {
                if (index < memoData.length - 1) {
                    let itemTimes = new Date(item.year, item.month, item.day).getTime();
                    let itemAfterTimes = new Date(memoData[index + 1].year, memoData[index + 1].month, memoData[index + 1].day).getTime();
                    if (itemTimes > itemAfterTimes) {
                        let middle = memoData[index + 1];
                        memoData[index + 1] = item;
                        memoData[index] = middle;
                    }
                }
            })
        }

        // 冒泡排序是从小到大，在反转一下，成为从大到小
        memoData.reverse();
        let newMemoData = categoiresMemoData(memoData);
        setMemoData(newMemoData);
        setIsShow(true);
    }

    // 循环递归把同一年月日的备忘录给整合起来，形成二维数组，例如：[{},[{},{}],{}]
    const categoiresMemoData = (memoData) => {
        let newMemoData = [];
        let i = 0;   // 从哪一位开始循环
        for (let j = 0; j < memoData.length; j++) {
            if (j >= i) {
                let newItem = _categoiresMemoData(memoData[j], j);
                newMemoData.push(newItem);
            }
        }
        // 递归
        function _categoiresMemoData(item, index) {
            // 当传进来的是数组中最后一个元素的话，直接返回
            if (index > memoData.length - 2) {
                return [item];
            }
            i++;
            // 该元素日期的毫秒数
            let itemTimes = new Date(item.year, item.month, item.day).getTime();
            // 该元素的下一个元素日期的毫秒数
            let itemAfterTimes = new Date(memoData[index + 1].year, memoData[index + 1].month, memoData[index + 1].day).getTime();
            // 如果该元素和下一个元素的毫秒数相等，递归下个元素；不相等的话，直接返回该元素
            if (itemTimes === itemAfterTimes) {
                return [item, ..._categoiresMemoData(memoData[index + 1], index + 1)];
            } else {
                return [item];
            }
        }
        return newMemoData;
    }

    // 派发事件，改变state.memoData中的isFinished
    const changeMemo = data => {
        dispatch({ type: "changeIsFinish", data: { item: data } });
    }


    return (
        <ul className="memoItem_wrap">
            {/*  */}
            {isShow && memoData.map((item, index) => (
                <li key={index}>
                    <h1>{`${item[0].year}-${item[0].month}-${item[0].day}`}</h1>
                    {item.map((_item, _index) => (
                        <div key={_index}
                            className={`memo_item ${
                                _item.isFinished
                                    ? "finished"
                                    : ""}`}
                        >
                            <div className="input_wrap">
                                <input
                                    type="checkbox"
                                    id={`checkbox${_item.id}`}
                                    className="checkbox"
                                    defaultChecked={_item.isFinished}
                                    onChange={() => changeMemo(_item)}
                                />
                                <label className="text" htmlFor={`checkbox${_item.id}`}>{_item.text}</label>
                            </div>
                        </div>
                    ))}

                </li>
            ))}

        </ul>
    )
}
export default MemoItem;