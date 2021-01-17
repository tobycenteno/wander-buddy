import React, { Component, memo } from "react";
import {changeViewBox} from '../scripts/main.js';

import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
  } from "react-simple-maps";

class Map extends Component {

    componentDidMount() {
        changeViewBox();
    }
    handleSetToolTipContent(evt) {
        this.props.setTooltipContent(evt);
    }

    render() {
        const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json";
        let [visaFree, covidBan, eVisa, visaReq ] = this.props.countryFilter;
        return (
            <div>
                <ComposableMap data-tip="" projection="geoMercator" projectionConfig={{ scale: 100 }} style={{width: "100%", height: "auto"}}>
                    <ZoomableGroup maxZoom={1}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) => 
                            geographies.filter(country => country.properties.NAME !== "Antarctica")
                                    .map(geo => {
                                    let color = "#D6D6DA";
                                if(Object.entries(this.props.country).length != 0) {
                                    
                                    let countryObject = this.props.country.passportIndex.find(countryItem => countryItem.alpha3Code === geo.properties.ISO_A3);
                                    let visaReqStatus = "";
                                    
                                   if(countryObject != null) {
                                    visaReqStatus = countryObject.visareq;
                                   }
                                    
                                    
                                    if(parseInt(visaReqStatus) > 0) {
                                        visaReqStatus = "visa free";
                                    }
                                    switch(visaReqStatus) {
                                        case "visa on arrival":
                                        case "visa free":
                                            if(visaFree.isChecked) {
                                                color = "#2AA876";
                                            }
                                            break;
                                        case "covid ban":
                                            if(covidBan.isChecked) {
                                                color = "#E8554E";
                                            }
                                            break;
                                        case "visa required":
                                            if(visaReq.isChecked) {
                                                color = "#F19C65";
                                            }
                                            break;
                                        case "e-visa":
                                            if(eVisa.isChecked) {
                                                color = "#FFD265";
                                            }
                                            break;
                                        case "-1":
                                            color = "#000000";
                                            break;
                                        default:
                                            color ="#d6d6d6";
                                            break;
                                    }
                                } else {

                                }

                                    return  <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            const { NAME } = geo.properties;
                                            this.handleSetToolTipContent(`${NAME}`);
                                        }}
                                        onMouseLeave={() => {
                                            this.handleSetToolTipContent("");
                                        }}
                                        style={{
                                            default: {
                                            fill: color,
                                            outline: "none",
                                            stroke: "black",
                                            strokeWidth: .1
                                            },
                                            hover: {
                                            fill: color,
                                            outline: "none",
                                            opacity: ".8",
                                            stroke: "black",
                                            strokeWidth: .2
                                            },
                                            pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                            }
                                        }}
                                    />;
                            })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        ) 
    }   
}

export default memo(Map);