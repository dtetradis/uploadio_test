export default interface IUser {
  name: { first: string; last: string; title: string };
  gender: string;
  picture: { large: string; medium: string; thumbnail: string };
  email: string;
  title: string;
  location: { country: string };
  phone: string;
}
