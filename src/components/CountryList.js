import React, { Component } from 'react'
import CountryListItem from './CountryListItem.js'

export default class CountryList extends Component {
    render() {
        let [visaFree, covidBan, eVisa, visaReq ] = this.props.countryFilter;
        return (
            
            <div>
                <h4>Countries</h4>
                <ul>
                {
                    this.props.country.passportIndex
                        .filter(filterItem => filterItem.alpha3Code != this.props.country.alpha3Code)
                        .map(country => {
                            let caseValue = country.visareq;

                            if (parseInt(country.visareq) > 0) {
                                caseValue = "visa free days";
                            }

                            let displayCountry;

                            if ((caseValue === "visa on arrival" || caseValue === "visa free") && visaFree.isChecked) {
                                displayCountry = true;
                            } else if (caseValue === "visa free days" && visaFree.isChecked) {
                                displayCountry = true;
                            } else if (caseValue === "covid ban" && covidBan.isChecked) {
                                displayCountry = true;
                            } else if (caseValue === "e-visa" && eVisa.isChecked) {
                                displayCountry = true;
                            } else if (caseValue === "visa required" && visaReq.isChecked) {
                                displayCountry = true;
                            } else {
                                displayCountry = false;
                            }

                            if(displayCountry) {
                                country = <CountryListItem country={country} />
                            } else {
                                country = "";
                            }
                            
                            return country;
                    })

                }
                </ul>
            </div>
        )
    }
}
