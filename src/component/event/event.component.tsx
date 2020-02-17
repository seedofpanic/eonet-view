import React from 'react';
import Collapse from 'react-bootstrap/Collapse';
import {EonetEvent} from '../../models/eonetEvent';
import {CategoryComponent} from '../category/category.component';
import { EventDetailsComponent } from '../eventDetails/eventDetails.component';
import {SourceComponent} from '../source/source.component';
import styles from './event.module.scss';

export class EventComponent extends React.Component<{event: EonetEvent}, {showDescription: boolean}> {
    state = {
        showDescription: false
    };

    render() {
        const {event} = this.props;
        const {showDescription} = this.state;

        return <>
            <tr data-testid="event-line" className={event.closed ? styles.closed : ''} onClick={() => this.toggleDescription()}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.categories.map(category => <CategoryComponent key={category.id} category={category}/>)}</td>
                <td>{event.sources.map(source => <SourceComponent key={source.id} source={source} closed={event.closed}/>)}</td>
                <td>{event.geometries.length}</td>
                <td>{event.closed ? 'closed' : 'open'}</td>
            </tr>
            <tr data-testid="event-body">
                <td colSpan={7} className={styles['description-td']}>
                    <Collapse in={showDescription}>
                        <div>
                            <EventDetailsComponent event={event}/>
                        </div>
                    </Collapse>
                </td>
            </tr>
        </>;
    }

    toggleDescription() {
        this.setState({
            ...this.state,
            showDescription: !this.state.showDescription
        });
    }
}
