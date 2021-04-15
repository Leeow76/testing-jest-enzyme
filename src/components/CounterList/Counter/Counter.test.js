// import { render, screen } from '@testing-library/react';
import { shallow } from "enzyme";
import Counter from "./Counter";

import renderer from "react-test-renderer";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("<Counter />", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<Counter />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("starts with a count of 0", () => {
    const wrapper = shallow(<Counter />);
    const countState = wrapper.state().count;
    expect(countState).toEqual(0);
  });

  it("can incremnent the count when button is clicked", () => {
    const wrapper = shallow(<Counter />);
    const incrementBtn = wrapper.find("button.increment");
    incrementBtn.simulate("click");
    const text = wrapper.find("p").text();
    expect(text).toEqual("Current count: 1");
  });

  it("can decrement the count when button is clicked", () => {
    const wrapper = shallow(<Counter />);
    const incrementBtn = wrapper.find("button.decrement");
    incrementBtn.simulate("click");
    const text = wrapper.find("p").text();
    expect(text).toEqual("Current count: -1");
  });
});
