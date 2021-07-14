import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../state/counter.actions';
import { CounterState } from '../state/counter.state';
import { Observable } from 'rxjs';
import { getChannelName } from '../state/counter.selector';
import { AppState } from 'src/app/store/app.state';
@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css'],
})
export class CustomCounterInputComponent implements OnInit {
  value: number = 0;
  channelName?: string;
  channelName$?: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('counter').subscribe((data) => {
    //   console.log('Channel Name Observable called');
    //   this.channelName = data.channelName;
    // });
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({ count: +this.value }));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChannelName());
  }
}
