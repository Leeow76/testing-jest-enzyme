import React from "react";
import { shallow } from "enzyme";
import User from "./User";
import * as api from "./api";

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

const mockFetchUserResponse = (user) =>
  jest.spyOn(api, "fetchUser").mockImplementation(() => {
    return Promise.resolve(user);
  });

describe("<User />", () => {
  it("shows loading text before data has been fetched", () => {
    mockFetchUserResponse(dummyUser);
    const wrapper = shallow(<User id="1" />);
    expect(wrapper.find("p").text()).toEqual("Loading ...");
  });

  it("shows the data once has been fetched", async () => {
    mockFetchUserResponse(dummyUser);
    const wrapper = shallow(<User id="1" />);

    // Wait until next tick ('it' function therefore must be async)
    await nextTick();
    wrapper.update();
    expect(wrapper.find("h4").text()).toEqual(dummyUser.name);
    expect(wrapper.find("p").text()).toContain(dummyUser.website);
  });
});
