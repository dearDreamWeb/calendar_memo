import React, { useContext } from "react";
import { NavBar, Icon } from "antd-mobile";
import "./index.scss";
import { ContextData } from "../../useReducer";
import MemoItem from "../../components/memoItem";

const Memo = props => {

    // 获取到useContext中存的值
    const { state, dispatch } = useContext(ContextData);

    return (
        <div className="memo">
            {/* 头部 */}
            <NavBar
                mode="light"
                className="nav_bar"
                icon={<Icon type="left" />}
                onLeftClick={() => props.history.push("/")}
            >备忘录</NavBar>
            <div className="tab_content">
                <MemoItem memoData={state.memoData} />
            </div>
        </div>
    )
}
export default Memo;