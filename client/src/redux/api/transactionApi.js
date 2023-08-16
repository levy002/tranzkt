import axios from 'axios';

const Base_Url = 'http://localhost:8080/api/transactions';

export const fetchTransactionsApi = async () => {
   try {
     const res = await axios.get(Base_Url);
     console.log('@@@@@@@@@')
     return res.data;
   } catch (err) {
      console.log(err);
   }
};

export const postTransactionApi = async (transaction) => {
    try {
        axios.post(Base_Url, transaction)
          .then((res) => res.data);
    } catch (err) {
        console.log(err)
    }
};

export const deleteTransactionApi = async (id) => {
    try {
       axios.delete(Base_Url, id)
         .then((res) => res.data)
    } catch (err) {
       console.log(err);
    }
};