export interface IAuthUser {
  userId: string;
  username: string;
  isLoggedIn: boolean;
}

export interface IDestination {
  id: string;
  destination: string;
}

export interface ITicket {
  id: string;
  destination: IDestination;
}
