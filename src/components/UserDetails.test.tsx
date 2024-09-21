import { fireEvent, render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import UserDetails from "./UserDetails";

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

describe("UserDetails", () => {
  it("renders user details", () => {
    const onClose = jest.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <UserDetails user={mockUser} open={true} onClose={onClose} />
      </I18nextProvider>
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
    expect(screen.getByText(/New York, USA/i)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <UserDetails user={mockUser} open={true} onClose={onClose} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render when open is false", () => {
    const onClose = jest.fn();

    render(
      <I18nextProvider i18n={i18n}>
        <UserDetails user={mockUser} open={false} onClose={onClose} />
      </I18nextProvider>
    );

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
