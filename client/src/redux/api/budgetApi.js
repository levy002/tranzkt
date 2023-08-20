import axios from 'axios';
import env from 'react-dotenv';

const Base_Url = `${env.BASE_URL}/api/budget`;

console.log(env.BASE_URL, '^^^^^^^^^^^')

export const fetchBudgetApi = async () => {
   try {
     const res = await axios.get(Base_Url);
     return res.data;
   } catch (err) {
      console.log(err);
   }
};

export const updateBudgetApi = async (budget, id) => {
    try {
       const res = await axios.put(`${Base_Url}/${id}`, budget);
       return res.data;
    } catch (err) {
        console.log(err)
        throw err;
    }
};
