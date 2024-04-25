/** @format */

import React, { useCallback, useMemo } from "react";
import HOC from "../../layout/HOC";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { AppointmentCanvas } from "./CalenderHelper/AppointmentCanvas";
import { motion } from "framer-motion";
import BlockedCanvas from "./CalenderHelper/BlockedCanvas";
import AppointmentDetails from "./CalenderHelper/AppointmentDetails";
import { RescheduleCanvas } from "./CalenderHelper/Modals/modal";
import { Alert } from "antd";
import { getApi, getAppointment } from "../../../Respo/Api";
import { useDispatch, useSelector } from "react-redux";
import { dates } from "../../../Store/Slices/dateSlice";
import {
  openModal,
  closeModal,
  selectModalById,
} from "../../../Store/Slices/modalSlices";
import UnBlockCanvas from "./CalenderHelper/UnBlockCanvas";
import { getCorrectTime } from "../../../Helper/Helper";
import SpinnerComp from "../Component/SpinnerComp";

const Another = () => {
  const localizer = momentLocalizer(moment);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isUnBlock, setIsUnBlock] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isReschedule, setIsReschedule] = useState(false);
  const [blockData, setBlockedData] = useState({});
  const [orderId, setOrderId] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openBlockAlert, setOpenBlockAlert] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [convertedDate, setConvertedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(["day", "week", "month", "agenda"]);

  const dispatch = useDispatch();
  const items = useSelector(dates);

  function dateConvertion() {
    const originalMonth = selectedDate?.getMonth() + 1;
    const originalYear = selectedDate?.getFullYear();
    const originalDate = selectedDate?.getDate();
    const month = originalMonth < 10 ? `0${originalMonth}` : originalMonth;
    const date = originalDate < 10 ? `0${originalDate}` : originalDate;
    const formatedDate = `${originalYear}-${month}-${date}`;
    setConvertedDate(formatedDate);
  }

  // All Appointments
  const fetchHandler = useCallback(() => {
    dispatch(getAppointment(convertedDate));
  }, [convertedDate]);

  // All Blocked Time
  const fetchBlockTime = () => {
    getApi({
      url: `api/v1/admin/Slot/getMergeSlotBlocked/${convertedDate}`,
      setResponse: setBlockedData,
    });
  };

  // ---
  const formattedBlockData =
    blockData?.data?.length > 0
      ? blockData?.data
          ?.filter((i) => i.slotBlocked === true)
          ?.map((i) => {
            return {
              id: i._id,
              title: (
                <div className="d-flex gap-2 " style={{ alignItems: "center" }}>
                  {i.title ? i.title : " Blocked Time"}
                  <i className="fa-solid fa-lock"></i>
                </div>
              ),
              start: getCorrectTime(i.from),
              end: getCorrectTime(i.to),
              isBlock: true,
            };
          })
      : [];

  const events =
    data?.length > 0
      ? data?.flatMap((order) =>
          order?.orders?.flatMap((item) => {
            const firstName = item?.user?.firstName
              ? item?.user?.firstName
              : "";
            const lastName = item?.user?.lastName ? item?.user?.lastName : "";
            const isUserPresent =
              item?.user === null || item?.user === undefined;
            const fullName = isUserPresent
              ? "User deleted"
              : firstName + " " + lastName;
            let adjustedStartTime = getCorrectTime(item?.toTime);
            adjustedStartTime.setHours(adjustedStartTime.getHours());
            const isSchedule =
              isReschedule === true && selectedEventId === item?._id;

            return {
              title: item?.noShow ? (
                <div className={`calender_slot`}>
                  <p className="title">
                    <span>{fullName}</span> <i className="fa-solid fa-ban"></i>
                  </p>
                  <span className="no-show">No-Show</span>
                </div>
              ) : (
                <div className="calender_slot">
                  <p className="title">
                    <span>{fullName}</span>
                    {item?.cardDetailSaved === true ? (
                      <span className="ml-3">
                        <i className="fa-solid fa-credit-card ml-3"></i>
                        <i className="fa-regular fa-thumbs-up ml-3"></i>
                        {item?.suggesstion?.length > 0 && (
                          <i className="fa-regular fa-comment ml-3"></i>
                        )}
                      </span>
                    ) : (
                      <>
                        <span className="ml-3">
                          {item?.suggesstion?.length > 0 && (
                            <i className="fa-regular fa-comment ml-3"></i>
                          )}
                        </span>
                      </>
                    )}
                  </p>
                  <div className="services-div">
                    <ul>
                      {item?.services?.map((names) => {
                        const formattedStartTime =
                          adjustedStartTime?.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          });
                        const adjustedEndTime = new Date(
                          adjustedStartTime.getTime() + names?.totalMin * 60000
                        );

                        const formattedEndTime =
                          adjustedEndTime.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          });

                        adjustedStartTime.setHours(adjustedEndTime.getHours());
                        adjustedStartTime.setMinutes(
                          adjustedEndTime.getMinutes()
                        );

                        return (
                          <li>
                            <span className="service-time">
                              {" "}
                              ({`${formattedStartTime} - ${formattedEndTime}`})
                            </span>
                            <span className="service-name">
                              {" "}
                              {names?.serviceId?.name}
                            </span>
                          </li>
                        );
                      })}

                      {item?.AddOnservicesSchema?.map((names) => {
                        const formattedStartTime =
                          adjustedStartTime.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          });

                        const adjustedEndTimeAddon = new Date(
                          adjustedStartTime.getTime() + names?.totalMin * 60000
                        );

                        const formattedEndTimeAddon =
                          adjustedEndTimeAddon?.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          });

                        adjustedStartTime.setHours(
                          adjustedEndTimeAddon.getHours()
                        );
                        adjustedStartTime.setMinutes(
                          adjustedEndTimeAddon.getMinutes()
                        );
                        return (
                          <li>
                            <span className="service-time">
                              {" "}
                              (
                              {`${formattedStartTime} - ${formattedEndTimeAddon}`}
                              )
                            </span>
                            <span className="service-name">
                              {" "}
                              {names?.addOnservicesId?.name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ),
              start: getCorrectTime(item?.toTime),
              end: getCorrectTime(item?.fromTime),
              id: item?._id,
              isBlock: false,
              isShow: item?.noShow,
              fullName: fullName,
              isReschedule: isSchedule,
            };
          })
        )
      : [];

  const handleSelectSlot = (e) => {
    if (isReschedule) {
      handleShow("rescheduleCanvas", e);
    } else if (isBlocked) {
      handleShow("blockedCanvas", e);
    } else if (isBooked) {
      handleShow("appointmentCanvas", e);
    } else if (isUnBlock) {
      handleShow("unblockedCanvas", e);
    } else {
      handleShow("appointmentCanvas", e);
    }
  };

  const handleSelectEvent = (e) => {
    setSelectedEventId(e.id);
    if (e.isBlock === false) {
      handleShow("appointmentDetails", e);
    } else {
      handleShow("unblockedCanvas", e);
    }
  };

  const { scrollToTime } = useMemo(
    () => ({
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const combinedDataSource = [...events, ...formattedBlockData];

  const eventStyleGetter = (event) => {
    if (event?.isBlock) {
      return {
        style: {
          backgroundColor: "#514950",
          cursor: "pointer",
        },
      };
    } else if (event?.isShow) {
      return {
        style: {
          backgroundColor: "#b0220c",
          border: "1px solid #b0220c",
          cursor: "pointer",
        },
      };
    } else if (event?.isReschedule) {
      return {
        style: {
          backgroundColor: "#A4DFF7",
          border: "3px solid #5943cc",
          cursor: "pointer",
          color: "#000",
        },
      };
    } else {
      return {
        style: {
          backgroundColor: "#A4DFF7",
          border: "1px solid #A4DFF7",
          color: "#000",
          cursor: "pointer",
          borderBottom: "2px solid #fff",
        },
      };
    }

    return {};
  };

  const handleToggleOpen = () => {
    setIsOpen(true);
  };

  const handleToggleClose = () => {
    setIsOpen(false);
  };

  const handleDateChange = (event) => {
    const selectedDate = getCorrectTime(event.target.value);
    setSelectedDate(selectedDate);
  };

  // Custom Calender Header
  const CustomCalendarHeader = ({ date }) => {
    const Day = date?.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const month = date?.toLocaleDateString("en-US", {
      month: "long",
    });
    const year = date?.toLocaleDateString("en-US", {
      year: "numeric",
    });
    const d = date?.toLocaleDateString("en-US", {
      day: "numeric",
    });

    const value =
      Day?.slice(0, 3) + " " + d + " " + month?.slice(0, 3) + " , " + year;

    const handlePrevClick = () => {
      const newSelectedDate = new Date(selectedDate);
      newSelectedDate.setDate(selectedDate.getDate() - 1);
      setSelectedDate(newSelectedDate);
    };
    const handleNextClick = () => {
      const newSelectedDate = new Date(selectedDate);
      newSelectedDate.setDate(selectedDate.getDate() + 1);
      setSelectedDate(newSelectedDate);
    };
    const handleTodayClick = () => {
      setSelectedDate(new Date());
      fetchHandler();
    };
    return (
      <div className="date_selector">
        <div className="btn_cont">
          <button className="next" onClick={handleTodayClick}>
            Today
          </button>{" "}
          <button className="next" onClick={handlePrevClick}>
            Back
          </button>
          <button className="next" onClick={handleNextClick}>
            Next
          </button>
        </div>
        <div className="inputs">
          <input
            type="date"
            id="datePicker"
            value={moment(selectedDate).format("YYYY-MM-DD")}
            onChange={handleDateChange}
          />
          <span> {value} </span>
        </div>
      </div>
    );
  };

  const onClose = () => {
    setIsBooked(false);
  };

  const onClose2 = () => {
    setOpenBlockAlert(false);
  };

  const getSlotStyle = (date) => {
    const slotTime = date.getHours() * 60 + date.getMinutes();
    if (slotTime < 600 || slotTime > 1010) {
      return {
        style: {
          backgroundColor: "#e3e3e6",
          color: "#000",
          cursor: "not-allowed",
        },
      };
    }
    return {};
  };

  const LibraryButtons = () => {
    const target = document.querySelector(
      ".rbc-calendar .rbc-toolbar .rbc-btn-group"
    );
    if (target) {
      target.style.display = "none";
    }
  };

  // ---- Modal Slices
  function useShow(id) {
    const { showModal } = useSelector(selectModalById(id));
    return showModal;
  }

  const openModalById = (modalId, data) => {
    dispatch(openModal({ modalId, showModal: true, modalData: data }));
  };

  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };

  const handleShow = (modalId, data) => {
    const start = data?.start?.toString();
    const end = data?.end?.toString();
    const realData = {
      start,
      end,
      id: data?.id,
      isShow: data?.isShow,
      fullName: data?.fullName,
    };
    openModalById(modalId, realData);
  };

  const handleClose = (modalId) => {
    closeModalById(modalId);
  };

  const getAlert = ({ message, func, present }) => {
    if (present) {
      return (
        <div className="Alert_container">
          <Alert message={message} type="info" closable onClose={func} />;
        </div>
      );
    }
  };

  useEffect(() => {
    if (selectedDate) {
      dateConvertion();
    }
  }, [selectedDate]);

  function settingData(item) {
    try {
      setLoading(true);
      setData(item);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    settingData(items);
  }, [items]);

  useEffect(() => {
    if (convertedDate) {
      fetchBlockTime();
    }
  }, [convertedDate]);

  useEffect(() => {
    if (convertedDate) {
      fetchHandler();
    }
  }, [fetchHandler]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (events) {
      LibraryButtons();
    }
  }, [events]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setView(["day", "week", "agenda"]);
    } else {
      setView(["day", "week", "month", "agenda"]);
    }
  }, [isMobile]);

  return (
    <>
      <AppointmentCanvas
        show={useShow("appointmentCanvas")}
        handleClose={() => handleClose("appointmentCanvas")}
      />
      <BlockedCanvas
        show={useShow("blockedCanvas")}
        handleClose={() => handleClose("blockedCanvas")}
        fetchHandler={fetchBlockTime}
        closeAlert={onClose2}
      />
      <UnBlockCanvas
        show={useShow("unblockedCanvas")}
        handleClose={() => handleClose("unblockedCanvas")}
        fetchHandler={fetchBlockTime}
        closeAlert={onClose2}
      />
      <AppointmentDetails
        isReschedule={isReschedule}
        setIsReschedule={setIsReschedule}
        setIsBooked={setIsBooked}
        orderId={setOrderId}
        show={useShow("appointmentDetails")}
        handleClose={() => handleClose("appointmentDetails")}
      />
      <RescheduleCanvas
        show={useShow("rescheduleCanvas")}
        handleClose={() => handleClose("rescheduleCanvas")}
        orderId={orderId}
        setIsReschedule={setIsReschedule}
      />

      {loading ? (
        <SpinnerComp />
      ) : (
        <section className="sectionCont" style={{ padding: 0 }}>
          {getAlert({
            message: "Select a time to book",
            func: onClose,
            present: isBooked,
          })}

          {getAlert({
            message: "Please select time to block",
            func: onClose2,
            present: openBlockAlert,
          })}

          <div className="react_calender_base" style={{ padding: "20px" }}>
            {CustomCalendarHeader({ date: selectedDate })}
            <Calendar
              dayLayoutAlgorithm={"no-overlap"}
              localizer={localizer}
              events={combinedDataSource}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              scrollToTime={scrollToTime}
              style={{ height: 800 }}
              eventPropGetter={eventStyleGetter}
              defaultView="day"
              date={selectedDate}
              views={view}
              slotPropGetter={getSlotStyle}
              step={15}
            />

            <div className="motion_Handler">
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
              >
                <div className={isOpen ? "open_handler" : "d-none"}>
                  <div
                    onClick={() => {
                      setIsBlocked(true);
                      setIsUnBlock(false);
                      setIsOpen(false);
                      setIsBooked(false);
                      setOpenBlockAlert(true);
                    }}
                  >
                    <p>New blocked time </p>
                    <i className="fa-regular fa-clock"></i>
                  </div>

                  <div
                    onClick={() => {
                      setIsBlocked(false);
                      setIsBooked(true);
                      setIsOpen(false);
                      setIsUnBlock(false);
                      setOpenBlockAlert(false);
                    }}
                  >
                    <p>New appointment </p>
                    <i className="fa-regular fa-calendar"></i>
                  </div>
                </div>
              </motion.div>

              <div className="plus_container">
                <motion.div transition={{ duration: 0.3 }}>
                  {isOpen === true ? (
                    <div
                      className="plus_icon close"
                      onClick={handleToggleClose}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                  ) : (
                    <div className="plus_icon" onClick={handleToggleOpen}>
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HOC(Another);
