import { useState } from "react";

export default function useDeleteModal() {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const open = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  const close = () => {
    setShow(false);
    setSelectedItem(null);
  };

  return { show, selectedItem, open, close };
}
