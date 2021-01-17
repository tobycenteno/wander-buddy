import React, { Component } from 'react'

export default class CountryFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [
                {id: 1, value: "visa-free", display: "Visa Free", isChecked: true},
                {id: 2, value: "covid-ban", display: "Covid Ban", isChecked: true},
                {id: 3, value: "e-visa", display: "E-Visa", isChecked: true},
                {id: 4, value: "visa-req", display: "Visa Required", isChecked: true}
            ]
    
        }
    }

    handleChecked = (event) => {
        let updatedFilter = this.state.filters.map(filter => {
            if(filter.id == event.target.id) {
                return {...filter, isChecked: event.target.checked}
            }
            return filter
        });

        this.setState({ filters: updatedFilter }); 
        this.props.setCountryFilter(this.state.filters);
    }

    render() {
        this.props.setCountryFilter(this.state.filters);
        return (
            <div className="country-filter">
                {
                    this.state.filters.map((filter,index) => (
                        <div key={index}>   
                            <input type="checkbox" id={`${filter.id}`} name={`${filter.value}`} value={`${filter.value}`} checked={filter.isChecked} onChange={value => this.handleChecked(value)} />
                            <label htmlFor="vehicle1">{filter.display}</label>
                        </div>
                    ))
                }
            </div>
        )
    }
}
