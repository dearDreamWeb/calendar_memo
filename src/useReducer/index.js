import { createContext } from "react";
import { faBirthdayCake, faStar, faCertificate, faBell } from '@fortawesome/fontawesome-free-solid';
import Store from "../utils/webStorage.js"; //引入webStorage工具

const $store = new Store("localStorage");//实例化Store
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
initData.memoData = $store.getItem("memoData")
    ? $store.getItem("memoData")
    : [];

// 选中的时间
initData.selectedDate = $store.getItem("selectedDate")
    ? $store.getItem("selectedDate")
    : {};

// 派发事件
const reducer = (state, action) => {
    switch (action.type) {
        // 添加备忘录
        case "add":
            let newItem = action.data;
            state.memoData.push(newItem);
            $store.setItem("memoData", state.memoData);
            return { ...state }

        // 更新选中的日期
        case "updateDate":
            state.selectedDate = action.data;
            $store.setItem("selectedDate", state.selectedDate);
            return { ...state }

        // 改变备忘录完成状态
        case "changeIsFinish":
            let changeItem = action.data.item; //要修改的数据
            let itemIndex = 0;
            // 找到要修改的数据的下标值，并赋值给itemIndex
            state.memoData.forEach((item, index) => {
                if (item.id === changeItem.id) {
                    itemIndex = index;
                }
            })
            changeItem.isFinished = !changeItem.isFinished;
            state.memoData[itemIndex] = changeItem;
            $store.setItem("memoData", [...state.memoData]);
            return { ...state }
        default:
            return state
    }
}

const ContextData = createContext({});

export { initData, reducer, ContextData }