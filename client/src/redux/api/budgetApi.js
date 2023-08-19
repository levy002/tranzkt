import axios from 'axios';

// const Base_Url = 'https://tranzakt.onrender.com/api/budget';
const Base_Url = 'http://localhost:8080/api/budget';

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

// export const postBudgetApi = async () => {
//    try {
//      const res = await axios.post(Base_Url);
//      return res.data;
//    } catch (err) {
//       console.log(err);
//    }
// };
