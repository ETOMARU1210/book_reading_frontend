import { atom } from "recoil";
import { recoilPersist } from"recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage,
});

export const ErrorState =atom({
  key: "error",
  default: "",
  effects_UNSTABLE: [persistAtom]
})