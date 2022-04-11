import { useState } from "react";

export const useToggle = () => {
  const [active, setActive] = useState(false);
  const toggle = () => setActive((p) => !p);

  return {
    active,
    toggle,
    setActive
  };
};
