export interface AuthUser {
  userId: string;
  username: string;
  isLoggedIn: boolean;
}

export interface Destination {
  id: string;
  destination: string;
}

export interface Ticket {
  id: string;
  destination: Destination;
  status: string;
}
