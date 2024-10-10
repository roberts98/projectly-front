import { Button, Modal } from "flowbite-react";

interface Props {
  content: string;
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({ content, show, onConfirm, onClose }: Props) {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Potwierdź akcję</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {content}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm}>Potwierdź</Button>
        <Button color="gray" onClick={onClose}>
          Odrzuć
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
