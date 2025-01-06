import  { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  accountInfo,
  popupOpen,
  userInfo,
  randomUserInfo,
  searchData,
} from "../store/store.ts";
import { sendTo } from '../store/store.ts';
import axios from 'axios';
import toast from 'react-hot-toast';
import { isProcessing } from '../store/store.ts';
import { accountDataTypes, eachObjectLooks, foundDataType } from '../store/Types.ts';

const Popup = () => {
  const [popupOpenVal, setPopupOpenVal] = useRecoilState(popupOpen);
  const sendToVal = useRecoilValue(sendTo);
  const userInfoVal = useRecoilValue(userInfo);
  const [isProcessingVal, setIsProcessing] = useRecoilState(isProcessing);
  const updateAccountInfo = useSetRecoilState(accountInfo);
   const  setRandomUserInfo = useSetRecoilState(randomUserInfo);
   const setSearchDataVal = useSetRecoilState(searchData);
  const [neededData, setNeededData]  = useState({
    sendTo: "",
    sendFrom: "",
    amount: "",
  });
  useEffect(() => {
    setIsProcessing(false);
    if(userInfoVal)
        setNeededData({ ...neededData, sendFrom: userInfoVal?.userName });
   }, [sendToVal, userInfoVal]);
  
  
  const handleClickToSend = async() => {
    setIsProcessing(true);
      try {
         const response = await axios.post('/api/v1/users/transferMoney',{sendTo: sendToVal, sendFrom: neededData.sendFrom, amount: neededData.amount} );
         if(response.data.success){
            toast.success("You have successfully sent the money");
            const updateAccount = response.data.sendFromUser[0].balance;
             updateAccountInfo((prevVal: accountDataTypes | null) =>
               prevVal ? { ...prevVal, balance: Number(updateAccount) } : null
             );
            const balance = response.data.sendToUser[0].balance;
            updateReceiver(balance);
            setSearchDataVal((prevVal: foundDataType | null) => {
              if (!prevVal) return null;
              return {
                ...prevVal,
                accountInfo: {
                  ...prevVal.accountInfo,
                  balance: response.data.sendToUser[0].balance,
                },
              };
            });
         }else{
            toast.error("error sending money");
            console.log("something went wrong while sending the money to ouy friend");
        }
    } catch (error) {
        toast.error("error sending money");
        console.log("Error sending money to your friend, kindly try again!!", error);
    } finally{
        setNeededData({...neededData, amount: ""})
        setPopupOpenVal(false);
        setPopupOpenVal(false);
        setIsProcessing(false);
    }
  }

  const updateReceiver = (balance: number) => {
    if (!setRandomUserInfo) return;

    setRandomUserInfo((prevValue) => {
      if (!prevValue) return null; // Handle null case for safety

      return prevValue.map((eachItem: eachObjectLooks) =>
        eachItem.userName === sendToVal
          ? {
              ...eachItem,
              accountDets: [
                {
                  ...eachItem.accountDets[0], // Access the first object
                  balance: Number(balance), // Update the balance
                },
              ],
            }
          : eachItem
      );
    });
  };

  return (
    <div
      className={`popup absolute w-full h-[100vh] bg-white bg-opacity-60 items-start justify-center ${
        popupOpenVal ? "flex" : "hidden"
      }`}
    >
      <div className="popupBox overflow-hidden relative mt-20 w-[80%] h-auto sm:w-[30%] sm:h-auto bg-[#ADA0A6] rounded-xl border-2 border-black mr-6 flex items-center px-4 pt-10 justify-start flex-col gap-6">
        {isProcessingVal && (
          <div className="flex absolute items-center bg-opacity-50 top-0 justify-center w-full h-full bg-gray-100">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        <h2 className="text-2xl font-bold text-center">
          Enter the details to send money:-{" "}
        </h2>
        <p className=" text-start  ">
          This action cannot be undone. This will permanently send the money to
          the reciever account!!.
        </p>
        <input
          autoFocus
          type="text"
          placeholder="Enter Amount"
          className="w-full  px-2 py-1 rounded-md "
          value={neededData.amount}
          onChange={(e) =>
            setNeededData({ ...neededData, amount: e.target.value })
          }
        />
        <button
          onClick={handleClickToSend}
          className="w-full bg-black text-white text-xl py-2 rounded-lg hover:bg-gray-900"
        >
          Send
        </button>
        <button
          onClick={() => setPopupOpenVal(false)}
          className="hover:bg=[#999195] w-full rounded-lg text-xl py-2 mb-8"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Popup
