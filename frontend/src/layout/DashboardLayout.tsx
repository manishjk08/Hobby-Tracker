import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";

const DashboardLayout = () => {
  const location = useLocation();
    const navigate=useNavigate()
    
  const tabs = [
    {
      id: "dashboard",
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "habits",
      name: "Habits",
      path: "/habits",
    },
  ];
  const handleLogout=()=>{
    navigate('/landing')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  }
  return (
    <div className="min-h-screen bg-[#fafafa] flex text-black">

      <aside className="w-64 fixed left-0 top-0 h-full bg-white border-r border-gray-200">
        <div className="h-full flex flex-col px-5 py-6">

          
          <div className="mb-10">
            <h1 className="text-sm font-semibold tracking-tight">
              HabitFlow
            </h1>

            <p className="text-[11px] text-gray-500 mt-1">
              Personal habit tracker
            </p>
          </div>

          
          <nav className="flex flex-col gap-1 flex-1">
            {tabs.map((tab) => {
              const active = location.pathname === tab.path;

              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                    active
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          
          <div className="pt-5 border-t border-gray-200">
            <button onClick={handleLogout} className="w-full text-xs font-medium border border-gray-300 rounded-md py-2 hover:bg-black hover:text-white hover:border-black transition-all">
              Logout
            </button>
          </div>

        </div>
      </aside>

      
      <main className="ml-64 flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;