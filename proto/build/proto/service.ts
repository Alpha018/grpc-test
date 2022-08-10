/* eslint-disable */
import { Observable } from 'rxjs';
import type { Empty } from '../google/protobuf/empty';

export const protobufPackage = 'test';

export interface UserSave {
  name: string;
}

export interface UserById {
  id: number;
}

export interface User {
  id: number;
  name: string;
}

export interface Users {
  users: User[];
}

export interface UserService {
  FindOne(request: UserById): Promise<User>;
  SaveUser(request: UserSave): Promise<User>;
  FindAll(request: Empty): Promise<Users>;
  FindAllStream(request: Observable<Empty>): Observable<Users>;
}
