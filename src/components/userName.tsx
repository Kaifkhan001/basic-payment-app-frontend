import { useRecoilState,  useSetRecoilState } from 'recoil'
import { popupOpen } from '../store/store'
import { sendTo } from '../store/store'

interface userType {
    Fullname: string,
    Username: string,
    balance: number,
    to: string,
    className: string
}

const UserName = ({Fullname, Username, balance, to, className=""}: userType) => {
  const [popupOpenVal,setPopupOpen] = useRecoilState(popupOpen);
  const setSendToVal = useSetRecoilState(sendTo);
  const handleClick = (to: string) => {
    setPopupOpen(!popupOpenVal);
    setSendToVal(to);
  }
  return (
    <div className={`flex justify-between items-center border-b pb-2 mb-2 `}>
      <div className="flex flex-col ">
        <span className="text-gray-700 text-xl">{Fullname}</span>
        <span className="text-gray-700 text-[10px]">{Username}</span>
        <span className="bg-[#CCE6F4] px-2  rounded-r-md text-sm">
          Balance:- ₹ {balance.toFixed(2)}
        </span>
      </div>
      <button
        onClick={() => handleClick(to)}
        className={`bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 transition duration-200 ${className}`}
      >
        Send
      </button>
    </div>
  );
}

export default UserName
