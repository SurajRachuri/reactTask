import { useState } from "react";
import Modal from "./Model";

function ModalUsage() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Delete Item"
        footer={
          <>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button style={{ marginLeft: "10px" }}>Confirm</button>
          </>
        }
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </div>
  );
}

export default ModalUsage;
