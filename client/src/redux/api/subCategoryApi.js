import axios from 'axios';

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
        axios.post(Base_Url, subCategory)
          .then((res) => res.data);
    } catch (err) {
        console.log(err)
    }
};
