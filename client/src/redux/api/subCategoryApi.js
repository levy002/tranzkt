import axios from 'axios';

// const Base_Url = 'https://tranzakt.onrender.com/api/subCategories';
const Base_Url = 'http://localhost:8080/api/subCategories';

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
