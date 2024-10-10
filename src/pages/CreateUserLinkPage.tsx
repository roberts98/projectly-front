import { useNavigate } from "react-router-dom";
import { UserLinkForm } from "../components/user-link/UserLinkForm";
import { useUserLink } from "../hooks/user-link/useUserLinks.hook";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function CreateUserLinkPage() {
  const { userLink } = useUserLink();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLink) {
      navigate("/user-links/list");
      toast("Posiadasz już link dostępu", { type: "info" });
    }
  }, [userLink, navigate]);

  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">
        Stwórz indywidualny link dostępu
      </h1>
      <UserLinkForm />
    </div>
  );
}
