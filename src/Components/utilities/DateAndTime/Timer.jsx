import React, { useEffect, useState } from 'react'
import api from '../../API/api';
import './Clock.css';
const Timer = ({ time, date, _id, createdDate }) => {
    const [hhmmss, sethhmmss] = useState({ yy: "00", dd: "000", hh: "00", mm: "00", ss: "00" })
    const { getTaskApi } = api();

    useEffect(() => {
        const timer = setInterval(async () => {
            let remainingTime;
            if (date && time)
                remainingTime = (new Date(date).setHours(parseInt(time.split(":")[0]), parseInt(time.split(":")[1]), 0) - new Date());
            else if (time)
                remainingTime = (new Date().setHours(parseInt(time.split(":")[0]), parseInt(time.split(":")[1]), 0) - new Date());
            else if (date) { remainingTime = (new Date(date) - new Date()); console.log(remainingTime); }
            if (remainingTime > 0) {
                sethhmmss(() => {
                    let seconds = Math.floor(remainingTime / 1000);
                    let minutes = Math.floor(seconds / 60);
                    let hours = Math.floor(minutes / 60);
                    let days = Math.floor(hours / 24);
                    const year = Math.floor((days / 365));
                    seconds = seconds % 60;
                    minutes = minutes % 60;
                    hours = hours % 24;
                    days = days % 365;
                    return { dd: days.toString().padStart(3, '0'), yy: year.toString().padStart(2, '0'), hh: hours.toString().padStart(2, '0'), mm: minutes.toString().padStart(2, '0'), ss: seconds.toString().padStart(2, '0') }
                })
            }
            else {
                clearInterval(timer)
                await getTaskApi(`task/mark-as/${_id}?pending=true`);
                sethhmmss({ hh: "00", mm: "00", ss: "00", dd: "000", yy: "00" });
            }
        }, 1000);
    }, [])
    return (
        <div className='d-flex align-items-center justify-content-end'>
            <div className='cal-body'>
                {hhmmss.yy !== "00" &&
                    < div className='timer-element'>
                        <div className='element-label'>YY : </div>
                        <div className='cal-mon' style={{ marginLeft: "0px" }}>{hhmmss.yy} : </div>
                    </div>
                }

                {(hhmmss.dd !== "000" || hhmmss.yy !== "00") &&
                    < div className='timer-element'>
                        <div className='element-label'>DD :</div>
                        <div className='cal-mon' style={{ marginLeft: "0px" }}>{hhmmss.dd} : </div>
                    </div>
                }
                < div className='timer-element'>
                    <div className='element-label'>HH </div>
                    <div className='cal-mon' style={{ marginLeft: "0px" }}>{hhmmss.hh}</div>
                </div>
                < div className='timer-element'>
                    <div className='element-label'> : MM</div>
                    <div className='cal-mon' style={{ marginLeft: "0px" }}>: {hhmmss.mm}</div>
                </div>
                < div className='timer-element'>
                    <div className='element-label'>: SS</div>
                    <div className='cal-mon' style={{ marginLeft: "0px" }}>: {hhmmss.ss}</div>
                </div>

            </div>
        </div >
    )
}

export default Timer