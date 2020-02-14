import React from "react";
import Table from "react-bootstrap/Table";
import {observer} from "mobx-react";
import {EventComponent} from "../event/event.component";
import {EonetEvent} from "../../models/eonetEvent";
import {eonetEventsState, SortableFields} from "../../store/eonetEvents";
import {EventsFiltersComponent} from "./filters/events-filters.component";
import {EventsHeadersComponent} from "./headers/events-headers.component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {inspect} from "util";
import styles from './events.module.scss';

@observer
export class EventsComponent extends React.Component<{events: EonetEvent[], sortFields: SortableFields}> {
    limit = '500';
    days = '';

    render() {
        const {events, sortFields} = this.props;

        return <div>
            <div className={styles['events-controls']}>
                <Form.Row>
                    <Form.Group as={Col} md="4">
                        <Form.Control type="text" placeholder="limit" value={this.limit}
                                      onClick={(event: any) => this.limit = event.target.value} />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Control type="text" placeholder="days" value={this.days}
                                      onClick={(event: any) => this.days = event.target.value} />
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Button onClick={() => this.fetchEvents()}>Fetch</Button>
                    </Form.Group>
                </Form.Row>
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

    fetchEvents() {
        eonetEventsState.fetchEvents(this.limit, this.days);
    }
}