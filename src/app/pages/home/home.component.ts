import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { LocalStorageService } from 'src/app/services/auth.service';
import { LogLoginI, UserI } from 'src/app/services/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

import { ToastrService, provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatIconModule,
    ToastrModule,
    TablerIconsModule,
    MatCardModule,
    NgApexchartsModule,
    MatTableModule,
    CommonModule,
  ],
})
export class AppHomeComponent implements AfterViewInit {

  constructor(
    private _localStorageService: LocalStorageService,
    private _userService: UserService,
    private toastr: ToastrService
  ) { }
  user: UserI[] = [];
  user_id: number = 0;
  logsUser: LogLoginI[] = [];

  ngAfterViewInit(): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
    var token = this._localStorageService.getData("token");
    if (token) {
      var user_name = this._localStorageService.decodeToken(token).sub;
      if (user_name) {
        this._userService.getUserByUsername(user_name).subscribe(
          {
            next: (response) => {
              console.log(response);
              if (Array.isArray(response.data)) {
                //this.user = response.data;
              } else {
                this.user_id = response.data.id;
                this.user.push(response.data);
              }

            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            },
            complete: () => {
              console.log("completed");
              this._userService.getLogsByUserId(this.user_id).subscribe({
                next: (response) => {
                  if(Array.isArray(response.data)){
                    this.logsUser=response.data;
                  }
                },
                error: (error: HttpErrorResponse) => {
                  console.log(error);
                },
                complete: () => {
                  console.log("completed");
                }
              });
            }
          }
        );


      }
    }
  }
}
