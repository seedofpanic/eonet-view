import {EonetGeometry} from "../../models/eonetGeometry";
import * as React from "react";
import { GeometryComponent } from './geometry.component';

export class GeometriesComponent extends React.Component<{ geometries: EonetGeometry[] }>{
    render() {
        const {geometries} = this.props;

        return <div data-testid="geometries">
            {geometries.map((geometry, index) => <GeometryComponent key={index} geometry={geometry}/>)}
        </div>;
    }
}
