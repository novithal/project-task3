import Modal from "./Modal";
import Button from "./button";

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirm action",
  message = "Are you sure you want to continue?",
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="mb-6 text-sm text-slate-600">{message}</p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;