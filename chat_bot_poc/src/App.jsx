import './App.css';
import ChatComponent from './components/Chat';
import { RouterProvider, createHashRouter, Navigate } from "react-router-dom";
import RootComponent from './components/root-app';

const router = createHashRouter([
  {
    Component: RootComponent,
    children: [
      {
        path: "/",
        element: <Navigate to={"/chat"} />
      },
      {
        path: "/chat",
        Component: ChatComponent
      }
    ]
  }
]);

export const App = () => {
  return <RouterProvider router={router} />;
}

export default App;