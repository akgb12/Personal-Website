"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

// Keep controls inactive in server/no-JS HTML, then enable them through React.
// Mutating the DOM's disabled attribute alone does not enable React's click listener.
export function useClientReady() {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}
