import { ReactNode, useState } from "react";

interface Props {
  children: (handleClick: () => void, open: boolean) => ReactNode;
}

export function SidebarLinkGroup({ children }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
}
