import QRCode from "react-qr-code";
import { useUserLinks } from "../hooks/user-link/useUserLinks.hook";

function UserLinksPage() {
  const { userLink } = useUserLinks();

  if (!userLink) return null;

  return (
    <div className="flex items-center justify-center">
      <QRCode
        size={400}
        value={`https://roberts98.github.io/projectly-front/#/user-links/process/${userLink.hash}`}
      />
    </div>
  );
}

export default UserLinksPage;
