import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/getData";

function ChatComponent() {
  const { data: customers = [] } = useQuery({
    queryKey: ["customer-data"],
    queryFn: getCustomers,
  });

  return (
    <>
      {customers.map((customer, i) => (
        <div key={i}>
          {Object.entries(customer).map(([key, value]) => (
            <div
              key={key}
              className="border-2 border-blue-500 p-4 rounded-md"
            >
              <p>
                {key}: {value ? String(value) : "---"}
              </p>
            </div>
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
