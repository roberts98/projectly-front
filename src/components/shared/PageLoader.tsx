import { Spinner } from "flowbite-react";
import { ReactNode } from "react";

interface Props {
  active: boolean;
  children: ReactNode;
}

export function PageLoader({ active, children }: Props) {
  if (active) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else {
    return children;
  }
}
