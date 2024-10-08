import { Label } from "flowbite-react";
import { ReactNode } from "react";

interface Props {
  id: string;
  label: string;
  children: ReactNode;
}

function FormGroup({ id, label, children }: Props) {
  return (
    <div className="mb-4">
      <div className="mb-2">
        <Label htmlFor={id} value={label} />
      </div>
      {children}
    </div>
  );
}

export default FormGroup;
