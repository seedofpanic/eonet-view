import {EonetCategory} from "../../models/eonetCategory";
import React from "react";

export class CategoryComponent extends React.Component<{ category: EonetCategory }>{
    render() {
        const {category} = this.props;

        return <div data-testid="category">{category.title}</div>;
    }
}
