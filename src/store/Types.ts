/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface userDataType { 
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    accountToken: string;
    createdAt: Date;
    updatedAt: Date,
    __v: number
  }

  export interface accountDataTypes {
    balance : number,
    userName: string,
    __v: number,
    _id: string
  }

  export interface foundDataType {
    message: string,
    success: boolean,
    userInfo: userDataType,
    accountInfo: accountDataTypes
  }

  interface accountObjectLooks {
    _id: string;
    userName: string;
    balance: number;
    __v: number
  }

 export interface eachObjectLooks {
   _id: string;
   userName: string;
   firstName: string;
   lastName: string;
   password: string;
   accountToken: string;
   createdAt: Date;
   updatedAt: Date;
   __v: number;
   accountDets: accountObjectLooks[]
 }

 export interface randomUserDataType extends Array<eachObjectLooks>{}

export interface neededDataType {
  sendTo : string,
  sendFrom: string | null,
  amount: string
}