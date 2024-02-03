import { atom } from "recoil";
import { recoilPersist } from"recoil-persist";

const { persistAtom } = recoilPersist({
  key: "login-message",
  storage: sessionStorage,
});

export const LoginErrorState =atom({
  key: "login-message",
  default: "",
  effects_UNSTABLE: [persistAtom]
})