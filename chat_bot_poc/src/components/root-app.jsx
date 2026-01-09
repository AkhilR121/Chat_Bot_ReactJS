import { Outlet } from 'react-router-dom';

export default function RootComponent() {
  return (
    <div className="root-app-container">
      <Outlet />
    </div>
  );
}