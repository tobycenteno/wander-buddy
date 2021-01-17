import React, { Component } from 'react'
import '../css/main.css'
import Select from "react-select";


export default class CountrySelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countriesDropdown : []
        }
    }

    componentDidMount() {
        let dropDownCountries = this.props.allCountries.filter(country => country.passportIndex !== "No Data");

        dropDownCountries.map(country => {
            this.setState(prevState => ({
                countriesDropdown: [...prevState.countriesDropdown, {value: country.alpha3Code, label: country.name}]
            }))
        })
    }

    handleChange(value) {
        this.props.setCountry(this.props.allCountries.find(country => country.alpha3Code === value.value));
    }

    render() {
        return (
            <div className="country-dropdown-container">
                <Select
                    options={this.state.countriesDropdown}
                    // value={this.state.value}
                    onChange={value => this.handleChange(value)}
                    placeholder="What's your passport?"
                    isClearable
                /> 
            </div>
        )
    }
}
