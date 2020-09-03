import React, { useContext, useEffect } from "react";
import { Tabs, WingBlank, NavBar, Icon } from "antd-mobile";
import "./index.scss";
import { ContextData } from "../../useReducer";
import MemoItem from "../../components/memoItem";

const Memo = props => {

    // 获取到useContext中存的值
    const { state, dispatch } = useContext(ContextData);

    const tabs = [
        { title: '全部', sub: '1' },
        { title: '未完成', sub: '2' },
        { title: '已完成', sub: '3' },
    ];

    useEffect(() => {
        console.log(props)
    }, [state.memoData])



    return (
        <div className="memo">
            {/* 头部 */}
            <NavBar
                mode="light"
                className="nav_bar"
                icon={<Icon type="left" />}
                onLeftClick={() => props.history.push("/")}
            >备忘录</NavBar>

            {/* 标签栏 */}
            <Tabs tabs={tabs}
                initialPage={0}
                tabBarPosition="top"
                renderTab={tab => <span>{tab.title}</span>}
            >
                <div className="tab_content">
                    <MemoItem memoData={state.memoData} />
                    {/* <ul>
                        {state.memoData.map((item, index) => (
                            <li key={index}
                                className={`memo_item ${
                                    item.isFinished
                                        ? "finished"
                                        : ""}`}
                            >
                                <input
                                    type="checkbox"
                                    id={`checkbox${index}`}
                                    className="checkbox"
                                    defaultChecked={item.isFinished}
                                    onChange={() => dispatch({ type: "changeIsFinish", data: { item } })}
                                />
                                <label className="text" htmlFor={`checkbox${index}`}>{item.text}</label>
                            </li>
                        ))}
                    </ul> */}
                </div>
                <div className="tab_content">
                    Content of second tab
                </div>
                <div className="tab_content">
                    Content of third tab
                </div>
            </Tabs>
        </div>
    )
}
export default Memo;