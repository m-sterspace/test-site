import React from 'react';    
import { rhythm } from "../utils/typography"
import { ParallelCoordinates } from "react-parcoords";  

class Chart extends React.Component { 
  
  applyColor(d) { 
    if (d.HPFrac === "1"){
      return "#999"
    }
    return '#9c9ede'
  }

  render() {
        const { data } = this.props  
        
        const props = {           
            color: this.applyColor,    
            data: data,
            alpha: 0.2,
            brushMode: "1D-axes",
            smoothness: .55,
            highlights: [],             
        };
          
    return (
        <div id="example"
              style={{
                display: `flex`,
                marginBottom: rhythm(2.5),
              }}
            >  
              
            <ParallelCoordinates {...props}></ParallelCoordinates>
        </div>
    )
  }
}
 
export default Chart;