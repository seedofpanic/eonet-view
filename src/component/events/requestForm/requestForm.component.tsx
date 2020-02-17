import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { eonetEventsState } from '../../../store/eonetEvents';
import styles from '../events.module.scss';

export class RequestFormComponent extends React.Component {
    limit = '500';
    days = '';

    render() {
        return <Card data-testid="events-request-form">
            <Card.Body>
                <div className={styles['events-controls']}>
                    <Form.Row>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Limit: </Form.Label>
                            <Form.Control type="text" placeholder="limit" defaultValue={this.limit}
                                          onClick={(event: any) => this.limit = event.target.value} />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Days: </Form.Label>
                            <Form.Control type="text" placeholder="days" defaultValue={this.days}
                                          onClick={(event: any) => this.days = event.target.value} />
                        </Form.Group>
                    </Form.Row>
                    <Button onClick={() => this.fetchEvents()}>Fetch</Button>
                </div>
            </Card.Body>
        </Card>
    }

    fetchEvents() {
        eonetEventsState.fetchEvents(this.limit, this.days);
    }
}
