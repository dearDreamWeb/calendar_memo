import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./index.scss";

const Memo = props => {

    Memo.propTypes = {
        date: PropTypes.object.isRequired
    }
    const [date, setDate] = useState({});  // 日期

    useEffect(()=>{
        console.log(props)
    },[])


    return (
        <div className="undone">
            Memo
        </div>
    )
}
export default Memo;