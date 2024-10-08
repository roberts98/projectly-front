import {
  Create,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Lock,
  LockOpen,
  Public,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/project/useProjects.hook";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const {
    projects: { personal, shared },
  } = useProjects();

  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link to="/">Projectly</Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              Projekty
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to="#"
                        className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <Lock fontSize="small" /> Prywatne projekty
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {personal.map((project) => (
                            <li key={project.id}>
                              <Link
                                className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                to={`/projects/${project.id}`}
                              >
                                {project.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <>
                      <Link
                        to="#"
                        className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                        }}
                      >
                        <Public fontSize="small" /> Publiczne projekty
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          {shared.map((project) => (
                            <li key={project.id}>
                              <Link
                                className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                to={`/projects/${project.id}`}
                              >
                                {project.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
              <li>
                <Link
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                  to="/projects/create"
                >
                  <Create fontSize="small" /> Dodaj projekt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              Ustawienia
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <Link
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                  to="/user-links/create"
                >
                  <Lock fontSize="small" /> Dodaj link dostępu
                </Link>
              </li>
              <li>
                <Link
                  className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                  to="/user-links/list"
                >
                  <LockOpen fontSize="small" /> Twój link dostepu
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
