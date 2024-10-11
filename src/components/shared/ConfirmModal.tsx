import { Button, Modal } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface Props {
  content: string;
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({ content, show, onConfirm, onClose }: Props) {
  const { t } = useTranslation();
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>{t("general.typography.confirm")}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {content}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>{t("general.confirm")}</Button>
        <Button color="gray" onClick={onClose}>
          {t("general.cancel")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
