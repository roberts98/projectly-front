import { useUserLinks } from "../hooks/user-link/useUserLinks.hook";

function UserLinksPage() {
  const { userLink } = useUserLinks();

  if (!userLink) return null;

  return <div>{userLink.hash}</div>;
}

export default UserLinksPage;
