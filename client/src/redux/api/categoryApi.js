import axios from 'axios';

const Base_Url = 'https://tranzakt.onrender.com/api/categories';

export const fetchCategoriesApi = async () => {
   try {
     const res = await axios.get(Base_Url);
     return res.data;
   } catch (err) {
      console.log(err);
   }
};

export const postCategoryApi = async (category) => {
    try {
        const res = await axios.post(Base_Url, category);
        return res.data;
    } catch (err) {
        console.log(err)
    }
};
