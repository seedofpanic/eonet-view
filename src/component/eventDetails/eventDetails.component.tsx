import React from 'react';
import Card from 'react-bootstrap/Card';
import { EonetEvent } from '../../models/eonetEvent';
import { GeometriesComponent } from '../geometries/geometries.component';

export class EventDetailsComponent extends React.Component<{event: EonetEvent}> {
    render() {
        const {event} = this.props;

        return <Card data-testid="event-details">
            <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                {this.renderDescription(event)}
                <GeometriesComponent geometries={event.geometries}/>
            </Card.Body>
        </Card>;
    }

    renderDescription(event: EonetEvent) {
        if (!event.description) {
            return;
        }

        return <Card.Text>
            {event.description}
        </Card.Text>;
    }
}
