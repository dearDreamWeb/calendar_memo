import React, { useContext, useState, useEffect } from "react";
import { Tabs, NavBar, Icon } from "antd-mobile";
import "./index.scss";
import { ContextData } from "../../useReducer";
import MemoItem from "../../components/memoItem";

const Memo = props => {

    // 获取到useContext中存的值
    const { state, dispatch } = useContext(ContextData);

    // const [undoneMemos, setUndoneMemos] = useState(state.memoData);
    // const [doneMemos, setDoneMemos] = useState(state.memoData);


    const tabs = [
        { title: '全部', sub: '1' },
        { title: '未完成', sub: '2' },
        { title: '已完成', sub: '3' },
    ];

    // useEffect(() => {
    //     getUndoneMemos();
    // }, [state])


    // 未完成的备忘录
    const getUndoneMemos = () => {
        // let dataArr = undoneMemos;
        let arr = state.memoData.filter(item => item.isFinished === false);
        // setUndoneMemos(arr);
        return arr;
    }

    // 已完成的备忘录
    const getDoneMemos = () => {
        let arr = state.memoData.filter(item => item.isFinished === true);
        return arr;
    }

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
                </div>
                <div className="tab_content">
                    <MemoItem memoData={getUndoneMemos()} />
                </div>
                <div className="tab_content">
                    <MemoItem memoData={getDoneMemos()} />
                </div>
            </Tabs>
        </div>
    )
}
export default Memo;