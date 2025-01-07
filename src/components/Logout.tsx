import { useNavigate } from 'react-router-dom';
import { dataAtom } from '../store/store';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import axios from 'axios';

const Logout = () => {
    const setData = useSetRecoilState(dataAtom);
    const router = useNavigate();
    useEffect(() => {
        handleLogout();
    });

    const handleLogout = async () => {
     try {
        const response = await axios.post(
          "https://basic-payment-app-01-1.onrender.com/api/v1/users/logout"
        );
        return response.data;
     } catch (error) {
        console.log("error loggin out the user!!", error);
        return;
     }
    }
    
     useEffect(() => {
       setTimeout(() => {
         setData(false);
         router("/");
       }, 2000);
     }, [])
     
    
  return (
    <div className='w-full h-[100vh] flex items-center justify-center text-2xl '>
      You are logged out successfully!
    </div>
  )
}

export default Logout
