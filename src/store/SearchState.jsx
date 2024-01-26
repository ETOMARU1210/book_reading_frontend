import { atom } from "recoil";

export const SearchState =atom({
  key: "books",
  default: [{id : -1}]
})