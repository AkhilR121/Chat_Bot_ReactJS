import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/getData";
import { useState } from "react";

function ChatComponent() {
  const { data: customers = [] } = useQuery({
    queryKey: ["customer-data"],
    queryFn: getCustomers,
  });

  return (
    <>
      {customers.map((customer, i) => (
        <div key={i} className="flex flex-col text-left w-xl">
          {Object.entries(customer).map(([key, value]) => (
            <KeyValueCard key={key} keyLabel={key} value={value} />
          ))}
        </div>
      ))}
    </>
  );
}

function KeyValueCard({ keyLabel, value }) {
  const [toggle, setToggle] = useState(false);
  const [nestedToggle, setNestedObjToggle] = useState(false);

  const isObject = value && typeof value === "object" && !Array.isArray(value);

  if (!isObject) {
    return (
      <div className="border-2 border-blue-500 p-4 m-4 rounded-md">
        <p>
          {keyLabel}: {value == null ? "---" : String(value)}
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-500 p-4 m-4 rounded-md">
      <div className="flex gap-3">
        <h3 className="font-semibold mb-2">{keyLabel}</h3>
        {/* If there is nested object: chevron will render conditionally */}
        <span
          className={`fa ${
            toggle ? "fa-angle-up" : "fa-angle-down"
          } cursor-pointer text-4xl`}
          style={{ fontSize: "26px" }}
          onClick={() => setToggle(!toggle)}
        ></span>
      </div>
      {toggle && renderNestedValue(value, nestedToggle, setNestedObjToggle)}
    </div>
  );
}

function renderNestedValue(value, nestedToggle, setNestedObjToggle) {

  if (value && typeof value === "object" && !Array.isArray(value)) {
    return (
      <ul className="ml-4 list-disc">
        {Object.entries(value).map(([childKey, childValue]) => (
          <li key={childKey}>
            <span className="font-semibold">{childKey}:</span>
            {childValue &&
            typeof childValue === "object" &&
            !Array.isArray(childValue)
              ? renderNestedValue(childValue)
              : childValue == null
              ? "---"
              : String(childValue)}
          </li>
        ))}
      </ul>
    );
  }

  return value == null ? "---" : String(value);
}

export default ChatComponent;
