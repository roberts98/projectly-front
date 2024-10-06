import { useUserLinks } from "../hooks/user-link/useUserLinks.hook";
import QRCode from "react-qr-code";

function UserLinksPage() {
  const { userLink } = useUserLinks();

  if (!userLink) return null;

  return (
    <QRCode
      value={`https://roberts98.github.io/projectly-front/#/user-links/process/${userLink.hash}`}
    />
  );
}

export default UserLinksPage;
