import { atom } from "recoil";
import { recoilPersist } from"recoil-persist";

const { persistAtom } = recoilPersist({
  key: "signup-error-message",
  storage: sessionStorage,
});

export const SignUpErrorState =atom({
  key: "error",
  default: "",
  effects_UNSTABLE: [persistAtom]
})