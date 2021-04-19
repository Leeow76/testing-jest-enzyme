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

const secondDummyUser = {
  id: 2,
  name: "Anthony Rodgers",
  website: "https://neti.ee",
};

const mockFetchUserResponse = (user) =>
  // Sets up a fake function from another module/file. Uses mockImplementation to imitate a return value. If the function (fetchUser) would have been called, this is mocked instead.
  jest.spyOn(api, "fetchUser").mockImplementation(() => {
    return Promise.resolve(user);
  });

describe("<User />", () => {
  it("shows loading text before data has been fetched", () => {
    mockFetchUserResponse(dummyUser);
    const wrapper = shallow(<User id={1} />);
    expect(wrapper.find("p").text()).toEqual("Loading ...");
  });

  it("shows the data once has been fetched", async () => {
    mockFetchUserResponse(dummyUser);
    const wrapper = shallow(<User id={1} />);

    // Wait until next tick ('it' function therefore must be async)
    await nextTick();
    wrapper.update();
    expect(wrapper.find("h4").text()).toEqual(dummyUser.name);
    expect(wrapper.find("p").text()).toContain(dummyUser.website);
  });

  it("makes a new http request when id prop changes", async () => {
    jest
      .spyOn(api, "fetchUser")
      .mockImplementationOnce(() => {
        return Promise.resolve(dummyUser);
      })
      .mockImplementationOnce(() => {
        return Promise.resolve(secondDummyUser);
      });
    const wrapper = shallow(<User id={1} />);
    // Optional - checks if fetchUser (mocked as the first mockImplementationOnce) was called with id 1. Is called by componentDidMount.
    expect(api.fetchUser).toHaveBeenCalledWith(1);
    // Sets props id to 2 triggering componentDidUpdate and the 2nd mockImplementationOnce call that will resolve with secondDummyUser
    wrapper.setProps({ id: 2 });
    await nextTick();
    wrapper.update();
    expect(wrapper.find("h4").text()).toEqual(secondDummyUser.name);
    expect(wrapper.find("p").text()).toContain(secondDummyUser.website);
  });
});
