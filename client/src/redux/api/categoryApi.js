import axios from 'axios';
import env from 'react-dotenv';

const Base_Url = `${env.BASE_URL}/api/categories`;

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
