import {EonetGeometry} from "../../models/eonetGeometry";
import * as React from "react";
import moment from "moment";

export class GeometriesComponent extends React.Component<{ geometries: EonetGeometry[] }>{
    render() {
        const {geometries} = this.props;

        return <div>
            {geometries.map((geometry, index) => this.renderGeometry(geometry, index))}
        </div>;
    }

    renderGeometry(geometry: EonetGeometry, index: number) {
        const date = (moment(geometry.date)).format('DD/MM/YYYY');

        return <div key={index}>
            <div>{date}</div>
            <div><a href={this.renderMapLink(geometry)} target="_blank"
                    rel="noopener noreferrer">View on Google map</a></div>
        </div>
    }

    renderMapLink(geometry: EonetGeometry) {
        // TODO: support multiple points and polygons
        const coords = `${geometry.coordinates[1]},${geometry.coordinates[0]}`;

        return `https://maps.google.com/maps?q=${coords}&ll=${coords}&z=17`;
    }
}
