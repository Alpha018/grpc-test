import { Injectable } from '@nestjs/common';
import { User } from '../proto/build/proto/service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppService {
  items = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  private onNewEndpointConnectedSubscriber = new Subject<{ users: User[] }>();
  private readonly onNewEndpointConnectedObserver: Observable<{
    users: User[];
  }>;

  constructor() {
    this.onNewEndpointConnectedObserver =
      this.onNewEndpointConnectedSubscriber.asObservable();
  }

  findUser(id: number): User {
    return this.items.find((item) => item.id === id);
  }

  getAllUsers(): { users: User[] } {
    return { users: this.items };
  }

  saveUser(name: string): User {
    this.items.push({
      id: this.items.length + 1,
      name: name,
    });
    this.onNewEndpointConnectedSubscriber.next({
      users: this.items,
    });
    return this.items.find((data) => data.name === name);
  }

  subscribeEvents(messages) {
    const onNext = (message) => {
      this.onNewEndpointConnectedSubscriber.next({
        users: this.items,
      });
    };

    const onComplete = () => this.onNewEndpointConnectedSubscriber.complete();
    messages.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return this.onNewEndpointConnectedObserver;
  }
}
