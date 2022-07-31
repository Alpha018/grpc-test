import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { User, UserById, UserSave } from '../proto/build/service';
import { Metadata, ServerDuplexStream, ServerUnaryCall } from '@grpc/grpc-js';
import { Observable, Subject } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  items = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('UserService', 'FindOne')
  findOne(
    data: UserById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): User {
    return this.appService.findUser(data.id);
  }

  @GrpcMethod('UserService', 'SaveUser')
  saveUser(
    data: UserSave,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): User {
    return this.appService.saveUser(data.name);
  }

  @GrpcMethod('UserService', 'FindAll')
  findAll(
    data: UserById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): { users: User[] } {
    return this.appService.getAllUsers();
  }

  @GrpcStreamMethod('UserService', 'FindAllStream')
  findAllStream(
    messages: Observable<any>,
    metadata: Metadata,
    call: ServerDuplexStream<any, any>,
  ): Observable<any> {
    return this.appService.subscribeEvents(messages);
  }
}
