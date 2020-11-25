import React from 'react';
import {Container} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Header from '../../components/header';

class HomePage extends React.Component { 
    
    constructor(props) {
        super(props);

    }

    render() {
        return (
          
            <Container>
                <Header/>
                <FontAwesomeIcon icon = "paw"/>
                Pitu
            </Container> 
        )
    }

}

export default HomePage;