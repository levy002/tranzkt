import axios from 'axios';
import env from 'react-dotenv';

const Base_Url = `${env.BASE_URL}/api/transactions`;

export const fetchTransactionsApi = async () => {
   try {
     const res = await axios.get(Base_Url);
     return res.data;
   } catch (err) {
      console.log(err);
   }
};

export const postTransactionApi = async (transaction) => {
    try {
        const res = await axios.post(Base_Url, transaction);
        return res.data;
    } catch (err) {
        console.log(err)
    }
};

export const deleteTransactionApi = async (id) => {
    try {
       const res = await axios.delete(`${Base_Url}/${id}`);
       return res.data;
    } catch (err) {
       console.log(err);
    }
};