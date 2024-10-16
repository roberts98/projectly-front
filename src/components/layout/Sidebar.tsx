import {
  Create,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Lock,
  LockOpen,
  Person,
  Public,
} from "@mui/icons-material";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/project/useProjects.hook";
import { SidebarLinkGroup } from "./SidebarLinkGroup";
import { useTranslation } from "react-i18next";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const { t } = useTranslation();
  const {
    projects: { personal, shared },
    areProjectsLoading,
  } = useProjects();

  const projectsMenu = [
    {
      id: "privateProjects",
      name: t("menu.privateProjects"),
      link: "#",
      icon: <Lock fontSize="small" />,
      children: personal.map((project) => ({
        id: project.id,
        name: project.name,
        link: `/projects/${project.id}`,
      })),
    },
    {
      id: "publicProjects",
      name: t("menu.publicProjects"),
      link: "#",
      icon: <Public fontSize="small" />,
      children: shared.map((project) => ({
        id: project.id,
        name: project.name,
        link: `/projects/${project.id}`,
      })),
    },
    {
      id: "createProject",
      name: t("menu.createProject"),
      link: "/projects/create",
      icon: <Create fontSize="small" />,
      children: [],
    },
  ];

  const settingsMenu = [
    {
      id: "createUserLink",
      name: t("menu.createUserLink"),
      link: "/user-links/create",
      icon: <Lock fontSize="small" />,
      children: [],
    },
    {
      id: "getUserLink",
      name: t("menu.getUserLink"),
      link: "/user-links/list",
      icon: <LockOpen fontSize="small" />,
      children: [],
    },
    {
      id: "user",
      name: t("menu.user"),
      link: "/user",
      icon: <Person fontSize="small" />,
      children: [],
    },
  ];

  const sections = [
    {
      name: t("menuSections.projects"),
      menu: projectsMenu,
      loading: areProjectsLoading,
    },
    {
      name: t("menuSections.settings"),
      menu: settingsMenu,
    },
  ];

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
          {sections.map((section) => {
            return section.loading ? (
              <div key={section.name} className="mb-4 ml-4">
                <Spinner />
              </div>
            ) : (
              <div key={section.name}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {section.name}
                </h3>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {section.menu.map((menuItem) => {
                    if (menuItem.children.length > 0) {
                      return (
                        <SidebarLinkGroup key={menuItem.id}>
                          {(handleClick, open) => {
                            return (
                              <>
                                <Link
                                  to={menuItem.link}
                                  className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleClick();
                                  }}
                                >
                                  {menuItem.icon} {menuItem.name}
                                  {open ? (
                                    <KeyboardArrowUp />
                                  ) : (
                                    <KeyboardArrowDown />
                                  )}
                                </Link>
                                <div
                                  className={`translate transform overflow-hidden ${
                                    !open && "hidden"
                                  }`}
                                >
                                  <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                    {menuItem.children.map((menuItem) => (
                                      <li key={menuItem.id}>
                                        <Link
                                          className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                          to={menuItem.link}
                                        >
                                          {menuItem.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            );
                          }}
                        </SidebarLinkGroup>
                      );
                    } else {
                      return (
                        <li key={menuItem.id}>
                          <Link
                            className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                            to={menuItem.link}
                          >
                            {menuItem.icon} {menuItem.name}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
