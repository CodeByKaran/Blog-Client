import { create } from "zustand";

const useStore = create((set) => ({
  x_csrf_token: null,
  setCsrfToken: (token: string) => set({ x_csrf_token: token }),
}));

export default useStore;
