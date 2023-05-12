import { User } from "backend/src/connection/User";

export interface UserSocket extends WebSocket {
  user: User;
}
