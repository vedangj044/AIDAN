/*eslint-disable*/
import React from "react";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import Name from './Name';


var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920
};

export default function VectorMaps({map}) {
  if (map !== " ")
  {
    return (
      <div >
        
                <VectorMap
                  map={map}
                  backgroundColor="transparent"
                  zoomOnScroll={false}
                  containerStyle={{
                    width: "100%",
                    height: "420px"
                  }}
                  containerClassName="map"
                  regionStyle={{
                    initial: {
                      fill: "#e4e4e4",
                      "fill-opacity": 0.9,
                      stroke: "none",
                      "stroke-width": 0,
                      "stroke-opacity": 0
                    }
                  }}
                  series={{
                    regions: [
                      {
                        values: mapData,
                        scale: ["#AAAAAA", "#444444"],
                        normalizeFunction: "polynomial"
                      }
                    ]
                  }}
                />
      </div>
    );
                }
                else return(<div><h3>Select Map</h3></div>);
  }
