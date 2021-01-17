import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class Country extends Component {

    componentDidMount() {
        console.log(this.props.match.params.country);
    }

    render() {
        
        return (
            <h1>{this.props.match.params.country}</h1>
            )
    }
    
}


export default withRouter(Country);
