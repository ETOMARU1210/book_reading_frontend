import { atom } from "recoil";
import { recoilPersist } from"recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user-state",
  storage: sessionStorage,
});

export const UserState =atom({
  key: "user",
  default: {},
  effects_UNSTABLE: [persistAtom]
})