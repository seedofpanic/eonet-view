import React from 'react';
import {EonetEvent} from '../../models/eonetEvent';
import {CategoryComponent} from '../category/category.component';
import {SourceComponent} from '../source/source.component';
import styles from './event.module.scss';
import {GeometriesComponent} from "../geometries/geometries.component";

export class EventComponent extends React.Component<{event: EonetEvent}> {
    render() {
        const {event} = this.props;

        return <tr className={event.closed ? styles.closed : ''}>
            <td>{event.id}</td>
            <td>{event.title}</td>
            <td>{event.description}</td>
            <td>{event.categories.map(category => <CategoryComponent key={category.id} category={category}/>)}</td>
            <td>{event.sources.map(source => <SourceComponent key={source.id} source={source} closed={event.closed}/>)}</td>
            <td>{event.geometries.length ? <GeometriesComponent geometries={event.geometries}/> : ''}</td>
            <td>{event.closed ? 'closed' : 'open'}</td>
        </tr>;
    }
}