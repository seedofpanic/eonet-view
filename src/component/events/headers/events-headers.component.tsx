import React from "react";
import styles from "./events-header.module.scss";
import Badge from "react-bootstrap/Badge";
import {eonetEventsState, SortableField, SortableFields} from "../../../store/eonetEvents";

export class EventsHeadersComponent extends React.Component<{sortFields: SortableFields}> {
    render() {
        const {sortFields} = this.props;

        return <tr>
            <th>#</th>
            <th>title</th>
            <th>description</th>
            <th onClick={() => this.sortBy('category')} className={styles.sortable}>
                <span className={styles['sortable-text']}>categories </span>
                {this.renderSortBadge(sortFields.category)}
            </th>
            <th>sources</th>
            <th onClick={() => this.sortBy('date')} className={styles.sortable}>
                <span className={styles['sortable-text']}>geometries </span>
                {this.renderSortBadge(sortFields.date)}
            </th>
            <th onClick={() => this.sortBy('status')} className={styles.sortable}>
                <span className={styles['sortable-text']}>status </span>
                {this.renderSortBadge(sortFields.status)}
            </th>
        </tr>;
    }

    renderSortBadge(field: string) {
        return !field ? '' :
            <Badge pill variant="primary">{(field === 'up') ? 'v' : '^'}</Badge>;
    }

    sortBy(field: SortableField) {
        eonetEventsState.toggleSort(field);
    }
}