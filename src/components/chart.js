import React from 'react';    
import { rhythm } from "../utils/typography"
import { ParallelCoordinates } from "react-parcoords";   

class Chart extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
        color: this.applyColor,
        width: 1000,
        height: 350,
        dummy: false, 
        data: props.data,
        highlights: [],
        highlightIdx: 0
    };
}

  applyColor(d) { 
    if (d.HPFrac === "1"){
      return "#999"
    }
    return '#9c9ede'
  }

  switchData() {
      const data = this.state.data.map(d => {
          const newData = {};
          Object.keys(d).forEach(k => {
              newData[k] = d[k] + 1;
          });
          return newData;
      });
      this.setState({
          data
      });
  }

  render() {           
    return (
        <div id="example"
              style={{
                display: `flex`,
                marginBottom: rhythm(2.5),
              }}
            >  
              
            <ParallelCoordinates
                  width={this.state.width}
                  height={this.state.height}
                  dimensions={this.state.dimensions}
                  data={this.state.data}
                  color={this.state.color}
                  highlights={this.state.highlights} 
                  onBrushEnd={d => console.log('brush end', d)}
                  onLineHover={d => console.log('line hover', d)}
                  onLinesHover={lines => console.log('lines hover', lines)}
              />  
 
        </div>
    )
  }
}
 
export default Chart;