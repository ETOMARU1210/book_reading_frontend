import { atom } from "recoil";
import { recoilPersist } from"recoil-persist";

const { persistAtom } = recoilPersist({
  key: "book-message",
  storage: sessionStorage,
});

export const BookErrorState =atom({
  key: "book-message",
  default: "",
  effects_UNSTABLE: [persistAtom]
})