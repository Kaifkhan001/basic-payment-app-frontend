/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { atom, selector} from 'recoil';
import { accountDataTypes, foundDataType, randomUserDataType, userDataType } from './Types';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const fetchData = selector({
    key: "fetchData",
    get: async() => {
        try {
            const response = await axios.get(
              "https://basic-payment-app-01-1.onrender.com/api/v1/users/userAuth"
            );
        console.log("store value:- ", response.data)
        return response.data.success;
        } catch (error: any) {
            console.log("Error fetching user data to make sure is it logged in or not", error);
            return false;
        }
    }
});

export const dataAtom = atom({
  key: "dataAtom",
  default: fetchData,
  effects_UNSTABLE: [persistAtom],
});

export const userInfo = atom<userDataType | null>({
  key: "userInfo",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const accountInfo = atom<accountDataTypes | null>({
  key: "accountInfo",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const randomUserInfo = atom<randomUserDataType | null>({
  key: "randomUserInfo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const popupOpen = atom({
  key: "isPopupOpen",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const sendTo = atom({
  key: "sendTo",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const isProcessing = atom({
  key: "isProcessing",
  default: false,
  effects_UNSTABLE: [persistAtom]
});

export const searchData = atom<foundDataType | null>({
  key: "searchData",
  default: null
});