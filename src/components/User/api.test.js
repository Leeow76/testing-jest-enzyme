import { fetchUser } from "./api";

import fetchMock from "fetch-mock";

const dummyUser = {
  id: 1,
  name: "James Smith",
  website: "https://leeow-portfolio.herokuapp.com",
};

describe("fetchUser", () => {
  it("fetches the user", async () => {
    const url = "https://jsonplaceholder.typicode.com/users/1";

    fetchMock.getOnce(url, dummyUser);

    // const response = await fetchUser(1);
    // expect(response).toEqual(dummyUser);
    // OR
    await expect(fetchUser(1)).resolves.toEqual(dummyUser);
  });
});
