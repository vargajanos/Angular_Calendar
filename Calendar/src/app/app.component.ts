import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor(
    private http:HttpClient)
    {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events:[]
  }

  days:any = [];
  special:any = [];
  nevnap:any = [];


  ngOnInit(): void {
    this.getMunkaszünetinap();
  }



  getMunkaszünetinap(){
    this.http.get("https://szunetnapok.hu/api/b102cd3781991ebf88bbc3c8a95a0f0935c9fa9bc7e10b4dbcce5a993bd0060d/2025/json/snd").subscribe((res:any)=>{


      this.days = res.days.map((item:any) => ({
        title: item.name,
        start: item.date
      }));


      this.special = res.special_days.map((item:any) => ({
        title: item.name,
        start: item.date,
        description: item.description,
        backgroundColor:"green"
      }));

      this.nevnap =res.name_days ? Object.keys(res.name_days).map((date: string) => ({
        title: res.name_days[date].join(', '),
        start: date,
        color: 'pink',
        textColor: 'black'
      })) : [];

      this.calendarOptions.events=[...this.days, ...this.special, ...this.nevnap];


      /*
      this.calendarOptions.events += res.name_days.map((item:any) => ({
        title: item.name,
        start: item.date,
        description: item.description,
        backgroundColor:"green"
      }));
  */
    })
  }




}
