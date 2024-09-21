export interface User {
  id: {
    value: string;
  };
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  gender: string;
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
}
