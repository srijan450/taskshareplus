import React from "react";
import "./Calander.css";
const Calander = ({ date, text, classes }) => {
  const fulldate = new Date(date).toDateString().split(" ");
  return (
    <div className={`cal-containter mx-1 ${classes}`}>
      {/* <div className='cal-day'>{text}</div>
            <div className='cal-body'>
                <span className='cal-mon'>{fulldate[0]} </span>
                <span className='cal-date'>{fulldate[1]} </span>
                <span className='cal-day'>{fulldate[2]} </span>
                <span className='cal-year'>{fulldate[3]} </span>
            </div> */}
      <table className="element-label">
        <tr>
          <th colSpan={4}>{text}</th>
        </tr>
        <tr>
          <td className="cal-mon">{fulldate[0]} </td>
          <td className="cal-date">{fulldate[1]} </td>
          <td className="cal-day">{fulldate[2]} </td>
          <td className="cal-year">{fulldate[3]} </td>
        </tr>
      </table>
    </div>
  );
};

export default Calander;
