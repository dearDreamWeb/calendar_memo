import { createContext } from "react";
import { faBirthdayCake, faStar, faCertificate, faBell } from '@fortawesome/fontawesome-free-solid';
const initData = {};//初始数据
//icon图标数据
initData.icons = [
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

// 备忘录数据
initData.memoData = window.localStorage.getItem("memoData")
    ? JSON.parse(window.localStorage.getItem("memoData"))
    : [];

// 派发事件
const reducer = (state, action) => {
    switch (action.type) {
        // 添加备忘录
        case "add":
            let newItem = action.data;
            state.memoData.push(newItem);
            return { ...state }
        case "sub":
            return { ...state, count: state.count - 1 };
        case "change":
            return { ...state, count: action.changeCount };
        default:
            return state
    }
}

const ContextData = createContext({});

export { initData, reducer, ContextData }