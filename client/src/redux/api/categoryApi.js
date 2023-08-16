import axios from 'axios';

const Base_Url = 'http://localhost:8080/api/categories';

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
        axios.post(Base_Url, category)
          .then((res) => res.data);
    } catch (err) {
        console.log(err)
    }
};
