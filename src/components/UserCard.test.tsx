import { fireEvent, render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import UserCard from "./UserCard";

const mockUser = {
  id: { value: "1" },
  name: { first: "John", last: "Doe" },
  picture: {
    large: "https://example.com/image.jpg",
    medium: "https://example.com/image-medium.jpg",
    thumbnail: "https://example.com/image-thumbnail.jpg",
  },
  gender: "male",
  email: "john@example.com",
  phone: "1234567890",
  location: { city: "New York", country: "USA" },
};

describe("UserCard", () => {
  it("renders user information", () => {
    const onShowDetails = jest.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <UserCard user={mockUser} onShowDetails={onShowDetails} />
      </I18nextProvider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
    expect(
      screen.getByRole("button", { name: /show details/i })
    ).toBeInTheDocument();
  });

  it("calls onShowDetails when button is clicked", () => {
    const onShowDetails = jest.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <UserCard user={mockUser} onShowDetails={onShowDetails} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /show details/i }));
    expect(onShowDetails).toHaveBeenCalledTimes(1);
  });
});
