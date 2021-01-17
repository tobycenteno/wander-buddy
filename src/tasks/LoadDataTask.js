
import passportIndexFile from '../files/passport-index-matrix-iso3.csv';
import axios from 'axios'
import {csv} from 'd3';

class LoadDataTask {

    allCountriesURL = "https://restcountries.eu/rest/v2/all";

    setState = null;

    load = (setState) => {
        this.setState = setState;

        axios.get(this.allCountriesURL)
            .then(response => {
                csv(passportIndexFile).then(data => {
                    this.#consolidateData(response.data, data);
                })
        })
    };

    #consolidateData = (allCountriesData, passportIndexData) => {

        for (let i=0; i < allCountriesData.length; i++) {
            let passportIndex = [];
            const singleCountry = allCountriesData[i];
            const passportIndexCountry = passportIndexData.find(
                (passportIndexCountry) => passportIndexCountry.Passport === singleCountry.alpha3Code
            );
            
            if (passportIndexCountry == null) {
                singleCountry.passportIndex = "No Data";
            } else {

                for (const [key, value] of Object.entries(passportIndexCountry)) {
                    let passportCountryObject = {};

                    passportCountryObject.alpha3Code = key;
                    passportCountryObject.visareq = value;
                    let passportCountryName = allCountriesData.find(country => country.alpha3Code === key);

                    if(passportCountryName != null) {
                        
                        passportCountryObject.name = passportCountryName.name;
                        passportCountryObject.flag = passportCountryName.flag;
                        
                        passportIndex = [...passportIndex, passportCountryObject];
                    }

                    
                }
            }
            passportIndex.sort((a, b) => (a.name > b.name) ? 1 : -1);
            singleCountry.passportIndex = passportIndex;
            
        }

        this.setState(allCountriesData);
    }

}

export default LoadDataTask;