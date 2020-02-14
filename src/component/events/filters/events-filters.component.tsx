import React from "react";
import Form from "react-bootstrap/Form";
import {eonetEventsState} from "../../../store/eonetEvents";
import Col from "react-bootstrap/Col";
import moment, {Moment} from "moment";

const dateRegExp = /\d{2}\/\d{2}\/\d{4}/;

export class EventsFiltersComponent extends React.Component {
    from = '';
    to = '';

    render() {
        return <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>
                <Form.Control type="text"
                              onChange={(event: any) => this.setCategoryFilter(event.target.value)}
                              placeholder="Category filter"
                />
            </th>
            <th></th>
            <th>
                <Form.Row>
                    <Form.Group as={Col} md="6">
                        <Form.Control type="text"
                                      onChange={(event: any) => this.setDateFrom(event.target.value)}
                                      placeholder="From dd/mm/yyyy"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Control type="text"
                                      onChange={(event: any) => this.setDateTo(event.target.value)}
                                      placeholder="To dd/mm/yyyy"
                        />
                    </Form.Group>
                </Form.Row>
            </th>
            <th>
                <Form.Control as="select" onChange={(event: any) => this.setStatusFilter(event.target.value)}>
                    <option value=''>any</option>
                    <option value='open'>open</option>
                    <option value='close'>close</option>
                </Form.Control>
            </th>
        </tr>;
    }

    private setCategoryFilter(value: string) {
        eonetEventsState.filter.category = value;
    }

    private setStatusFilter(value: string) {
        eonetEventsState.filter.status = value;
    }

    private setDateFrom(value: any) {
        eonetEventsState.filter.date.from = this.validateDate(value);
    }

    private setDateTo(value: any) {
        eonetEventsState.filter.date.to = this.validateDate(value);
    }

    private validateDate(value: string): Moment | null {
        if (!dateRegExp.test(value)) {
            return null;
        }

        const parsed = moment(value, 'DD/MM/YYYY');

        if (parsed.isValid()) {
            return parsed;
        } else {
            return null;
        }
    }
}