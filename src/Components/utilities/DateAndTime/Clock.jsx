import React, { useEffect, useState } from "react";
import useApi from "../../API/api";
import "./Clock.css";
const Clock = ({ time, date, _id, createdDate, status }) => {
  const [hhmmss, sethhmmss] = useState({
    yy: "00",
    dd: "000",
    hh: "00",
    mm: "00",
    ss: "00",
  });
  const { getTaskApi } = useApi();
  const [timerSeting, settimerSeting] = useState(false);

  useEffect(() => {
    const timer = setInterval(async () => {
      settimerSeting(true);
      let remainingTime;
      if (date && time) {
        remainingTime =
          new Date(date).setHours(
            parseInt(time.split(":")[0]),
            parseInt(time.split(":")[1]),
            0
          ) - new Date();
      } else if (time)
        remainingTime =
          new Date().setHours(
            parseInt(time.split(":")[0]),
            parseInt(time.split(":")[1]),
            0
          ) - new Date();
      else if (date) remainingTime = new Date(date) - new Date();
      if (remainingTime > 0) {
        if (status === "pending")
          await getTaskApi(`task/mark-as/${_id}?pending=false`);
        sethhmmss(() => {
          let seconds = Math.floor(remainingTime / 1000);
          let minutes = Math.floor(seconds / 60);
          let hours = Math.floor(minutes / 60);
          let days = Math.floor(hours / 24);
          const year = Math.floor(days / 365);
          seconds = seconds % 60;
          minutes = minutes % 60;
          hours = hours % 24;
          days = days % 365;
          return {
            dd: days.toString().padStart(3, "0"),
            yy: year.toString().padStart(2, "0"),
            hh: hours.toString().padStart(2, "0"),
            mm: minutes.toString().padStart(2, "0"),
            ss: seconds.toString().padStart(2, "0"),
          };
        });
      } else if (status !== "pending") {
        await getTaskApi(`task/mark-as/${_id}?pending=true`);
        sethhmmss({ hh: "00", mm: "00", ss: "00", dd: "000", yy: "00" });
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="cal-containter d-flex flex-fill align-items-center">
      {/* <div className='cal-day'>End Date</div> */}
      <table className="element-label">
        <thead>
          <tr>
            {hhmmss.yy !== "00" && <th>YY</th>}
            {(hhmmss.dd !== "000" || hhmmss.yy !== "00") && <th>DD</th>}
            <th>HH</th>
            <th>MM</th>
            <th>SS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {hhmmss.yy !== "00" && <td>{hhmmss.yy}</td>}
            {(hhmmss.dd !== "000" || hhmmss.yy !== "00") && (
              <td>{hhmmss.dd}</td>
            )}
            <td>{hhmmss.hh}</td>
            <td>{hhmmss.mm}</td>
            <td>{hhmmss.ss}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Clock;
