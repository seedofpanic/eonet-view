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
import Spinner from "react-bootstrap/Spinner";

@observer
export class EventsComponent extends React.Component<{events: EonetEvent[], sortFields: SortableFields, loading: boolean}> {
    render() {
        const {events, sortFields} = this.props;

        return <div data-testid="events-container">
            {this.renderLoading()}
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

    private renderLoading() {
        if (!this.props.loading) {
            return '';
        }

        return <div className={styles.loading}>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>;
    }
}
