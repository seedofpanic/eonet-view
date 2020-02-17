import {EonetSource} from '../../models/eonetSource';
import React from 'react';
import styles from './source.module.scss';

export class SourceComponent extends React.Component<{source: EonetSource, closed: boolean | undefined}> {
    render() {
        const {source, closed} = this.props;

        return <a data-testid="source" className={closed ? styles.disabled : ''} href={source.url} target="_blank" rel="noopener noreferrer">{source.id}</a>;
    }
}
