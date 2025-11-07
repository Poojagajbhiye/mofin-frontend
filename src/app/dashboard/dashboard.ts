import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from './dashboard.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  user!: User | null;
  public currentUser$ = new BehaviorSubject<User|null>(null);
  requests: any[] = [];

  newRequest = {
    type: 'expense',
    year: new Date().getFullYear(),
    month: 'October',
    dataRaw: '',
  };

  constructor(private dashboardService: DashboardService, private auth: AuthService) {}

  ngOnInit() {
    this.auth.getCurrentUser().subscribe({
      next: (resp) => {
        console.log("USER: ", resp);
        this.currentUser$.next(resp);
        this.loadRequests();
      },
      error: (err) => {
        console.log("ERR: ", err);
        this.currentUser$.next(null)
      },
    });

    this.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  loadRequests() {
    if (this.user?.role === 'admin') {
      this.dashboardService.getRequests().subscribe((res) => (this.requests = res));
    } else {
      this.dashboardService.getMyRequests().subscribe((res) => (this.requests = res));
    }
  }

  approve(id: string) {
    this.dashboardService.approveRequest(id).subscribe(() => this.loadRequests());
  }

  reject(id: string) {
    this.dashboardService.rejectRequest(id).subscribe(() => this.loadRequests());
  }

  createNewRequest() {
    try {
      const data = JSON.parse(this.newRequest.dataRaw);
      this.dashboardService
        .createRequest(this.newRequest.type, this.newRequest.year, this.newRequest.month, data)
        .subscribe(() => {
          alert('Request submitted!');
          this.newRequest.dataRaw = '';
          this.loadRequests();
        });
    } catch {
      alert('Invalid JSON format in data field.');
    }
  }
}
