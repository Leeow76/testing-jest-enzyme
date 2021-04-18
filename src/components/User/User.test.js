import React from "react";
import { shallow } from "enzyme";
import User from "./User";
import fetchMock from "fetch-mock";

// Queues code that runs after all other pending async work
const nextTick = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};

const dummyUser = {
  id: 1,
  name: "James Smith",
  website: "https://leeow-portfolio.herokuapp.com",
};

// Only mock it once if possible with .getOnce()
const mockUrlWithUser = (user) =>
  fetchMock.getOnce(
    url,
    {
      status: 200,
      body: user,
    },
    { overwriteRoutes: false }
  );

const url = "https://jsonplaceholder.typicode.com/users/1";

describe("<User />", () => {
  it("shows loading text before data has been fetched", () => {
    mockUrlWithUser(dummyUser);
    const wrapper = shallow(<User id="1" />);
    expect(wrapper.find("p").text()).toEqual("Loading ...");
  });

  it("shows the data once has been fetched", async () => {
    mockUrlWithUser(dummyUser);
    const wrapper = shallow(<User id="1" />);

    // Wait until next tick ('it' function therefore must be async)
    await nextTick();
    wrapper.update();
    expect(wrapper.find("h4").text()).toEqual(dummyUser.name);
    expect(wrapper.find("p").text()).toContain(dummyUser.website);
  });
});
