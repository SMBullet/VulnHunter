import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { logout } from '@/State/Auth/Action';
import { DashboardIcon, HomeIcon } from '@radix-ui/react-icons';
import { HistoryIcon, LogOutIcon, ScanIcon } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className='h-6 w-6' /> },
  {
    name: "Profile",
    path: "/profile",
    icon: <DashboardIcon className="h-6 w-6" />,
  },
  {
    name: "Scanner",
    path: "/scanner",
    icon: <ScanIcon className="h-6 w-6" />,
  },
  {
    name: "Scan History",
    path: "/scan-history",
    icon: <HistoryIcon className="h-6 w-6" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogOutIcon className="h-6 w-6" />,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='mt-10 space-y-5'>
      {menu.map((item) => (
        <div key={item.name}>
          <SheetClose className='w-full'>
            <Button
              variant="outline"
              className={`flex items-center gap-5 py-6 w-full ${
                item.name === "Logout"
                  ? "text-red-600 border-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 mt-[280px]"
                  : ""
              }`}
              onClick={() => {
                navigate(item.path);
                if (item.name === "Logout") {
                  handleLogout();
                }
              }}
            >
              <span className='w-8'>{item.icon}</span>
              <p>{item.name}</p>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
