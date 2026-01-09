import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/getData";

function renderNestedValue(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return (
      <ul className="ml-4 list-disc">
        {Object.entries(value).map(([childKey, childValue]) => (
          <li key={childKey}>
            <span className="font-semibold">{childKey}:</span>{" "}
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

function KeyValueCard({ label, value }) {
  const isObject = value && typeof value === "object" && !Array.isArray(value);

  if (!isObject) {
    return (
      <div className="border-2 border-blue-500 p-4 m-4 rounded-md">
        <p>
          {label}: {value == null ? "---" : String(value)}
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-500 p-4 m-4 rounded-md">
      <h3 className="font-semibold mb-2">{label}</h3>
      {renderNestedValue(value)}
    </div>
  );
}

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
            <KeyValueCard key={key} label={key} value={value} />
          ))}
        </div>
      ))}
    </>
  );
}

export default ChatComponent;
{
  /* <span className="icon">down/up</span> */
}
