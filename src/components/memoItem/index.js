import React, { useContext, useEffect, useState, memo } from "react";
import PropTypes from 'prop-types';
import { Toast, Modal } from "antd-mobile";
import "./index.scss";
import { ContextData } from "../../useReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';

const alert = Modal.alert;

const MemoItem = props => {

    MemoItem.propTypes = {
        memoData: PropTypes.array.isRequired,   // 备忘录数据
    }

    // 获取到useContext中存的值
    const { state, dispatch } = useContext(ContextData);

    const [isShow, setIsShow] = useState(false);       // 是否加载
    const [memoData, setMemoData] = useState(props.memoData);

    useEffect(() => {
        sortMemoData();
        // console.log(state.icons[0])
    }, []);

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
            i++;
            // 当传进来的是数组中最后一个元素的话，直接返回
            if (index > memoData.length - 2) {
                return [item];
            }
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

    // 派发useReducer事件，改变state.memoData中的isFinished
    const changeMemo = data => {
        dispatch({ type: "changeIsFinish", data: { item: data } });
    }

    // 派发useReducer事件，删除该元素  data:该元素  index该元素在父数组中的位置，_index该元素在该数组中的位置
    const deleteMemo = (data, index, _index) => {
        dispatch({ type: "deleteMemoItem", data: { item: data } });
        memoData[index].splice(_index, 1);
        setIsShow(false);
        setMemoData(memoData);
        setTimeout(()=>setIsShow(true),0)
        Toast.success("删除成功", 1);
    }

    // 派发useReducer事件，删除所有已完成的备忘录
    const clearAllDone = () => {
        dispatch({ type: "deleteAllDone" });
        let arr = state.memoData.filter(item => {
            return item.isFinished === true;
        })
        arr.forEach(arrItem => {
            memoData.forEach((memoDataItem, index) => {
                if (arrItem.id === memoDataItem.id) {
                    memoData.splice(index, 1);
                    return;
                }
                if (memoDataItem.length > 0) {
                    memoDataItem.forEach((_memoDataItem, _index) => {
                        if (arrItem.id === _memoDataItem.id) {
                            memoData[index].splice(_index, 1);
                            return;
                        }
                    })
                }
            })
        })
        setIsShow(false);
        setMemoData(memoData);
        setTimeout(()=>setIsShow(true),0)
        Toast.success("删除成功", 1);
    }

    // 格式化开始时间和结束时间
    const formatDate = data => {
        let dateStart = new Date(data.dateStart);
        let dateEnd = new Date(data.dateEnd);
        // 开始时间的小时和分钟
        let dateStartHours = dateStart.getHours();
        let dateStartMinutes = dateStart.getMinutes().toString().padStart(2, "0");
        // 结束时间的小时和分钟
        let dateEndtHours = dateEnd.getHours();
        let dateEndtMinutes = dateEnd.getMinutes().toString().padStart(2, "0");
        return `${dateStartHours}:${dateStartMinutes}-${dateEndtHours}:${dateEndtMinutes}`;
    }

    return (
        <ul className="memoItem_wrap">
            {/* 清除已完成的备忘录 */}
            <p
                className="clear_done"
                onClick={() =>
                    alert('删除', '你确定删除所有已完成的备忘录？', [
                        {
                            text: '确定',
                            onPress: () => clearAllDone()
                        },
                        { text: '取消', onPress: () => Toast.info('已取消', 1) },

                    ])
                }
            >清除已完成</p>

            {/* 第一次遍历各个日期的备忘录 */}
            {isShow && memoData.map((item, index) => (
                item.length > 0
                    ? (<li key={index}>
                        {/* 日期 */}
                        <h2 className="title">{`${item[0].year}-${item[0].month}-${item[0].day}`}</h2>
                        {/* 第二次遍历该日期下的备忘录 */}
                        {item.map((_item, _index) => (
                            <div key={_index}
                                className={`memo_item ${
                                    _item.isFinished
                                        ? "finished"
                                        : ""}`}
                            >
                                {/* 复选框 */}
                                <div className="input_wrap">
                                    <input
                                        type="checkbox"
                                        id={`checkbox${_item.id}`}
                                        className="checkbox"
                                        defaultChecked={_item.isFinished}
                                        onChange={() => changeMemo(_item)}
                                    />
                                    {/* 图标 */}
                                    <FontAwesomeIcon
                                        icon={state.icons[_item.tagIndex].icon}
                                        className="icon"
                                    />
                                    <label className="text" htmlFor={`checkbox${_item.id}`}>{_item.text}</label>
                                </div>
                                {/* 时间 */}
                                <p className="date">
                                    {formatDate(_item)}
                                </p>
                                {/* 删除 */}
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="delete_btn"
                                    onClick={() =>
                                        alert('删除', '你确定删除该备忘录？', [
                                            {
                                                text: '确定',
                                                onPress: () => deleteMemo(_item, index, _index)
                                            },
                                            { text: '取消', onPress: () => Toast.info('已取消', 1) },

                                        ])
                                    }
                                />
                            </div>
                        ))}
                    </li>)
                    : ""
            ))}

        </ul>
    )
}
export default MemoItem;