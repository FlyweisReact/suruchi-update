/** @format */
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";
import UserDetailCanvas from "./UserDetailCanvas";
import img from "../../../../Images/credit-card.png";
import {
  CallingModal,
  DetailDialog,
  EditBookedService,
  EditNotes,
  MailModal,
  ProfileDetail,
  ServiceCanvas,
} from "./Modals/modal";
import img1 from "../../../../Images/list.png";
import {
  deleteSuggestionOrder,
  editApi,
  edit_module_redux,
  getAppointment,
  getBookingDetail,
} from "../../../../Respo/Api";
import PdfViewer from "./Pdf/PdfViewer";
import {
  closeModal,
  openModal,
  selectModalById,
} from "../../../../Store/Slices/modalSlices";
import {
  Editor_desciption,
  getCorrectTime,
  View_description,
} from "../../../../Helper/Helper";
import { useDispatch, useSelector } from "react-redux";
import { PhoneNumberFormatter } from "../../../../utils/utils";
import { appointmentArr } from "../../../../Helper/Constant";
import { ClipLoader } from "react-spinners";
import { todayDate } from "../../../../Store/Slices/dateSlice";

const AppointmentDetails = ({
  show,
  handleClose,
  setIsReschedule,
  isReschedule,
  setIsBooked,
  orderId,
}) => {
  const [type, setType] = useState("Info");
  const [edit, setEdit] = useState(false);
  const [open_notes_modal, set_open_notes_modal] = useState(false);
  const [detail, setDetail] = useState({});
  const [notes, setNotes] = useState("");
  const [notesId, setNotesId] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [createNote, setCreatNote] = useState(false);
  const [edit_service, setEditService] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [openService, setOpenService] = useState(false);
  const [priceId, setPriceId] = useState("");
  const [inFuture, setInFuture] = useState(false);
  const [callDialog, setCallDialog] = useState(false);
  const [mailDialog, setMailDialog] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const selectedAppointmentDate = useSelector(todayDate);
  const [reminderLoading, setReminderLoading] = useState(false);
  const dispatch = useDispatch();

  function closeService() {
    setOpenService(false);
  }

  const { modalData } = useSelector(selectModalById("appointmentDetails"));

  const id = modalData?.id;

  async function notesHandler(e) {
    e.preventDefault();
    const payload = {
      suggestion: notes,
    };
    const id = detail?._id;
    await editApi({
      url: `api/v1/admin/addSuggestionToServiceOrder/${id}`,
      payload,
      successMsg: "Saved",
      additionalFunctions: [fetchBooking],
      setLoading: setNotesLoading,
    });
    setNotes("");
  }

  async function editNotes(e) {
    e.preventDefault();
    const payload = {
      suggestion: notes,
    };
    await editApi({
      url: `api/v1/admin/editSuggestionfromOrder/${id}/${notesId}`,
      payload,
      successMsg: "Saved",
      additionalFunctions: [fetchBooking],
      setLoading: setNotesLoading,
    });

    setNotes("");
  }

  const fetchBooking = () => {
    getBookingDetail(id, setDetail);
  };

  function deleteSuggestion(suggesstionId) {
    const id = detail?._id;
    deleteSuggestionOrder(id, suggesstionId, fetchBooking);
  }

  const reminderHandler = () => {
    const id = detail?._id;
    editApi({
      url: `api/v1/admin/sendReminder/${id}`,
      payload: {},
      successMsg: "Confirmation sent",
      setLoading: setReminderLoading,
    });
  };

  useEffect(() => {
    if (show && detail) {
      const detailToTime = detail?.toTime ? new Date(detail.toTime) : null;
      if (detailToTime) {
        const today = new Date();
        const isSameDate =
          today.getDate() === detailToTime.getDate() &&
          today.getMonth() === detailToTime.getMonth() &&
          today.getFullYear() === detailToTime.getFullYear();
        if (isSameDate) {
          setInFuture(true);
        } else if (detailToTime > today) {
          setInFuture(false);
        } else if (detailToTime < today) {
          setInFuture(true);
        }
      } else {
        console.log("detail.toTime is not defined or null.");
      }
    }
  }, [show, detail]);

  useEffect(() => {
    if (show === true) {
      fetchBooking();
    }
  }, [show]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
  };

  // Servic Date
  const start = new Date(modalData?.start);
  const month = start?.toLocaleDateString("en-US", {
    month: "long",
  });
  const year = start?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const day = start?.toLocaleDateString("en-US", {
    day: "numeric",
  });
  const formattedTime = start.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = day + " " + month?.slice(0, 3) + " " + year;

  const sendEmail = async () => {
    const serviceToPdfPathMap = {
      "painless prp hair loss treatment":
        "PRPHairLossTreatmentPrePostCareGuide.pdf",
      "pro clinical peel": "ProClinicalPeelForm.pdf",
      "dermamelan peel": "DermamelanPeelPre.pdf",
      "perfect derma peel": "ThePerfectDermaPeel.pdf",
      "acne peel": "Acne Peel.pdf",
      "aquagold microneedling": "AQUAGOLD.pdf",
      "lycine/proline iv": "IV THERAPY.pdf",
      "enlighten md peel": "Enlighten Peel.pdf",
      "enlighten peel": "Enlighten Peel.pdf",
      "glutathione iv": "IV THERAPY.pdf",
      "prp microneedling": "PRPMicroneedlingPre&PostCare.pdf",
      microneedling: "PRPMicroneedlingPre&PostCare.pdf",
      "cosmelan md peel": "PreandPostCosmelanDepigmentationInstructions.pdf",
      "dmk enzyme therapy": "PreparingforDMKEnzymeTherapy.pdf",
      "tca peel": "TCAPeelPre.pdf",
      hydrafacial: "HydraFacialPre.pdf",
      "laser hair removal": "LaserhairremovalPrepCare.pdf",
      "rf body tightening": "RFSkinTighteningPre.pdf",
      "rf face contouring":
        "Face and Body Contouring,Cellulite Reduction Treatment Care.pdf",
      "rf body contouring":
        "Face and Body Contouring,Cellulite Reduction Treatment Care.pdf",
      "cellulite treatment":
        "Face and Body Contouring,Cellulite Reduction Treatment Care.pdf",
      "melasma (hormonal pigment) treatment": [
        "PreandPostCosmelanDepigmentationInstructions.pdf",
        "DermamelanPeelPre.pdf",
      ],
      "jetpeel facial": "JetPeelPreandPost.pdf",
      "laser skin resurfacing": "ErbiumYag2940nmLaserSkinResurfacingPRE.pdf",
      revepeel: "Enlighten Peel.pdf",
      "red carpet facial": ["JetPeelPreandPost.pdf", "RFSkinTighteningPre.pdf"],
      "ipl pigment treatment": "PreandPostTreatmentInstructionsforIPL.pdf",
      FaceandBodyContouringCelluliteReductionTreatmentCare:
        "FaceandBodyContouringCelluliteReductionTreatmentCare.pdf",
      acne: "PreandPostTreatmentInstructionsforIPL.pdf",
      skin: "PreandPostTreatmentInstructionsforIPL.pdf",
      "ipl vascular (rosacea) treatment":
        "PreandPostTreatmentInstructionsforIPL.pdf",
      "rf skin tightening": "PiXel8.pdf",
      "rfskin tightening": "PiXel8.pdf",
      "rf microneedling": "PiXel8.pdf",
      "ipl acne treatment": "PreandPostTreatmentInstructionsforIPL.pdf",
      "ipl skin rejuvanation": "PreandPostTreatmentInstructionsforIPL.pdf",
      "neoskin rejuvenation":
        "Skin Rejuvenation (NeoSkin) Pre and Post Treatment Care.pdf",
      "acne scar revision by aerolase":
        "Scar Revision Pre and Post Treatment Care.pdf",
      "scar revision by aerolase":
        "Scar Revision Pre and Post Treatment Care.pdf",
      "rosacea treatment by aerolase":
        "Rosacea Pre and Post Treatment Care.pdf",
      "neoclear by aerolase":
        "Acne Removal Pre and Post Treatment Care (NeoClear).pdf",
      "pigment reduction by aerolase":
        "Pigmented Lesion Pre and Post Treatment Care.pdf",
    };

    if (detail?.services) {
      const newAttachments = [];

      for (const service of detail?.services) {
        const serviceName = service?.serviceId?.name;
        const trimmedServiceName = serviceName.trim().toLowerCase();
        const pdfFileName = serviceToPdfPathMap[trimmedServiceName];
        if (pdfFileName) {
          if (Array.isArray(pdfFileName)) {
            pdfFileName.forEach((i) => {
              const pdfUrl = `/FormPdf/${i}`;
              newAttachments.push({
                filename: i,
                content: pdfUrl,
              });
            });
          } else {
            const pdfUrl = `/FormPdf/${pdfFileName}`;
            newAttachments.push({
              filename: trimmedServiceName,
              content: pdfUrl,
            });
          }
        }
      }
      setAttachments((prevAttachments) => [
        ...prevAttachments,
        ...newAttachments,
      ]);
    }
  };

  useEffect(() => {
    if (show && detail?.services) {
      setAttachments([]);
      sendEmail();
    }
  }, [show, detail]);

  function isAvailable(statement, code) {
    if (statement) {
      return code;
    }
  }

  let adjustedStartTime = getCorrectTime(detail?.toTime);
  adjustedStartTime.setHours(adjustedStartTime.getHours());
  const modifiedYear = start.getFullYear();
  const modifiedMonth = (start.getMonth() + 1).toString().padStart(2, "0");
  const modifiedDay = start.getDate().toString().padStart(2, "0");

  function OpenEdit(type, priceId) {
    setServiceType(type);
    setPriceId(priceId);
    setEditService(true);
  }

  function SavedCardDate() {
    const cardDate = detail?.cardDetailSavedDate;
    const originalDate = getCorrectTime(cardDate);
    const month = originalDate?.toLocaleDateString("en-US", {
      month: "long",
    });
    const day = originalDate?.toLocaleDateString("en-US", {
      day: "numeric",
    });
    const year = originalDate?.toLocaleDateString("en-US", {
      year: "numeric",
    });
    const formattedTime = originalDate.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });

    const formatteddate =
      day + " , " + month + " " + year + " at " + formattedTime;
    return formatteddate;
  }

  let slider;
  if (type === "Info") {
    const SlidingComponent = () => {
      return (
        <>
          {detail?.user === null ? (
            <div className="add_another" style={{ cursor: "default" }}>
              <p>User no longer exist !</p>
            </div>
          ) : (
            <>
              <div className="user_select_container">
                <div
                  className="user_select"
                  style={{ justifyContent: "space-between" }}
                >
                  <div style={{ display: "flex", gap: "20px" }}>
                    {" "}
                    {isAvailable(
                      detail?.user?.firstName,
                      <div className="img">
                        {" "}
                        {detail?.user?.firstName?.slice(0, 1)}{" "}
                      </div>
                    )}
                    <div className="content">
                      {isAvailable(
                        detail?.user?.firstName || detail?.user?.lastName,
                        <p className="heading">
                          {" "}
                          {detail?.user?.firstName +
                            " " +
                            detail?.user?.lastName}{" "}
                        </p>
                      )}

                      {isAvailable(
                        detail?.user?.phone,
                        <p
                          className="faded"
                          onClick={() => setCallDialog(true)}
                        >
                          {PhoneNumberFormatter(detail?.user?.phone)}
                        </p>
                      )}

                      {isAvailable(
                        detail?.user?.email,
                        <p
                          className="faded"
                          onClick={() => setMailDialog(true)}
                        >
                          {detail?.user?.email}{" "}
                        </p>
                      )}

                      {detail?.noShow === true && (
                        <span
                          className="tags"
                          style={{
                            backgroundColor: "rgb(176, 34, 12)",
                            color: "#fff",
                            marginRight: "10px",
                          }}
                        >
                          No-Show
                        </span>
                      )}

                      {detail?.user?.noShow > 0 && (
                        <span
                          className="tags"
                          style={{
                            backgroundColor: "#D82346",
                            color: "#fff",
                            marginRight: "10px",
                            border: "1px solid #D82346",
                          }}
                        >
                          {detail?.user?.noShow} no-show
                        </span>
                      )}

                      {detail?.paymentStatus && (
                        <span className="tags"> {detail?.paymentStatus} </span>
                      )}

                      {detail?.user?.userStatus === "Block" && (
                        <span
                          className="tags ml-1"
                          style={{ background: "#576063", color: "#fff" }}
                        >
                          Blocked
                        </span>
                      )}
                    </div>
                  </div>

                  <i
                    className="fa-solid fa-ellipsis-vertical"
                    style={{ width: "40px", textAlign: "center" }}
                    onClick={() => handleShow("profileDetail", detail)}
                  ></i>
                </div>
              </div>

              <div className="date_container">
                <p> {date} </p>
              </div>
              {detail?.services?.length > 0 && (
                <>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      marginTop: "10px",
                    }}
                  >
                    Regular Service
                  </p>
                  <div className="booked_service d-flex flex-wrap gap-4">
                    {detail?.services?.map((i, index) => {
                      const formattedStartTime =
                        adjustedStartTime.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        });

                      const adjustedEndTime = new Date(
                        adjustedStartTime.getTime() + i?.totalMin * 60000
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
                        <div
                          className="service_selector"
                          key={`Service${index}`}
                          onClick={() => OpenEdit("Regular", i)}
                        >
                          <div>
                            <p className="title">
                              {i.size ? i.size : i?.serviceId?.name}
                            </p>
                            <p className="faded">
                              {`${formattedStartTime} - ${formattedEndTime}`} (
                              {i?.totalTime}){" "}
                            </p>
                            <p className="faded"> {i.teamMember} </p>
                            <p className="faded">{`$${i?.price}`}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {detail?.AddOnservicesSchema?.length > 0 && (
                <>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "700",
                      marginTop: "10px",
                    }}
                  >
                    Ad-On Service
                  </p>
                  <div className="booked_service d-flex flex-wrap gap-4">
                    {detail?.AddOnservicesSchema?.map((i, index) => {
                      const formattedStartTime =
                        adjustedStartTime.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        });

                      const adjustedEndTimeAddon = new Date(
                        adjustedStartTime.getTime() + i?.totalMin * 60000
                      );

                      const formattedEndTimeAddon =
                        adjustedEndTimeAddon.toLocaleTimeString("en-US", {
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
                        <div
                          className="service_selector"
                          key={`addOnservicesId${index}`}
                          onClick={() => OpenEdit("AdOn", i)}
                        >
                          <div>
                            <p className="title">{i.addOnservicesId?.name}</p>
                            <p className="faded">
                              {`${formattedStartTime} - ${formattedEndTimeAddon}`}{" "}
                              ({i?.totalTime}){" "}
                            </p>
                            <p className="faded"> {i.teamMember} </p>
                            <p className="faded">{`$${i?.price}`}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              <div className="add_another" onClick={() => setOpenService(true)}>
                <p>Add another service</p>
                <i className="fa-solid fa-plus"></i>
              </div>
            </>
          )}
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Notes") {
    slider = (
      <>
        {detail?.suggesstion?.length > 0 && (
          <div className="info_tab">
            {detail?.suggesstion?.map((i, index) => (
              <div className="define_notes p-0" key={`notes${index}`}>
                <View_description description={i.suggesstion} />
                <span className="d-flex gap-4">
                  <i
                    className="fa-regular fa-trash-can text-[#BF3131] cursor-pointer"
                    onClick={() => deleteSuggestion(i._id)}
                  />
                  <i
                    className="fa-solid fa-ellipsis-vertical cursor-pointer"
                    onClick={() => {
                      setNotesId(i._id);
                      set_open_notes_modal(true);
                    }}
                  ></i>
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="define_notes">
          {(detail?.suggesstion?.length === 0 || createNote === true) && (
            <form onSubmit={notesHandler} className="w-100">
              <Editor_desciption
                setDescription={setNotes}
                description={notes}
              />
              <button type="submit">
                {" "}
                {notesLoading ? <ClipLoader color="#fff" /> : "Create"}{" "}
              </button>
            </form>
          )}
          {edit === true && (
            <form onSubmit={editNotes} className="w-100">
              <Editor_desciption
                setDescription={setNotes}
                description={notes}
              />
              <button type="submit">Update</button>
            </form>
          )}{" "}
        </div>
      </>
    );
  } else if (type === "Payments") {
    const SlidingComponent = () => {
      return detail?.cardDetailSaved ? (
        <div className="card_saved">
          <div className="img_container">
            <img
              src={
                "https://img.freepik.com/free-photo/blue-credit-card-front-back-isolated_125540-651.jpg?w=1380&t=st=1706947333~exp=1706947933~hmac=49d00cd694ee8debee849bbf346270274214894c2fa3070a9bc68d57343fb980"
              }
              alt=""
            />
            <div>
              <p className="title">Confirmed with card</p>
              <p className="faded"> {SavedCardDate()} </p>
            </div>
          </div>

          <div className="main">
            <p className="title">Cancellation policy</p>
            <p className="desc">
              {" "}
              {isAvailable(
                detail?.user?.firstName || detail?.user?.lastName,
                detail?.user?.firstName + " " + detail?.user?.lastName
              )}{" "}
              agreed to your confirmation policy on {SavedCardDate()}
            </p>
            <p className="desc mt-3">
              You may charge them <strong>50% fee</strong> for late
              cancellations within <strong>48 hours</strong> of the appointment
              time , or <strong>100% fee</strong> for not showing up.{" "}
            </p>
          </div>
        </div>
      ) : detail?.sendConfirmationAppointmentWithCard === false ? (
        <div className="awaited_payment">
          <img src={img} alt="" />
          <p className="head">Confirmation not requested</p>
          <p className="faded">
            {isAvailable(
              detail?.user?.firstName || detail?.user?.lastName,
              detail?.user?.firstName + " " + detail?.user?.lastName
            )}{" "}
            was not requested to confirm with card when the appointment was
            created.
          </p>

          <button onClick={reminderHandler}>
            {reminderLoading ? <ClipLoader /> : "Ask client to confirm"}
          </button>
        </div>
      ) : (
        <div className="awaited_payment">
          <img src={img} alt="" />
          <p className="head">Awaiting confirmation</p>

          <p className="faded">
            {isAvailable(
              detail?.user?.firstName || detail?.user?.lastName,
              detail?.user?.firstName + " " + detail?.user?.lastName
            )}{" "}
            recieved a notification to confirm this appointment with a card
          </p>
          <button onClick={reminderHandler}>
            {reminderLoading ? <ClipLoader /> : "Send reminder"}
          </button>
        </div>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Forms") {
    const SlidingComponent = () => {
      return (
        <div className="awaited_payment mt-3">
          {attachments?.length > 0 ? (
            <PdfViewer data={attachments} />
          ) : (
            <>
              <img src={img1} alt="" />
              <p className="head mt-2">No forms</p>
              <p className="faded mt-0">
                Forms will appear here once appointment has been saved
              </p>
            </>
          )}
        </div>
      );
    };
    slider = <SlidingComponent />;
  }

  const selector = () => {
    orderId(id);
    setIsReschedule(!isReschedule);
    closeThisOne("detailDialog");
    handleClose();
  };

  useEffect(() => {
    if (show) {
      setType("Info");
    }
  }, [show]);

  const ContainerStyle = modalData?.isShow
    ? { backgroundColor: "rgb(176, 34, 12)" }
    : {};

  const Title = modalData?.isShow === true ? "No-Show" : "Booked";

  // Modal
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
    const realData = {
      id: data?.user?._id,
    };
    openModalById(modalId, realData);
  };

  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };

  // ----
  const serviceHandler = async (type, i, priceId) => {
    const date = `${modifiedYear}-${modifiedMonth}-${modifiedDay}`;
    if (type === "service") {
      let payload;
      if (i.multipleSize === true) {
        payload = {
          quantity: 1,
          serviceId: i._id,
          date,
          time: formattedTime,
          priceId,
        };
      } else {
        payload = {
          quantity: 1,
          serviceId: i._id,
          date,
          time: formattedTime,
        };
      }
      const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
      const additionalFunctions = [fetchBooking];
      dispatch(
        edit_module_redux({
          url: `api/v1/addServiceIOrders/${detail._id}`,
          payload,
          dispatchFunc,
          additionalFunctions,
        })
      );
    } else {
      const payload = {
        quantity: 1,
        addOnservicesId: i._id,
        date,
        time: formattedTime,
      };
      const dispatchFunc = [() => getAppointment(selectedAppointmentDate)];
      const additionalFunctions = [fetchBooking];
      dispatch(
        edit_module_redux({
          url: `api/v1/addOnservicesInOrders/${detail._id}`,
          payload,
          dispatchFunc,
          additionalFunctions,
        })
      );
    }
  };

  // const customer_checkout = () => {
  //   dispatch(checkout_customer(detail?._id, handleClose));
  // };

  return (
    <>
      <CallingModal
        show={callDialog}
        handleClose={() => setCallDialog(false)}
        phone={detail?.user?.phone}
      />
      <MailModal
        show={mailDialog}
        handleClose={() => setMailDialog(false)}
        email={detail?.user?.email}
      />
      {/* Edit Service which are already booked  */}
      <EditBookedService
        show={edit_service}
        setShow={setEditService}
        orderId={detail?._id}
        fetchCart={fetchBooking}
        type={serviceType}
        priceId={priceId}
        setPriceId={setPriceId}
        time={formattedTime}
        date={`${modifiedYear}-${modifiedMonth}-${modifiedDay}`}
      />

      {/* Add New Service */}
      <ServiceCanvas
        show={openService}
        handleClose={closeService}
        serviceHandler={serviceHandler}
        userDetail={detail?.user}
      />

      {/* To open options in checkout ellipse */}
      <DetailDialog
        show={useShow("detailDialog")}
        handleClose={() => closeThisOne("detailDialog")}
        selector={selector}
        type={setType}
        activate={inFuture}
      />

      <UserDetailCanvas
        setIsBooked={setIsBooked}
        Details={detail}
        show={useShow("userDetailCanvas")}
        handleClose={() => closeThisOne("userDetailCanvas")}
        fetchBooking={fetchBooking}
      />

      <EditNotes
        show={open_notes_modal}
        setShow={set_open_notes_modal}
        setEdit={setEdit}
        createNote={setCreatNote}
      />
      <ProfileDetail
        data={detail}
        show={useShow("profileDetail")}
        handleClose={() => closeThisOne("profileDetail")}
      />

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "100%" }}
      >
        <Offcanvas.Body style={{ padding: "0" }}>
          <div className="appointment_detail_header" style={ContainerStyle}>
            <div className="upper">
              <i className="fa-solid fa-xmark" onClick={() => handleClose()} />
            </div>
            <p> {Title} </p>
          </div>

          <div className="Appointment_Canvas Booked_Detail">
            <div className="select_container">
              <div>
                <div className="selector">
                  <Slider {...settings}>
                    {appointmentArr.map((i, index) => (
                      <div>
                        <p
                          onClick={() => setType(i)}
                          className={i === type ? "active" : ""}
                          key={`AppointmentInfo${index}`}
                        >
                          {" "}
                          {i}{" "}
                        </p>
                      </div>
                    ))}
                  </Slider>
                </div>
                {slider}
              </div>

              <div className="last_button">
                <div className="text">
                  <p>Total</p>
                  <p>
                    {" "}
                    ${detail?.total} ({detail?.timeInMin}){" "}
                  </p>
                </div>

                {detail?.paymentStatus === "paid" ? (
                  <div className="elipse_container">
                    <button style={{ padding: "10px", cursor: "auto" }}>
                      Already Paid
                    </button>
                  </div>
                ) : (
                  <div className="elipse_container">
                    <i
                      className="fa-solid fa-ellipsis-vertical"
                      onClick={() => handleShow("detailDialog")}
                    />
                    {/* <button onClick={customer_checkout}>Checkout</button> */}
                    <button>Checkout</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AppointmentDetails;
