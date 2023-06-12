import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { SlEnvolope } from 'react-icons/sl';
import { RiTodoLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  function handleDashboardClick() {
    navigate('/');
  }
  function handleLandsClick() {
    navigate('/lands');
  }
  function handleProjectsClick() {
    navigate('/projects');
  }
  return (
    <div>
      <div className="h-[90vh]  w-[20vw] border-r-2 border-gray-200">
        <div className="flex flex-col text-xl  pt-5">
          <button
            className=" rounded-lg bg-transparent border-none text-left flex items-center gap-2 hover:bg-slate-200 p-5"
            onClick={handleDashboardClick}
          >
            <div>
              <AiOutlineHome />
            </div>
            <div>Dashboard</div>
          </button>
          <button
            className=" rounded-lg bg-transparent border-none text-left flex items-center gap-2  hover:bg-slate-200 p-5"
            onClick={handleLandsClick}
          >
            <div>
              <SlEnvolope />
            </div>
            <div>Lands</div>
          </button>
          <button
            className=" rounded-lg bg-transparent border-none text-left flex items-center gap-2  hover:bg-slate-200 p-5"
            onClick={handleProjectsClick}
          >
            <div>
              <RiTodoLine />
            </div>
            <div>Projects</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
