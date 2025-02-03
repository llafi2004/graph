import axios from "axios";

const GRAPHQL_URL = "https://adam-jerusalem.nd.edu/api/graphql-engine/v1/graphql";

export const fetchUserData = async (jwt) => {
  const query = `
    query {
      user {
        id
        login
      }
      transaction(where: { userId: { _eq: 1 } }) {
        type
        amount
        createdAt
      }
      progress(where: { userId: { _eq: 1 } }) {
        objectId
        grade
        createdAt
      }
    }
  `;

  try {
    const response = await axios.post(
      GRAPHQL_URL,
      { query },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    return response.data.data;
  } catch {
    throw new Error("Error fetching data.");
  }
};
