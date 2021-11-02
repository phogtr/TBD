export interface IAuthUser {
  userId: string;
  username: string;
  isLoggedIn: boolean;
}

export interface IDestination {
  id: string;
  name: string;
}

export interface ITicket {
  id: string;
  destination: IDestination;
}
