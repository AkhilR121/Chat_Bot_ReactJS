import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/getData";

function ChatComponent() {
    const data = useQuery({
        queryKey: ["customer-data"],
        queryFn: () => getCustomers(),
        initialData: () => [],
    });
console.log(data.data);

    return (
        <div>
            <h2>Chat Component</h2>
            <p>This is where the chat interface will be implemented.</p>
        </div>
    );
}

export default ChatComponent;
