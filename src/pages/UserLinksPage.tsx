import QRCode from "react-qr-code";
import { useUserLink } from "../hooks/user-link/useUserLinks.hook";

function UserLinksPage() {
  const { userLink } = useUserLink();

  if (!userLink) return null;

  return (
    <div className="max-w-3xl m-auto">
      <h1 className="mb-10 text-3xl text-center">
        Twój indywidualny kod dostępu
      </h1>
      <div className="flex justify-center">
        <QRCode
          size={400}
          value={`https://roberts98.github.io/projectly-front/#/user-links/process/${userLink.hash}`}
        />
      </div>
    </div>
  );
}

export default UserLinksPage;
