import axio from "axios";
import config from "../config/config.js";
import { User } from "../models/user.model.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchUsersBatch = async () => {
  try {
    for (let i = 0; i < config.BATCH_SIZE / config.REQUESTS_PER_SECOND; i++) {
      const requests = [];
      for (let j = 0; j < config.REQUESTS_PER_SECOND; j++) {
        requests.push(axios.get(config.API_URL, { params: { results: 100 } }));
      }
      const responses = await Promise.all(requests);
      const users = responses.flatMap((res) => res.data.results.map((user) => ({
        gender: user.gender,
        name: user.name,
        address: {
          city: user.location.city,
          state: user.location.state,
          country: user.location.country,
          street: `${user.location.street.number} ${user.location.street.name}`,
        },
        email: user.email,
        age: user.dob.age
      })));

      await User.insertMany(users);
      console.log(`${users.length} users saved.`);
      await sleep(config.SLEEP_AFTER_BATCH);
    }
} catch (error) {
  console.error('Error fetching users:', error);
}
};

module.exports = { fetchUsersBatch };