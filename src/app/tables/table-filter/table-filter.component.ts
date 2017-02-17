import {Component, OnInit, OnDestroy} from '@angular/core';
import {AngularFire} from "angularfire2";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit, OnDestroy{
  rows = [];

  temp = [];

  private subscription : Subscription;

  private uid: any;
  private eventId: any;

  columns = [
    { prop: 'name' },
    { name: 'email' },
  ];


  constructor(private af: AngularFire, private route: ActivatedRoute) {
    // this.fetch((data) => {
    //   // cache our list
    //   this.temp = [...data];
    //   // push our inital complete list
    //   this.rows = data;
    // });
  }

  ngOnInit(){
    this.subscription = this.route.params.subscribe(
      (data) => {
        this.eventId = data['id'];
        let event = this.af.database.object(`/events/${this.eventId}`).take(1);
        event.subscribe((snap) => {
          if(!!snap.participants){
           let participants = snap.participants;
            let data = participants.split(',');
            for(let i=0; i<data.length; i++){
              this.getProfile(data[i]);
            }
          }
        })
      },
    )
  }

  getProfile(key){
    let profile = this.af.database.object(`/profiles/${key}`).take(1);
    profile.subscribe(
      (snap) => {
        this.temp.push(snap);
        this.rows.push(snap);
        console.log(this.temp);
        console.log(this.rows);
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    let val = event.target.value;
    // filter our data
    let temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
  }
}
