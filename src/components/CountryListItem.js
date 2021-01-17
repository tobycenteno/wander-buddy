import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class CountryListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let country = this.props.country;
        return (
            <li>
                <Link to={`/wander-buddy/${country.alpha3Code}`}>
                    <img src={`${country.flag}`} width="18"/> {country.name} : {country.visareq} {parseInt(country.visareq) > 0 ? "days" : ""}
                </Link>
            </li>
            )
    }
    
}
