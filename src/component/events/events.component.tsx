import React from "react";
import Table from "react-bootstrap/Table";
import {observer} from "mobx-react";
import {EventComponent} from "../event/event.component";
import {EonetEvent} from "../../models/eonetEvent";
import {SortableFields} from "../../store/eonetEvents";
import {EventsFiltersComponent} from "./filters/events-filters.component";
import {EventsHeadersComponent} from "./headers/events-headers.component";
import styles from './events.module.scss';
import { RequestFormComponent } from './requestForm/requestForm.component';

@observer
export class EventsComponent extends React.Component<{events: EonetEvent[], sortFields: SortableFields}> {
    render() {
        const {events, sortFields} = this.props;

        return <div data-testid="events-container">
            <div className={styles['form-box']}>
                <RequestFormComponent/>
            </div>
            <Table responsive striped bordered hover size="sm">
            <thead>
                <EventsHeadersComponent sortFields={sortFields}/>
                <EventsFiltersComponent/>
            </thead>
            <tbody>
                {events.map(event => <EventComponent key={event.id} event={event}/>)}
            </tbody>
            </Table>
        </div>;
    }
}
