import UserName from './userName.tsx';
import { FaSearch } from "react-icons/fa";
import { userInfo, accountInfo, randomUserInfo, searchData } from '../store/store.ts';
import {  useRecoilState, useRecoilValue } from 'recoil';
import { userDataType, accountDataTypes, randomUserDataType, eachObjectLooks } from "../store/Types.ts";
import Popup from './Popup.tsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import {  useEffect, useState } from 'react';

const HomePage = () => {
  const userData: userDataType | null = useRecoilValue(userInfo);
  const accountData: accountDataTypes | null = useRecoilValue(accountInfo);
  const randomUserData: randomUserDataType | null = useRecoilValue(randomUserInfo);
  const [findUsername, setFindUsername] = useState("");
  const [searchDataVal, setSearchDataVal] = useRecoilState(searchData);

  

  const handleSearch = async () => {
    try {
      const res = await axios.post(
        "https://basic-payment-app-01-1.onrender.com/api/v1/users/findUser",
        { findUsername }
      );
      setSearchDataVal(res.data);
      console.log("balance data in submit function :- ", res.data.accountInfo.balance);
      if(res.data.success){
        toast.success("Successfully find the user");
        return;
      }
      else{
        console.log("Something went wrong while finding the user with this username");
        toast.error("Failed to find user with this username");
        return
      }
    } catch (error) {
      toast.error("Something went wrong, Kindly try again and make sure to enter valid username");
      console.log("Something went wring while searching:- ", error);
      return;
    } finally{
      console.log("finally");
    }
  }

  useEffect(() => {
    console.log("searchData:- ", searchDataVal);
  }, [searchDataVal, setSearchDataVal]);
  
  

  return (
    <div className="flex flex-col p-6 min-h-screen bg-gray-100">
      <Popup />
      <div className="flex mb-4 flex-col justify-center items-start">
        <h1 className="text-2xl font-bold text-gray-800">{`${
          userData ? userData.firstName : ""
        } ${userData ? userData.lastName : ""}`}</h1>
        <span className="text-gray-500 text-sm ">
          {userData ? "@" + userData.userName : ""}
        </span>
        <span className="text-gray-500 text-sm">
          Balance:- ₹{" "}
          {accountData ? Number(accountData.balance).toFixed(2) : ""}
        </span>
      </div>

      <div className="flex flex-1 gap-4 sm:flex-row flex-col">
        {/* User Info Box */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">User Info</h2>
          {randomUserData &&
            randomUserData.map((eachUser: eachObjectLooks) => {
              if (eachUser.userName == userData?.userName) return;
              return (
                <UserName
                  Fullname={`${eachUser.firstName} ${eachUser.lastName}`}
                  Username={"@" + eachUser.userName}
                  key={eachUser._id}
                  balance={Number(eachUser?.accountDets[0]?.balance.toFixed(2))}
                  to={eachUser.userName}
                  className=""
                />
              );
            })}
        </div>

        {/* Search Box */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 gap-3">
          <h2 className="text-lg font-semibold mb-4">Search</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <input
              type="text"
              value={findUsername}
              onChange={(e) => setFindUsername(e.target.value)}
              placeholder="Search username..."
              className="w-full p-2 border border-gray-300 rounded "
            />
            <button
              onClick={handleSearch}
              className="bg-purple-500 text-white px-4 py-3 rounded hover:bg-purple-600 transition duration-200 "
            >
              <FaSearch />
            </button>
          </div>
          {(searchDataVal) ? (
              <UserName
                Fullname={`${searchDataVal.userInfo.firstName} ${searchDataVal.userInfo.lastName}`}
                Username={`@${searchDataVal.userInfo.userName}`}
                key={searchDataVal.userInfo._id}
                balance={searchDataVal.accountInfo.balance}
                to={searchDataVal.userInfo.userName}
                className=""
              />
          ) : (
            <div className="text-red-700">No user Found..</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
