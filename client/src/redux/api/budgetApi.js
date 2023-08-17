import axios from 'axios';

const Base_Url = 'http://localhost:8080/api/budget';

export const fetchBudgetApi = async () => {
   try {
     const res = await axios.get(Base_Url);
     return res.data;
   } catch (err) {
      console.log(err);
   }
};

export const postBudgetApi = async (budget) => {
    try {
        axios.post(Base_Url, budget)
          .then((res) => res.data);
    } catch (err) {
        console.log(err)
    }
};
