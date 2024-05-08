/** @format */

import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import Select from "react-select";

export const TextEditor = ({ label }) => {
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

// Value Returner
export const ValueChecker = (holder, string) => {
  return holder ? (
    <div className="Desc-Container">
      <p className="title"> {string} </p>
      <p className="desc"> {holder} </p>
    </div>
  ) : (
    ""
  );
};

// Debouncing
export const debouncedSetQuery = ({ term, setSearch }) => {
  clearTimeout(debouncedSetQuery.timeoutId);
  debouncedSetQuery.timeoutId = setTimeout(() => {
    setSearch(term);
  }, 500);
};

// ---
export const ReactSelect = ({ options, setValue, value, inputValue }) => {
  return (
    <Select
      value={value}
      options={options}
      onChange={(e) => setValue(e)}
      onInputChange={(input) => {
        if (inputValue) {
          inputValue(input);
        }
      }}
    />
  );
};
