/** @format */

import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";

export const PhoneNumberFormatter = (value) => {
  const number = value?.replace(/\D/g, "");
  const countryCode = number?.slice(0, 1);
  const bracketCode = number?.slice(1, 4);
  const another = number?.slice(4, 7);
  const remaining = number?.slice(7);
  return `+${countryCode}(${bracketCode})${another}-${remaining}`;
};

export const copyText = ({ textToCopy, setCopied }) => {
  navigator.clipboard.writeText(textToCopy);
  setCopied(true)
  setTimeout(() => {
    setCopied(false);
  }, 1000);
};

//  01:00 PM , 26 March Date formation like this or MM/DD/YYYY
export const formatInHour = ({ date, setMonth, setHour, setDay }) => {
  const start = new Date(date);
  const dayFormated = start?.getDate();
  const dayInNum = dayFormated < 10 ? `0${dayFormated}` : dayFormated;
  const startingTime = start?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const month = start?.toLocaleDateString("en-US", {
    month: "long",
  });
  setMonth(month);
  setHour(startingTime);
  setDay(dayInNum);
};

// MM/DD/YYYY
export const inMonthFomat = (date) => {
  const originalDate = new Date(date);
  const timezoneOffset = originalDate?.getTimezoneOffset();
  const adjustedTime = new Date(
    originalDate?.getTime() + timezoneOffset * 60000
  );
  const year = adjustedTime?.getFullYear();
  const month = adjustedTime?.getMonth() + 1;
  const day = adjustedTime?.getDate();

  return `${month < 10 ? `0${month}` : month}/${
    day < 10 ? `0${day}` : day
  }/${year}`;
};

// Min // Time // Hour
const TimeFormatter = ({ value, setTime, setMin }) => {
  setTime(value);
  const hoursAndMinutesMatch = value.match(/(\d+)\s*hr(?:\s*(\d*)\s*min)?/);
  const onlyHoursMatch = value.match(/(\d+)\s*hr/);
  const onlyMinutesMatch = value.match(/(\d+)\s*min/);
  if (hoursAndMinutesMatch) {
    const hours = parseInt(hoursAndMinutesMatch[1]) || 0;
    const minutes = parseInt(hoursAndMinutesMatch[2]) || 0;
    setMin(hours * 60 + minutes);
  } else if (onlyHoursMatch) {
    console.log("On Hours");
    const hours = parseInt(onlyHoursMatch[1]) || 0;
    setMin(hours * 60);
  } else if (onlyMinutesMatch) {
    const minutes = parseInt(onlyMinutesMatch[1]) || 0;
    setMin(minutes);
  } else {
    console.error("Invalid input format.");
  }
};

// Text Editor

export const TextEditor = ({ setDescription, description, label }) => {
  return (
    <Form.Group className="mb-3 quill-container">
      <Form.Label> {label} </Form.Label>
      <ReactQuill
        // value={description}
        // onChange={(value) => setDescription(value)}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
        ]}
      />
    </Form.Group>
  );
};


export { TimeFormatter };
