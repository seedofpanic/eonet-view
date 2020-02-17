import moment from 'moment';
import React from 'react';
import { EonetGeometry } from '../../models/eonetGeometry';

export class GeometryComponent extends React.Component<{geometry: EonetGeometry}> {
    render() {
        const {geometry} = this.props;
        const date = (moment(geometry.date)).format('DD/MM/YYYY');

        return <>
            <div data-testid="geometry-date">{date}</div>
            <div data-testid="geometry-link"><a href={this.renderMapLink(geometry)} target="_blank"
                    rel="noopener noreferrer">View on Google map</a></div>
        </>;
    }

    renderMapLink(geometry: EonetGeometry) {
        // TODO: support multiple points and polygons
        const coords = `${geometry.coordinates[1]},${geometry.coordinates[0]}`;

        return `https://maps.google.com/maps?q=${coords}&ll=${coords}&z=17`;
    }
}
