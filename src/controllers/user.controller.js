import { User } from "../models/user.model.js";

const getUsers = async (req, res) => {
    try {
      const { limit = 10, page = 1, sort = 'createdAt', search = '{}' } = req.query;
      const searchObject = JSON.parse(search);
  
      const query = {};
      Object.keys(searchObject).forEach((key) => {
        query[key] = { $regex: searchObject[key], $options: 'i' };
      });
  
      const total = await User.countDocuments(query);
      const users = await User.find(query)
        .sort({ [sort]: 1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      res.json({
        total,
        limit: Number(limit),
        page: Number(page),
        sortBy: sort,
        items: users,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };
  
  export { getUsers };
  