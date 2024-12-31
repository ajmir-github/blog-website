import { useState } from "react";

export default function useToggle(initalState: boolean = false) {
  const [state, setState] = useState(initalState);
  return [
    state,
    {
      open() {
        setState(true);
      },
      close() {
        setState(false);
      },
      toggle() {
        setState((state) => !state);
      },
    },
  ] as const;
}
