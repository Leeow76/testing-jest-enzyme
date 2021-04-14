// import { render, screen } from '@testing-library/react';
import { shallow } from "enzyme";
import Counter from "./Counter";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("<Counter />", () => {
  it("starts with a count of 0", () => {
    const wrapper = shallow(<Counter />);
    const countState = wrapper.state().count;
    expect(countState).toEqual(0);
  });
});
