import axios from 'axios';
import env from 'react-dotenv';

const Base_Url = `${env.BASE_URL}/api/subCategories`;

export const fetchSubCategoriesApi = async () => {
   try {
     const res = await axios.get(Base_Url);
     return res.data;
   } catch (err) {
      console.log(err);
   }
};

export const postSubCategoryApi = async (subCategory) => {
    try {
        const res = await axios.post(Base_Url, subCategory)
        return res.data;
    } catch (err) {
        console.log(err)
    }
};
