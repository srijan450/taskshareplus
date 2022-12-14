import React from "react";
import Calander from "./Calander";
import Clock from "./Clock";

const DateAndTime = ({
  durationTime,
  durationDate,
  createdDate,
  showDate = true,
  showTime = true,
  alignLeft = false,
  _id,
  status,
}) => {
  return (
    <div
      className={`d-flex ${
        alignLeft ? "justify-content-start" : "justify-content-end"
      }`}
    >
      {showDate && (
        <>
          {createdDate ? (
            <>
              <span>
                <Calander date={createdDate} text="Start Date" />
              </span>
            </>
          ) : (
            ""
          )}

          {durationDate ? (
            <>
              <span>
                <Calander date={durationDate} text="End Date" />
              </span>
            </>
          ) : (
            ""
          )}
        </>
      )}
      {showTime && (
        <>
          {durationDate || durationTime ? (
            <>
              <span className="">
                <Clock
                  date={durationDate}
                  time={durationTime}
                  _id={_id}
                  createdDate={createdDate}
                  status={status}
                />
              </span>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default DateAndTime;
