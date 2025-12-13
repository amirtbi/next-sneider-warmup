import { RefObject, useRef } from "react";

export interface IWindowRef {
  close: () => void;
}

export const useWindowRef = (): RefObject<IWindowRef | undefined> =>
  useRef<IWindowRef>(undefined);
