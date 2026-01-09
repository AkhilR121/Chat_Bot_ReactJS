import { Outlet } from 'react-router-dom';

export default function RootComponent() {
  return (
    <div className="root-app-container w-screen h-screen">
      <Outlet />
    </div>
  );
}