/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Modal, Offcanvas, Form, Button } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Call, Mail, SendSms } from "../../../../../Helper/Helper";
import {
  copyText,
  PhoneNumberFormatter,
  formatInHour,
  inMonthFomat,
  TimeFormatter,
} from "../../../../../utils/utils";
import Select from "react-select";
import {
  deleteApi,
  deleteService,
  edit_module_redux,
  fetchServices,
  getAdOnService,
  getApi,
  getAppointment,
  getPaginatedServices,
  getRecentService,
  postApi,
  remove_module_redux,
  uploadUser,
} from "../../../../../Respo/Api";
import {
  closeModal,
  openModal,
  selectModalById,
} from "../../../../../Store/Slices/modalSlices";
import { showMsg } from "../../../../../Respo/Api";
import SpinnerComp from "../../../Component/SpinnerComp";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { ClipLoader } from "react-spinners";
import { durationOption } from "../../../../../Helper/Constant";
import { todayDate } from "../../../../../Store/Slices/dateSlice";

export const EditNotes = ({ show, setShow, setEdit, createNote }) => {
  function selector() {
    setEdit(true);
    createNote(false);
    setShow(false);
  }

  function selector2() {
    createNote(true);
    setEdit(false);
    setShow(false);
  }
  return (
    <Modal
      title="Copy to Clipboard"
      show={show}
      onHide={() => setShow(false)}
      className="text_Modal"
      style={{ top: "70%" }}
    >
      <div className="phone_dialoag">
        <button onClick={() => selector2()}>Create New </button>
        <button onClick={() => selector()}>Edit appointment notes</button>
      </div>
      <div className="close_btn" onClick={() => setShow(false)}>
        <p>Close</p>
      </div>
    </Modal>
  );
};

export const ProfileDetail = ({ show, handleClose, data }) => {
  const [open, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { modalData } = useSelector(selectModalById("profileDetail"));
  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };
  const selectedAppointmentDate = useSelector(todayDate);

  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };

  const id = modalData?.id;

  const deleteHandler = async () => {
    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [
      handleClose,
      () => closeThisOne("appointmentDetails"),
    ];
    dispatch(
      remove_module_redux({
        url: `api/v1/admin/deleteUser/${id}`,
        successMsg: "Removed",
        dispatchFunc,
        additionalFunctions,
      })
    );
  };

  function openProfile() {
    handleShow("userDetailCanvas", []);
    handleClose();
  }

  const openModalById = (modalId, data) => {
    dispatch(openModal({ modalId, showModal: true, modalData: data }));
  };
  const handleShow = (modalId, data) => {
    openModalById(modalId, data);
  };

  return (
    <>
      <EditProfile
        show={open}
        handleClose={() => setOpenModal(false)}
        data={data}
      />
      <Modal
        title="Copy to Clipboard"
        show={show}
        onHide={handleClose}
        className="text_Modal"
        style={{ top: "70%" }}
      >
        <div className="phone_dialoag">
          <button onClick={() => openProfile()}>View Profile</button>
          <button
            onClick={() => {
              setOpenModal(true);
              handleClose();
            }}
          >
            Edit Profile
          </button>
          <button onClick={() => deleteHandler()}>Remove Client</button>
        </div>
        <div className="close_btn" onClick={handleClose}>
          <p>Close</p>
        </div>
      </Modal>
    </>
  );
};

export const RescheduleCanvas = ({
  show,
  handleClose,
  setIsReschedule,
  orderId,
}) => {
  const dispatch = useDispatch();
  const { modalData } = useSelector(selectModalById("rescheduleCanvas"));
  const selectedAppointmentDate = useSelector(todayDate);
  const [mailSend, setMailSend] = useState("");
  const start = new Date(modalData?.start);
  const year = start?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const monthFormated = parseInt(start?.getMonth()) + 1;
  const dayFormated = start?.getDate();
  const monthStr = monthFormated < 10 ? `0${monthFormated}` : monthFormated;
  const dayStr = dayFormated < 10 ? `0${dayFormated}` : dayFormated;
  const formatedDate = `${year}-${monthStr}-${dayStr}`;
  const startingTime2 = start?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const putHandler = async () => {
    const payload = {
      time: startingTime2,
      mailSend,
    };

    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [handleClose, () => setIsReschedule(false)];
    dispatch(
      edit_module_redux({
        url: `api/v1/admin/reSechduleOrder/${orderId}/${formatedDate}`,
        payload,
        successMsg: "Rescheduled",
        dispatchFunc,
        additionalFunctions,
      })
    );
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Body className="Appointment_Canvas">
        <div className="reschudele-header">
          <p> Update appointment</p>
          <i
            onClick={() => {
              setIsReschedule(false);
              handleClose();
            }}
            className="fa-solid fa-close"
          />
        </div>
        <div className="select_container">
          <div className="notify_check_box">
            <input
              type="checkbox"
              checked={mailSend === "yes"}
              onChange={(e) => setMailSend(e.target.checked ? "yes" : "")}
            />
            <div>
              <p>Notify about reschedule</p>
              <span>
                Send a message to user informing their appointment was
                reschedule
              </span>
            </div>
          </div>
          <div className="last_button">
            <div className="btn_container">
              <button className="save w-100" onClick={putHandler}>
                Update
              </button>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const ServiceCanvas = ({
  show,
  handleClose,
  serviceHandler,
  userDetail,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [searchTerm, setSearchTerm] = useState("");
  const [service, setServices] = useState([]);
  const [recent, setRecent] = useState([]);
  const [adOnServices, setAdOnServices] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [limitedServices, setLimitedService] = useState({});

  const fetchRecent = useCallback(() => {
    const id = userDetail?._id;
    getRecentService(id, setRecent);
  }, [userDetail]);

  useEffect(() => {
    if (show) {
      fetchRecent();
    }
  }, [show, fetchRecent]);

  useEffect(() => {
    if (show) {
      getAdOnService(setAdOnServices);
    }
  }, [show]);

  // Fetching Service
  const fetchService = () => {
    fetchServices(setServices);
  };

  const fetchLimitedServices = () => {
    getApi({
      url: `api/v1/Service/all/getAllOfferServices`,
      setResponse: setLimitedService,
    });
  };

  useEffect(() => {
    if (show) {
      fetchService();
      fetchLimitedServices();
    }
  }, [show]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const selectHandler = async (type, i, priceId) => {
    await serviceHandler(type, i, priceId);
    setSelectedSizes({});
    handleClose();
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  const filteredService = searchTerm
    ? service?.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : service;

  const handleSizeChange = (selectedOption, productId) => {
    const parsedValue = JSON.parse(selectedOption.value);
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: parsedValue,
    }));
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
        <div className="heading">
          <p>Select Service</p>
        </div>
        <div className="search_input">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            placeholder="search by service name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {recent?.length > 0 && (
          <div className="recently_booked">
            <p className="heading">
              Recently booked by{" "}
              {userDetail?.firstName + " " + userDetail?.lastName}{" "}
            </p>
            <Slider {...settings}>
              {recent?.reverse()?.map((i, index) =>
                i?.services?.map((item) => (
                  <div
                    className="service"
                    key={`PastService${index}`}
                    onClick={() => {
                      if (!item.priceId) {
                        selectHandler("service", item?.serviceId);
                      } else {
                        selectHandler(
                          "service",
                          item?.serviceId,
                          item?.priceId
                        );
                      }
                    }}
                  >
                    <p className="title"> {item?.serviceId?.name} </p>
                    <p className="faded">
                      {" "}
                      {i?.toTime && inMonthFomat(i.toTime)} ({item?.totalTime})
                    </p>
                    {!i.priceId && <p className="price"> ${item.price} </p>}
                    {i.priceId && <p className="price"> {item.size} </p>}
                    {i.priceId && <p className="price"> {item.sizePrice} </p>}
                  </div>
                ))
              )}
            </Slider>
          </div>
        )}

        {/* Regular Services */}
        {filteredService?.length > 0 && (
          <>
            <div className="heading mt-3">
              <p>Regular services</p>
            </div>
            <div className="service_selector_container">
              {filteredService?.map((i, index) => (
                <div
                  className={`service_selector `}
                  key={`service${index}`}
                  onClick={() => {
                    if (!i.multipleSize) {
                      selectHandler("service", i);
                    }
                  }}
                >
                  <div
                    className={`${i.sizePrice === true ? "full-react" : ""} `}
                  >
                    <p className="title"> {i.name} </p>
                    <p className="faded"> {i.totalTime} </p>
                    {i.multipleSize === true && (
                      <>
                        <Select
                          options={i.sizePrice?.map((i) => ({
                            value: `${JSON.stringify(i)}`,
                            label: `${i.size}`,
                          }))}
                          onChange={(selectedOption) =>
                            handleSizeChange(selectedOption, i._id)
                          }
                          placeholder="Select Size"
                          className="mb-3"
                        />
                        {selectedSizes[i?._id]?.price && (
                          <button
                            onClick={() => {
                              const selectedSizeId = selectedSizes[i?._id]?._id;
                              selectHandler("service", i, selectedSizeId);
                            }}
                          >
                            Add selected service
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {i.multipleSize === false && (
                    <p className="price"> ${i.price} </p>
                  )}
                  {i.multipleSize === true && selectedSizes[i._id] && (
                    <p className="price"> ${selectedSizes[i._id]?.price} </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Limited Offer Services */}
        {limitedServices?.data?.length > 0 && (
          <>
            <div className="heading mt-3">
              <p>Limited Offer services</p>
            </div>
            <div className="service_selector_container">
              {limitedServices?.data?.map((i, index) => (
                <div
                  className={`service_selector `}
                  key={`service${index}`}
                  onClick={() => {
                    if (!i.multipleSize) {
                      selectHandler("service", i);
                    }
                  }}
                >
                  <div
                    className={`${i.sizePrice === true ? "full-react" : ""} `}
                  >
                    <p className="title"> {i.name} </p>
                    <p className="faded"> {i.totalTime} </p>
                    {i.multipleSize === true && (
                      <>
                        <Select
                          options={i.sizePrice?.map((i) => ({
                            value: `${JSON.stringify(i)}`,
                            label: `${i.size}`,
                          }))}
                          onChange={(selectedOption) =>
                            handleSizeChange(selectedOption, i._id)
                          }
                          placeholder="Select Size"
                          className="mb-3"
                        />
                        {selectedSizes[i?._id]?.price && (
                          <button
                            onClick={() => {
                              const selectedSizeId = selectedSizes[i?._id]?._id;
                              selectHandler("service", i, selectedSizeId);
                            }}
                          >
                            Add selected service
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {i.multipleSize === false && (
                    <p className="price">
                      {" "}
                      ${i.discountPrice ? i.discountPrice : i.price}{" "}
                    </p>
                  )}
                  {i.multipleSize === true && selectedSizes[i._id] && (
                    <p className="price"> ${selectedSizes[i._id]?.price} </p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Ad On Service */}
        {adOnServices?.length > 0 && (
          <>
            <div className="heading mt-3">
              <p>Ad-On services</p>
            </div>
            <div className="service_selector_container">
              {adOnServices?.map((i, index) => (
                <div
                  className="service_selector"
                  key={`service${index}`}
                  onClick={() => selectHandler("adOnService", i)}
                >
                  <div>
                    <p className="title"> {i.name} </p>
                    <p className="faded"> {i.totalTime} </p>
                  </div>
                  <p className="price"> ${i.price} </p>
                </div>
              ))}
            </div>{" "}
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const DetailDialog = ({
  show,
  handleClose,
  selector,
  type,
  activate,
}) => {
  const dispatch = useDispatch();

  const { modalData } = useSelector(selectModalById("appointmentDetails"));

  function useShow(id) {
    const { showModal } = useSelector(selectModalById(id));
    return showModal;
  }

  const openModalById = (modalId) => {
    dispatch(openModal({ modalId, showModal: true }));
  };

  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };

  const handleShow = (modalId) => {
    openModalById(modalId);
  };

  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };

  function NotesSelector() {
    type("Notes");
    handleClose();
  }
  function PaymentSelector() {
    type("Payments");
    handleClose();
  }

  function openNotification() {
    showMsg(
      "",
      "Upcoming appointments can't be set to no-show , use cancel action instead",
      "danger"
    );
    handleClose();
  }

  const noShow = modalData?.isShow;
  return (
    <>
      <CancelCanvas
        show={useShow("cancelCanvas")}
        handleClose={() => closeThisOne("cancelCanvas")}
      />
      <NoShowCanvas
        show={useShow("noShowCanvas")}
        handleClose={() => closeThisOne("noShowCanvas")}
      />

      <Modal
        title="Copy to Clipboard"
        show={show}
        onHide={handleClose}
        className="text_Modal"
        style={{ top: "55%" }}
      >
        <div className="phone_dialoag">
          <button onClick={NotesSelector}>Edit appointment notes</button>
          <button onClick={() => selector()}> Reschedule </button>
          <p onClick={PaymentSelector}> Ask client to confirm </p>
          {noShow === false &&
            (activate ? (
              <p
                style={{ color: "red" }}
                onClick={() => {
                  closeThisOne("detailDialog");
                  handleShow("noShowCanvas");
                }}
              >
                {" "}
                No-show{" "}
              </p>
            ) : (
              <p style={{ color: "red" }} onClick={() => openNotification()}>
                {" "}
                No-show{" "}
              </p>
            ))}

          <p
            style={{ color: "red" }}
            onClick={() => {
              closeThisOne("detailDialog");
              handleShow("cancelCanvas");
            }}
          >
            {" "}
            Cancel{" "}
          </p>
        </div>
        <div className="close_btn" onClick={handleClose}>
          <p>Close</p>
        </div>
      </Modal>
    </>
  );
};

export const UserCanvas = ({ show, handleClose, userHandler }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(25);
  const [data, setData] = useState({});
  const [clientDialog, setClientDialog] = useState(false);

  const fetchHandler = useCallback(() => {
    getApi({
      url: `api/v1/admin/getAllUserforSearch?search=${search}&limit=${limit}&page=${1}`,
      setResponse: setData,
      setLoading,
    });
  }, [search, limit]);

  useEffect(() => {
    if (show) {
      fetchHandler();
    } else {
      setData({});
    }
  }, [show, fetchHandler]);

  const hasMore = data?.data?.totalDocs > data?.data?.docs?.length;

  const targteHandler = () => {
    const target = document.getElementById("file");
    target.click();
  };

  const uploader = (file) => {
    const fd = new FormData();
    fd.append("excelFile", file);
    uploadUser(fd);
  };

  // ---
  const customDebounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const loadMore = customDebounce(() => {
    if (limit === data?.data?.totalDocs || limit < data?.data?.totalDocs) {
      setLimit(limit + 25);
    }
  }, 500);

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: loadMore,
    disabled: loading,
  });

  return (
    <>
      <CreateClient
        show={clientDialog}
        handleClose={() => setClientDialog(false)}
        fetchHandler={fetchHandler}
      />
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{ width: "100%", height: "100%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="Appointment_Canvas">
          <div className="heading">
            <p>Select Client</p>
          </div>
          <div className="search_input">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              placeholder="search Client"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="excel_upload">
            <button onClick={() => targteHandler()}>Upload</button>
            <input
              onChange={(e) => uploader(e.target.files[0])}
              style={{ display: "none" }}
              id="file"
              type="file"
            />
          </div>

          <div className="walk-in">
            <div className="user_select" onClick={() => setClientDialog(true)}>
              <div className="img">
                {" "}
                <i class="fa-solid fa-plus"></i>{" "}
              </div>
              <div className="content">
                <p className="heading">Add New Client </p>
              </div>
            </div>
          </div>

          <div>
            <div className="user_select_container">
              {data?.data?.docs?.map((i, index) => (
                <div
                  className="user_select"
                  key={index}
                  onClick={() => userHandler(i)}
                >
                  <div className="img"> {i.firstName?.slice(0, 1)} </div>
                  <div className="content">
                    <p className="heading">
                      {" "}
                      {i.firstName + " " + i.lastName}{" "}
                    </p>
                    <p className="faded">
                      {" "}
                      {i.phone && PhoneNumberFormatter(i?.phone)}{" "}
                    </p>
                    <p className="faded"> {i.email} </p>
                  </div>
                </div>
              ))}
            </div>
            {loading && <SpinnerComp />}
            <div ref={sentryRef}></div>
          </div>

          {/* --- */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export const EditService = ({
  show,
  setShow,
  userId,
  fetchCart,
  date,
  time,
  type,
  priceId,
  setPriceId,
}) => {
  const [service, setService] = useState([]);
  const [id, setId] = useState("");
  const [time1, setTime] = useState("");
  const [adOnServices, setAdOnServices] = useState([]);
  const [price, setPrice] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [totalMin, setTotalMin] = useState("");
  const [newServiceId, setNewServiceId] = useState("");
  const [teamMember, setTeamMember] = useState("Shahina Hoja");
  const [previouSizeId, setPreviousSizeId] = useState("");
  const [newSizeId, setNewSizeId] = useState("");
  const [size, setSize] = useState("");
  const [memberprice, setMembershipPrice] = useState("");
  const [previousSizeName, setPreviousSizeName] = useState("");
  const [servicename, setServiceName] = useState("");
  const [sizeArr, setSizeArr] = useState([]);

  async function fetchHandler() {
    fetchServices(setService);
  }

  useEffect(() => {
    if (show) {
      fetchHandler();
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      getAdOnService(setAdOnServices);
    }
  }, [show]);

  async function deleteHandler() {
    let payload;
    if (previouSizeId && previousSizeName) {
      payload = {
        priceId: previouSizeId,
      };
    }
    await deleteService(id, userId, fetchCart, payload);
    setShow(false);
  }

  let payload;

  if (previouSizeId && newSizeId && size) {
    payload = {
      date,
      newServiceId,
      price,
      quantity: 1,
      totalMin,
      totalTime,
      userId,
      teamMember,
      time: time1,
      priceId: previouSizeId,
      newPriceId: newSizeId,
      size,
      memberprice,
    };
  } else {
    payload = {
      date,
      newServiceId,
      price,
      quantity: 1,
      totalMin,
      totalTime,
      userId,
      teamMember,
      time: time1,
      memberprice,
    };
  }

  const addInCart = async (e) => {
    e.preventDefault();
    const additionalFunctions = [fetchCart, () => setShow(false)];
    postApi({
      url: `api/v1/admin/editServiceInCart/${id}`,
      payload,
      additionalFunctions,
    });
  };

  useEffect(() => {
    if (show) {
      if (type === "Regular") {
        setId(priceId?.serviceId?._id);
        setNewServiceId(priceId?.serviceId?._id);
        setPrice(priceId?.price);
        setMembershipPrice(priceId?.memberprice);
        setServiceName(priceId?.serviceId?.name);
        setTotalTime(priceId?.totalTime);
        if (priceId?.priceId) {
          setPreviousSizeName(priceId?.size);
          setPreviousSizeId(priceId?.priceId);
          setNewSizeId(priceId?.priceId);
          setSize(priceId?.size);
          setSizeArr(priceId?.serviceId?.sizePrice);
        } else {
          setPreviousSizeName("");
        }
      } else {
        setId(priceId?.addOnservicesId?._id);
        setNewServiceId(priceId?.addOnservicesId?._id);
        setPrice(priceId?.price);
        setTotalTime(priceId?.totalTime);
      }
    }
  }, [show, priceId]);

  const flexContainer = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItem: "center",
  };

  const halfWidth = {
    width: "50%",
  };

  useEffect(() => {
    if (time) {
      setTime(time);
    }
  }, [time]);

  async function deleteAnother() {
    const additionalFunctions = [fetchCart, () => setShow(false)];
    deleteApi({
      url: `api/admin/cart/delete/AddOnservices/${id}/${userId}`,
      additionalFunctions,
    });
  }

  const addAdOn = async (e) => {
    e.preventDefault();
    const additionalFunctions = [fetchCart, () => setShow(false)];
    postApi({
      url: `api/v1/admin/editAddOnservicesInCart/${id}`,
      payload,
      additionalFunctions,
    });
  };

  useEffect(() => {
    if (totalTime) {
      const hoursAndMinutesMatch = totalTime.match(
        /(\d+)\s*hr(?:\s*(\d*)\s*min)?/
      );
      const onlyHoursMatch = totalTime.match(/(\d+)\s*hr/);
      const onlyMinutesMatch = totalTime.match(/(\d+)\s*min/);
      if (hoursAndMinutesMatch || onlyMinutesMatch || onlyHoursMatch) {
        TimeFormatter({
          value: totalTime,
          setTime: setTotalTime,
          setMin: setTotalMin,
        });
      }
    }
  }, [totalTime]);

  const handleChanges = (e) => {
    const data = JSON.parse(e.target.value);
    setNewServiceId(data._id);
    setTotalTime(data?.totalTime);
    if (data.multipleSize === true) {
      setSizeArr(data.sizePrice);
      setNewSizeId("");
      setSize("");
    } else {
      setSizeArr([]);
      setNewSizeId("");
      setSize("");
    }
  };

  const handle_change = (e) => {
    const data = JSON.parse(e.target.value);
    setNewServiceId(data._id);
    setPrice(data.price);
    setTotalTime(data?.totalTime);
  };

  const durationHandler = (e) => {
    setTotalTime(e.value);
  };

  const teamOption = [
    {
      value: "Shahina Hoja",
      label: "Shahina Hoja",
    },
    {
      value: "Noor R.",
      label: "Noor R.",
    },
  ];

  const sizeHandler = (i) => {
    const data = JSON.parse(i);
    setNewSizeId(data._id);
    if (!previouSizeId) {
      setPreviousSizeId(data._id);
    }
    setSize(data.size);
    setMembershipPrice(data.mPrice);
    setPrice(data.price);
  };

  function showTime(i) {
    if (i.multipleSize === false) {
      return `( ${i.totalTime} )`;
    }
  }

  return (
    <Offcanvas
      show={show}
      onHide={() => setShow(false)}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "900" }}>
          Edit service
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="booked_appointment_modal">
        <form>
          <div>
            <p>Previous Selected Service</p>
            <input type="text" disabled defaultValue={servicename} />
          </div>
          {previousSizeName && (
            <div>
              <p>Previous Selected Size</p>
              <input type="text" disabled defaultValue={previousSizeName} />
            </div>
          )}
        </form>
        {type === "Regular" ? (
          <form>
            <div>
              <p>Service</p>
              <select onChange={handleChanges}>
                <option>Select Service</option>
                {service?.map((i, index) => (
                  <option key={`Servic${index}`} value={JSON.stringify(i)}>
                    {" "}
                    {i.name} {showTime(i)}
                  </option>
                ))}
              </select>
            </div>

            <div style={flexContainer}>
              <div style={halfWidth}>
                <p>Start time</p>
                <input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time1}
                />
              </div>
              <div style={halfWidth} className="select_Div">
                <p>Duration</p>

                <Select
                  options={durationOption}
                  placeholder="Select Duration"
                  onChange={(e) => durationHandler(e)}
                />
              </div>
            </div>

            <div style={flexContainer}>
              <div style={halfWidth}>
                <p>Price</p>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={0}
                  placeholder="150"
                />
              </div>
              <div style={halfWidth} className="select_Div">
                <p>Team member</p>
                <Select
                  options={teamOption}
                  placeholder="Select Team Member"
                  onChange={(e) => setTeamMember(e.value)}
                />
              </div>
            </div>

            <div style={flexContainer}>
              {sizeArr?.length > 0 && (
                <div style={halfWidth} className="select_Div">
                  <p>Select Package</p>
                  <Select
                    options={sizeArr?.map((i) => ({
                      value: JSON.stringify(i),
                      label: i.size,
                    }))}
                    onChange={(e) => sizeHandler(e.value)}
                    placeholder="Select Package"
                  />
                </div>
              )}

              <div style={halfWidth}>
                <p>Membership Price</p>
                <input
                  type="number"
                  min={0}
                  onChange={(e) => setMembershipPrice(e.target.value)}
                  value={memberprice}
                />
              </div>
            </div>

            <div className="btn_container">
              <i
                className="fa-regular fa-trash-can cursor-pointer"
                onClick={() => deleteHandler()}
              ></i>
              <button onClick={addInCart}>Apply</button>
            </div>
          </form>
        ) : (
          <form>
            <div>
              <p>Service</p>
              <select onChange={handle_change}>
                <option>Select Service</option>
                {adOnServices?.map((i, index) => (
                  <option key={`Servic${index}`} value={JSON.stringify(i)}>
                    {" "}
                    {i.name} ( {i.totalTime} )
                  </option>
                ))}
              </select>
            </div>
            <div style={flexContainer}>
              <div style={halfWidth}>
                <p>Start time</p>
                <input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time1}
                />
              </div>
              <div style={halfWidth} className="select_Div">
                <p>Duration</p>
                <Select
                  options={durationOption}
                  placeholder="Select Duration"
                  onChange={(e) => durationHandler(e)}
                />
              </div>
            </div>

            <div style={flexContainer}>
              <div style={halfWidth}>
                <p>Price</p>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={0}
                  placeholder="150"
                />
              </div>
              <div style={halfWidth} className="select_Div">
                <p>Team member</p>
                <Select
                  options={teamOption}
                  placeholder="Select Team Member"
                  onChange={(e) => setTeamMember(e.value)}
                />
              </div>
            </div>
            <div className="mt-4"></div>
            <div className="btn_container">
              <i
                className="fa-regular fa-trash-can cursor-pointer"
                onClick={() => deleteAnother()}
              ></i>
              <button onClick={addAdOn}>Apply</button>
            </div>
          </form>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const CancelCanvas = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [cancelReason, setCancelReason] = useState("");
  const [mailSend, setMailSend] = useState(true);
  const [chargedOnCancelBooking, setChargedOnCancelBooking] = useState(true);
  const [hour, setHour] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const selectedAppointmentDate = useSelector(todayDate);

  const { modalData } = useSelector(selectModalById("appointmentDetails"));

  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };
  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };

  const id = modalData?.id;

  const updateMail = mailSend ? "yes" : "no";
  const updateCharged = chargedOnCancelBooking ? "yes" : "no";

  async function cancelThis(e) {
    e.preventDefault();
    const payload = {
      cancelReason,
      mailSend: updateMail,
      chargedOnCancelBooking: updateCharged,
    };

    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [
      handleClose,
      () => closeThisOne("detailDialog"),
      () => closeThisOne("appointmentDetails"),
    ];
    dispatch(
      edit_module_redux({
        url: `api/v1/cancelBooking/${id}`,
        payload,
        successMsg: "Cancelled Appointment",
        dispatchFunc,
        additionalFunctions,
      })
    );
  }

  const date = modalData?.start;

  useEffect(() => {
    if (date && show) {
      formatInHour({ date, setMonth, setDay, setHour });
    }
  }, [show, date]);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "700" }}>
          Cancel appointment
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="booked_appointment_modal cancel_appointment ">
          <p className="tagLine">
            This appointment was boooked by {modalData?.fullName} at {hour} ,{" "}
            {day} {month}
          </p>
          <form onSubmit={cancelThis}>
            <div>
              <p>Cancellation reason</p>
              <select onChange={(e) => setCancelReason(e.target.value)}>
                <option></option>
                <option value={"No reason provided"}>No reason provided</option>
                <option value={"Duplicate appointment"}>
                  Duplicate appointment
                </option>
                <option value={"Appointment made by mistake"}>
                  Appointment made by mistake
                </option>
                <option value={"Client not available"}>
                  Client not available
                </option>
              </select>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                checked={mailSend}
                onChange={(e) => setMailSend(e.target.checked)}
                style={{ accentColor: "#2D34B7", cursor: "pointer" }}
              />
              <div>
                <p>Send {modalData?.fullName} a cancellation notification</p>
                <span>
                  Send a message informing {modalData?.fullName} their
                  appointment has been updated
                </span>
              </div>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                checked={chargedOnCancelBooking}
                onChange={(e) => setChargedOnCancelBooking(e.target.checked)}
                style={{ accentColor: "#2D34B7", cursor: "pointer" }}
              />
              <div>
                <p>Do you want to charge a cancel fees?</p>
              </div>
            </div>

            <button type="submit">Cancel appointment</button>
          </form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const UserDialog = ({ show, setShow, data, fetchBooking }) => {
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch();
  const selectedAppointmentDate = useSelector(todayDate);
  function closeProfile() {
    setProfile(false);
  }

  function BlockHandler() {
    const id = data?.user?._id;
    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [fetchBooking, () => setShow(false)];
    dispatch(
      edit_module_redux({
        url: `api/v1/admin/activeBlockUser/${id}`,
        payload: {},
        dispatchFunc,
        additionalFunctions,
      })
    );
  }

  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };

  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };
  const closeHandler = () => setShow(false);
  const deleteHandler = async () => {
    const id = data?.user?._id;
    // await dispatch(deleteUser(id, closeHandler()));
    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [
      closeHandler,
      () => closeThisOne("userDetailCanvas"),
      () => closeThisOne("appointmentDetails"),
    ];
    dispatch(
      remove_module_redux({
        url: `api/v1/admin/deleteUser/${id}`,
        successMsg: "Removed",
        dispatchFunc,
        additionalFunctions,
      })
    );
  };

  return (
    <>
      <EditProfile show={profile} handleClose={closeProfile} data={data} />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="text_Modal"
        style={{ top: "60%" }}
      >
        <div className="phone_dialoag user_dialog">
          <button
            onClick={() => {
              setShow(false);
              setProfile(true);
            }}
          >
            Edit details
            <i className="fa-sharp fa-solid fa-pen"></i>
          </button>
          <button onClick={() => Call(data?.user?.phone)}>
            Call mobile number
            <i className=" fa-sharp fa-solid fa-phone"></i>
          </button>
          <button onClick={() => SendSms(data?.user?.phone)}>
            Send text message
            <i class="fa-sharp fa-solid fa-comment-sms"></i>
          </button>
          {data?.user?.userStatus === "Block" ? (
            <button onClick={BlockHandler}>
              Un-Block client
              <i className="fa-sharp fa-solid fa-lock-open"></i>
            </button>
          ) : (
            <button onClick={BlockHandler}>
              Block client
              <i className="fa-sharp fa-solid fa-lock"></i>
            </button>
          )}

          <button style={{ color: "rgb(176, 34, 12)" }} onClick={deleteHandler}>
            Delete client
            <i className=" fa-sharp fa-regular fa-trash-can"></i>
          </button>
        </div>
        <div className="close_btn" onClick={() => setShow(false)}>
          <p>Close</p>
        </div>
      </Modal>
    </>
  );
};

export const EditProfile = ({ show, handleClose, data }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [showOnAllBooking, setShowOnAllBooking] = useState(true);
  const [sendEmailNotification, setSendEmailNotification] = useState(true);
  const [sendTextNotification, sentTextNotification] = useState(true);
  const [sendEmailMarketingNotification, setSendEmailMarketingNotification] =
    useState(true);
  const [sendTextMarketingNotification, setSendTextMarketingNotification] =
    useState(true);
  const [preferredLAnguage, setPreferedLanguage] = useState("");
  const [id, setId] = useState("");
  const selectedAppointmentDate = useSelector(todayDate);
  const title = data?.user?.firstName + " " + data?.user?.lastName;

  useEffect(() => {
    if (data) {
      setFirstName(data?.user?.firstName);
      setLastName(data?.user?.lastName);
      setEmail(data?.user?.email);
      setPhone(data?.user?.phone);
      setGender(data?.user?.gender);
      setDob(data?.user?.dob);
      setId(data?.user?._id);
      setBio(data?.user?.bio);
      setSendEmailNotification(data?.user?.sendEmailNotification);
      setShowOnAllBooking(data?.user?.showOnAllBooking);
      sentTextNotification(data?.user?.sendTextNotification);
      setSendEmailMarketingNotification(
        data?.user?.sendEmailMarketingNotification
      );
      setSendTextMarketingNotification(
        data?.user?.sendTextMarketingNotification
      );
      setPreferedLanguage(data?.user?.preferredLAnguage);
    }
  }, [data]);

  const payload = {
    firstName,
    lastName,
    fullName: title,
    email,
    phone,
    gender,
    dob,
    bio,
    showOnAllBooking,
    sendEmailNotification,
    sendTextNotification,
    sendEmailMarketingNotification,
    sendTextMarketingNotification,
    preferredLAnguage,
  };

  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };
  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [
      handleClose,
      () => closeThisOne("userDetailCanvas"),
      () => closeThisOne("appointmentDetails")
    ];
    dispatch(
      edit_module_redux({
        url: `api/v1/admin/updateClientProfile/${id}`,
        payload,
        successMsg: "Updated Successfully",
        dispatchFunc,
        additionalFunctions,
      })
    );
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "700" }}>
          Edit client
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="Appointment_Canvas" style={{ paddingTop: 0 }}>
          <div
            className="user_select_container"
            style={{ backgroundColor: "#F2F1F6", borderRadius: "10px" }}
          >
            <div className="user_select" style={{ border: "none" }}>
              <div className="img"> {title?.slice(0, 1)} </div>
              <div className="content">
                <p className="heading">{title}</p>
                <p className="faded"> {data?.user?.email} </p>
                <p className="faded">
                  +{PhoneNumberFormatter(data?.user?.phone)}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="booked_appointment_modal edit-profile-canvas">
          <form onSubmit={submitHandler}>
            <div>
              <p>First name</p>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div>
              <p>Last name</p>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>

            <div className="mb-3">
              <PhoneInput value={phone} country={"us"} onChange={setPhone} />
            </div>

            <div>
              <p>Email address</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <p>Gender</p>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option></option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </select>
            </div>

            <div>
              <p>Date of birth</p>
              <input type="date" onChange={(e) => setDob(e.target.value)} />
            </div>
            <div className="h-4 width-full bg-[#F2F1F6]"></div>
            <div>
              <h4 style={{ fontWeight: "bold", margin: 0 }}>
                Important client info
              </h4>
              <span style={{ fontWeight: "bold", margin: 0, fontSize: "12px" }}>
                Important client info will only be visible to you and team
                members
              </span>
              <p className="mt-3">Client info</p>
              <textarea
                rows={5}
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />
              <div className="check-Box">
                <div className="main">
                  <Form.Check
                    type="checkbox"
                    value={showOnAllBooking}
                    checked={showOnAllBooking}
                    onChange={(e) => setShowOnAllBooking(e.target.checked)}
                    style={{ width: "20px" }}
                  />
                  <p>Display on all bookings</p>
                </div>
              </div>
            </div>
            <div className="h-4 width-full bg-[#F2F1F6]"></div>
            <div>
              <h4 style={{ fontWeight: "bold", margin: 0 }}>Notifications</h4>
              <span style={{ fontWeight: "bold", margin: 0, fontSize: "12px" }}>
                Choose how you'd like to keep this client up to date about thier
                appointments and sales , like vouchers and membership
              </span>
              <p className="mt-3">Client notifications</p>
              <div className="check-Box">
                <div className="main">
                  <Form.Check
                    type="switch"
                    value={sendEmailNotification}
                    checked={sendEmailNotification}
                    onChange={(e) => setSendEmailNotification(e.target.checked)}
                  />
                  <p>Send email notifications</p>
                </div>
                <div className="main">
                  <Form.Check
                    type="switch"
                    value={sendTextNotification}
                    checked={sendTextNotification}
                    onChange={(e) => sentTextNotification(e.target.checked)}
                  />
                  <p>Send text notifications</p>
                </div>
              </div>
            </div>

            <div>
              <p className="mt-3">Marketing notifications</p>
              <div className="check-Box">
                <div className="main">
                  <Form.Check
                    type="switch"
                    value={sendEmailMarketingNotification}
                    onChange={(e) =>
                      setSendEmailMarketingNotification(e.target.checked)
                    }
                    checked={sendEmailMarketingNotification}
                  />
                  <p>Client accepts email marketing notification</p>
                </div>
                <div className="main">
                  <Form.Check
                    type="switch"
                    value={sendTextMarketingNotification}
                    onChange={(e) =>
                      setSendTextMarketingNotification(e.target.checked)
                    }
                    checked={sendTextMarketingNotification}
                  />
                  <p>Client accepts text message marketing notification</p>
                </div>
              </div>
            </div>

            <div>
              <p>Preferred Language</p>
              <select
                onChange={(e) => setPreferedLanguage(e.target.value)}
                value={preferredLAnguage}
              >
                <option></option>
                <option value={"English"}>English</option>
              </select>
            </div>

            <button type="submit"> Save</button>
          </form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const EditBookedService = ({
  show,
  setShow,
  fetchCart,
  date,
  time,
  type,
  priceId,
  setPriceId,
  orderId,
}) => {
  const [service, setService] = useState([]);
  const [id, setId] = useState("");
  const [time1, setTime] = useState("");
  const [adOnServices, setAdOnServices] = useState([]);
  const [price, setPrice] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [totalMin, setTotalMin] = useState("");
  const [newServiceId, setNewServiceId] = useState("");
  const [teamMember, setTeamMember] = useState({
    value: "Shahina Hoja",
    label: "Shahina Hoja",
  });
  const [previouSizeId, setPreviousSizeId] = useState("");
  const [newSizeId, setNewSizeId] = useState("");
  const [size, setSize] = useState("");
  const [memberprice, setMembershipPrice] = useState("");
  const [previousSizeName, setPreviousSizeName] = useState("");
  const [sizeArr, setSizeArr] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const selectedAppointmentDate = useSelector(todayDate);
  const dispatch = useDispatch();

  async function fetchHandler() {
    fetchServices(setService);
  }

  useEffect(() => {
    if (show) {
      fetchHandler();
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      getAdOnService(setAdOnServices);
    }
  }, [show]);

  async function deleteHandler() {
    let payload;
    if (previouSizeId && previousSizeName) {
      payload = {
        serviceId: id,
        priceId: previouSizeId,
      };
    } else {
      payload = {
        serviceId: id,
      };
    }
    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [fetchCart, () => setShow(false)];
    dispatch(
      edit_module_redux({
        url: `api/v1/deleteServicefromOrders/${orderId}`,
        payload,
        dispatchFunc,
        additionalFunctions,
      })
    );
  }

  let payload;

  if (previouSizeId && newSizeId && size) {
    payload = {
      date,
      newServiceId,
      price,
      quantity: 1,
      serviceId: priceId?.serviceId?._id,
      teamMember: teamMember?.value,
      time: time1,
      totalMin,
      totalTime,
      priceId: previouSizeId,
      newPriceId: setNewSizeId,
      size,
      memberprice,
    };
  } else {
    payload = {
      date,
      newServiceId,
      price,
      quantity: 1,
      serviceId: priceId?.serviceId?._id,
      teamMember: teamMember?.value,
      time: time1,
      totalMin,
      totalTime,
      memberprice,
    };
  }

  const addInCart = async (e) => {
    e.preventDefault();
    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [
      fetchCart,
      () => setShow(false),
      () => setPriceId(""),
    ];
    dispatch(
      edit_module_redux({
        url: `api/v1/editServiceIOrders/${orderId}`,
        payload,
        dispatchFunc,
        additionalFunctions,
      })
    );
  };

  useEffect(() => {
    if (show) {
      if (type === "Regular" && priceId) {
        setId(priceId?.serviceId?._id);
        setNewServiceId(priceId?.serviceId?._id);
        setPrice(priceId?.price);
        setMembershipPrice(priceId?.memberprice);
        setTotalTime(priceId?.totalTime);
        setServiceName(priceId?.serviceId?.name);
        setTeamMember({
          value: priceId?.teamMember,
          label: priceId?.teamMember,
        });
        if (priceId?.priceId) {
          setPreviousSizeName(priceId?.size);
          setPreviousSizeId(priceId?.priceId);
          setNewSizeId(priceId?.priceId);
          setSize(priceId?.size);
          setSizeArr(priceId?.serviceId?.sizePrice);
        } else {
          setPreviousSizeName("");
          setPreviousSizeName("");
          setPreviousSizeId("");
          setNewSizeId("");
          setSize("");
          setSizeArr("");
        }
      } else {
        setId(priceId?.addOnservicesId?._id);
        setNewServiceId(priceId?.addOnservicesId?._id);
        setPrice(priceId?.price);
        setTotalTime(priceId?.totalTime);
        setServiceName(priceId?.addOnservicesId?.name);
        setTeamMember({
          value: priceId?.teamMember,
          label: priceId?.teamMember,
        });
        setPreviousSizeName("");
        setPreviousSizeName("");
        setPreviousSizeId("");
        setNewSizeId("");
        setSize("");
        setSizeArr("");
      }
    }
  }, [show, priceId, type]);

  const flexContainer = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItem: "center",
  };

  const halfWidth = {
    width: "50%",
  };

  useEffect(() => {
    if (time) {
      setTime(time);
    }
  }, [time]);

  async function deleteAnother() {
    const payload = {
      addOnservicesId: id,
    };
    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [fetchCart, () => setShow(false)];
    dispatch(
      edit_module_redux({
        url: `api/v1/deleteAddOnServicefromOrders/${orderId}`,
        payload,
        dispatchFunc,
        additionalFunctions,
      })
    );
  }

  const addAdOn = async (e) => {
    e.preventDefault();
    const payload = {
      date,
      newAddOnservicesId: newServiceId,
      price,
      quantity: 1,
      addOnservicesId: id,
      teamMember: teamMember?.value,
      time,
      totalMin,
      totalTime,
      memberprice,
    };
    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [fetchCart, () => setShow(false)];
    dispatch(
      edit_module_redux({
        url: `api/v1/editAddOnservicesInOrders/${orderId}`,
        payload,
        dispatchFunc,
        additionalFunctions,
      })
    );
  };

  useEffect(() => {
    if (totalTime) {
      const hoursAndMinutesMatch = totalTime.match(
        /(\d+)\s*hr(?:\s*(\d*)\s*min)?/
      );
      const onlyHoursMatch = totalTime.match(/(\d+)\s*hr/);
      const onlyMinutesMatch = totalTime.match(/(\d+)\s*min/);
      if (hoursAndMinutesMatch || onlyMinutesMatch || onlyHoursMatch) {
        TimeFormatter({
          value: totalTime,
          setTime: setTotalTime,
          setMin: setTotalMin,
        });
      }
    }
  }, [totalTime]);

  const handleChanges = (e) => {
    const data = JSON.parse(e.target.value);
    setNewServiceId(data._id);
    setTotalTime(data?.totalTime);
    if (data.multipleSize === true) {
      setSizeArr(data.sizePrice);
      setNewSizeId("");
      setSize("");
    } else {
      setSizeArr([]);
      setNewSizeId("");
      setSize("");
    }
  };

  const handle_change = (e) => {
    const data = JSON.parse(e.target.value);
    setNewServiceId(data._id);
    setPrice(data.price);
    setTotalTime(data?.totalTime);
  };

  const durationHandler = (e) => {
    setTotalTime(e.value);
  };

  const teamOption = [
    {
      value: "Shahina Hoja",
      label: "Shahina Hoja",
    },
    {
      value: "Noor R.",
      label: "Noor R.",
    },
  ];

  const sizeHandler = (i) => {
    const data = JSON.parse(i);
    setNewSizeId(data._id);
    if (!previouSizeId) {
      setPreviousSizeId(data._id);
    }
    setSize(data.size);
    setMembershipPrice(data.mPrice);
    setPrice(data.price);
  };

  function showTime(i) {
    if (i.multipleSize === false) {
      return `( ${i.totalTime} )`;
    }
  }

  return (
    <Offcanvas
      show={show}
      onHide={() => setShow(false)}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "900" }}>
          Edit service
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="booked_appointment_modal">
        <form>
          <div>
            <p>Previous Selected Service</p>
            <input type="text" disabled defaultValue={serviceName} />
          </div>
          {previousSizeName && (
            <div>
              <p>Previous Selected Size</p>
              <input type="text" disabled defaultValue={previousSizeName} />
            </div>
          )}
        </form>
        {type === "Regular" ? (
          <form>
            <div>
              <p>Service</p>
              <select onChange={handleChanges}>
                <option>Select Service</option>
                {service?.map((i, index) => (
                  <option key={`Servic${index}`} value={JSON.stringify(i)}>
                    {" "}
                    {i.name} {showTime(i)}
                  </option>
                ))}
              </select>
            </div>

            <div style={flexContainer}>
              <div style={halfWidth}>
                <p>Start time</p>
                <input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time1}
                />
              </div>
              <div style={halfWidth} className="select_Div">
                <p>Duration</p>

                <Select
                  options={durationOption}
                  placeholder="Select Duration"
                  onChange={(e) => durationHandler(e)}
                />
              </div>
            </div>

            <div style={flexContainer}>
              <div style={halfWidth}>
                <p>Price</p>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={0}
                  placeholder="150"
                />
              </div>
              <div style={halfWidth} className="select_Div">
                <p>Team member</p>
                <Select
                  options={teamOption}
                  placeholder="Select Team Member"
                  onChange={setTeamMember}
                  value={teamMember}
                />
              </div>
            </div>

            <div style={flexContainer}>
              {sizeArr?.length > 0 && (
                <div style={halfWidth} className="select_Div">
                  <p>Select Package</p>
                  <Select
                    options={sizeArr?.map((i) => ({
                      value: JSON.stringify(i),
                      label: i.size,
                    }))}
                    onChange={(e) => sizeHandler(e.value)}
                    placeholder="Select Package"
                  />
                </div>
              )}

              <div style={halfWidth}>
                <p>Membership Price</p>
                <input
                  type="number"
                  min={0}
                  onChange={(e) => setMembershipPrice(e.target.value)}
                  value={memberprice}
                />
              </div>
            </div>

            <div className="btn_container">
              <i
                className="fa-regular fa-trash-can cursor-pointer"
                onClick={() => deleteHandler()}
              ></i>
              <button onClick={addInCart}>Apply</button>
            </div>
          </form>
        ) : (
          <form>
            <div>
              <p>Service</p>
              <select onChange={handle_change}>
                <option>Select Service</option>
                {adOnServices?.map((i, index) => (
                  <option key={`Servic${index}`} value={JSON.stringify(i)}>
                    {" "}
                    {i.name} ( {i.totalTime} )
                  </option>
                ))}
              </select>
            </div>
            <div style={flexContainer}>
              <div style={halfWidth}>
                <p>Start time</p>
                <input
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time1}
                />
              </div>
              <div style={halfWidth} className="select_Div">
                <p>Duration</p>
                <Select
                  options={durationOption}
                  placeholder="Select Duration"
                  onChange={(e) => durationHandler(e)}
                />
              </div>
            </div>

            <div style={flexContainer}>
              <div style={halfWidth}>
                <p>Price</p>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={0}
                  placeholder="150"
                />
              </div>
              <div style={halfWidth} className="select_Div">
                <p>Team member</p>
                <Select
                  options={teamOption}
                  placeholder="Select Team Member"
                  onChange={(e) => setTeamMember(e.value)}
                />
              </div>
            </div>
            <div className="mt-4"></div>
            <div className="btn_container">
              <i
                className="fa-regular fa-trash-can cursor-pointer"
                onClick={() => deleteAnother()}
              ></i>
              <button onClick={addAdOn}>Apply</button>
            </div>
          </form>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const AddServiceModal = ({ show, handleClose, serviceHandler }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [searchTerm, setSearchTerm] = useState("");
  const [service, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [adOnServices, setAdOnServices] = useState([]);

  useEffect(() => {
    if (show) {
      getAdOnService(setAdOnServices);
    }
  }, [show]);

  // Fetching Service
  const fetchService = useCallback(() => {
    getPaginatedServices(searchTerm, page, setServices);
  }, [searchTerm, page]);

  useEffect(() => {
    if (show) {
      fetchService();
    }
  }, [fetchService, show]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const selectHandler = async (type, i) => {
    await serviceHandler(type, i);
    handleClose();
  };

  function Next() {
    setPage(page + 1);
  }

  function Prev() {
    setPage(page - 1);
  }

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
        <div className="heading">
          <p>Select Service</p>
        </div>
        <div className="search_input">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            placeholder="search by service name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Regular Services */}
        {service?.length > 0 && (
          <>
            <div className="heading mt-3">
              <p>Regular services</p>
            </div>
            <div className="service_selector_container">
              {service?.map((i, index) => (
                <div
                  className="service_selector"
                  key={`service${index}`}
                  onClick={() => selectHandler("service", i)}
                >
                  <div>
                    <p className="title"> {i.name} </p>
                    <p className="faded"> {i.totalTime} </p>
                  </div>
                  <p className="price"> ${i.price} </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Ad On Service */}
        {adOnServices?.length > 0 && (
          <>
            <div className="heading mt-3">
              <p>Ad-On services</p>
            </div>
            <div className="service_selector_container">
              {adOnServices?.map((i, index) => (
                <div
                  className="service_selector"
                  key={`service${index}`}
                  onClick={() => selectHandler("adOnService", i)}
                >
                  <div>
                    <p className="title"> {i.name} </p>
                    <p className="faded"> {i.totalTime} </p>
                  </div>
                  <p className="price"> ${i.price} </p>
                </div>
              ))}
            </div>{" "}
          </>
        )}

        <div className="last_button">
          {page > 1 && service?.length === 0 ? (
            ""
          ) : (
            <div className="btn_container justify-center">
              <button className="save" type="button" onClick={Next}>
                View More
              </button>
            </div>
          )}

          {page > 1 && service?.length === 0 && (
            <div className="btn_container justify-center">
              <button className="save" type="button" onClick={Prev}>
                View Less
              </button>
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const NoShowCanvas = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const selectedAppointmentDate = useSelector(todayDate);
  const { modalData } = useSelector(selectModalById("appointmentDetails"));
  const [mailSend, setMailSend] = useState(true);
  const [chargedOnNoshow, setChargedOnNoShow] = useState(true);
  const [hour, setHour] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const date = modalData?.start;

  const id = modalData?.id;
  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };

  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };

  const updateMail = mailSend ? "yes" : "no";
  const updateCharged = chargedOnNoshow ? "yes" : "no";

  const payload = {
    mailSend: updateMail,
    chargedOnNoshow: updateCharged,
  };

  const updateNoShow = async (e) => {
    e.preventDefault();
    const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
    const additionalFunctions = [
      handleClose,
      () => closeThisOne("cancelCanvas"),
      () => closeThisOne("detailDialog"),
      () => closeThisOne("appointmentDetails"),
    ];
    dispatch(
      edit_module_redux({
        url: `api/v1/admin/noShowUpdate/${id}`,
        payload,
        successMsg: "No show update Successfully",
        dispatchFunc,
        additionalFunctions,
      })
    );
  };

  useEffect(() => {
    if (date && show) {
      formatInHour({ date, setMonth, setDay, setHour });
    }
  }, [show, date]);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "700" }}>
          Did Not Show
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="booked_appointment_modal cancel_appointment ">
          <p className="tagLine">
            This appointment was boooked by {modalData?.fullName} at {hour} ,{" "}
            {day} {month}
          </p>
          <form onSubmit={updateNoShow}>
            <div className="checkbox">
              <input
                type="checkbox"
                checked={mailSend}
                onChange={(e) => setMailSend(e.target.checked)}
                style={{ accentColor: "#2D34B7", cursor: "pointer" }}
              />
              <div>
                <p>Notify {modalData?.fullName} about No-Show</p>
                <span>
                  Send a message informing {modalData?.fullName} their
                  appointment has been updated
                </span>
              </div>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                checked={chargedOnNoshow}
                onChange={(e) => setChargedOnNoShow(e.target.checked)}
                style={{ accentColor: "#2D34B7", cursor: "pointer" }}
              />
              <div>
                <p>Do you want to charge a No-Show fees?</p>
              </div>
            </div>
            <div className="button-on-end">
              <button type="submit">Set as No-Show</button>
            </div>
          </form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const CallingModal = ({ show, handleClose, phone }) => {
  const [copied, setCopied] = useState(false);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ top: "65%" }}
      className="text_Modal"
    >
      <div className="phone_dialoag">
        <p onClick={() => Call(phone)}>Call phone</p>
        <p onClick={() => SendSms(phone)}>Send message</p>
        <p onClick={() => copyText({ textToCopy: phone, setCopied })}>
          {copied ? "Copied !" : "Copy Phone"}
        </p>
      </div>
      <div className="close_btn" onClick={handleClose}>
        <p> Close</p>
      </div>
    </Modal>
  );
};

export const MailModal = ({ show, handleClose, email }) => {
  const [copied, setCopied] = useState(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ top: "65%" }}
      className="text_Modal"
    >
      <div className="phone_dialoag">
        <p onClick={() => Mail(email)}>Send Email</p>
        <p onClick={() => copyText({ textToCopy: email, setCopied })}>
          {copied ? "Copied !" : "Copy Email Address"}
        </p>
      </div>
      <div className="close_btn" onClick={handleClose}>
        <p>Close</p>
      </div>
    </Modal>
  );
};

// Create Client
export const CreateClient = ({ show, handleClose, fetchHandler }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    firstName,
    lastName,
    email,
    phone,
    gender,
    dob,
  };
  const additionalFunctions = [fetchHandler, handleClose];

  const postHandler = (e) => {
    e.preventDefault();
    postApi({
      url: "api/v1/admin/clientRegistration",
      payload,
      setLoading,
      additionalFunctions,
      successMsg: "Client created successfully !",
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create New</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={postHandler}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <PhoneInput country={"us"} onChange={setPhone} />
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select required onChange={(e) => setGender(e.target.value)}>
              <option>Select Your Prefrence</option>
              <option value={"Male"}> Male </option>
              <option value={"Female"}> Female </option>
              <option value={"Other"}> Other </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setDob(e.target.value)}
            />
          </Form.Group>

          <Button
            style={{ backgroundColor: "#19376d", borderRadius: "0" }}
            type="submit"
          >
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
