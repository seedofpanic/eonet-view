import React from 'react';
import './App.css';
import {observer} from "mobx-react";
import {EventsComponent} from "./component/events/events.component";
import {eonetEventsState} from "./store/eonetEvents";

@observer
export class AppComponent extends React.Component {
  render() {
    return (
        <div className="App">
            <EventsComponent events={eonetEventsState.sortedEvents} sortFields={eonetEventsState.sortFields}/>
        </div>
    );
  }
}
