import React from 'react';
import Header from "../../components/header";
import {Container} from 'react-bootstrap';
import ShortnerService from '../../services/ShortnerService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';




class StatsPage extends React.Component { 
    
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <p>Stats from Pitu</p>
        )
    }

}

export default StatsPage;