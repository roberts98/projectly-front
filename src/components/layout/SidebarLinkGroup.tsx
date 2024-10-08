import { ReactNode, useState } from "react";

interface Props {
  children: (handleClick: () => void, open: boolean) => ReactNode;
}

function SidebarLinkGroup({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
}

export default SidebarLinkGroup;
