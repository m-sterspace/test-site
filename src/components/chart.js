import React from 'react';    
import { rhythm } from "../utils/typography"
import { ParallelCoordinates } from "react-parcoords";    
import ReactDataGrid from 'react-data-grid';

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
        highlightIdx: 0,
        selectedIndexes: []
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

  switchHighlights() {
    let idx = (this.state.highlightIdx + 1) % (this.state.data.length + 1); 
    this.setState({
        highlightIdx: idx,
        highlights: idx === 0 ? [] : [this.state.data[idx - 1]]
    });
  }

  parseColumns(columns) {
    var array = [];
     Object.keys(columns).forEach(element => {  
        array.push({ key: element, name: element })
     }); 
    return array;
  }
  
  brushEnd(data) {
      console.log(data)
  }

  rowGetter = i => {
    return this.state.rows[i];
  };

  onRowsSelected = rows => {
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(
        rows.map(r => r.rowIdx)
      )
    });
  };

  onRowsDeselected = rows => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
      )
    });
  };

  render() {            
     
    return (
        <div id="example"
              style={{ 
                marginBottom: rhythm(2.5),
              }} >  
              
            <ParallelCoordinates
                  width={this.state.width}
                  height={this.state.height} 
                  data={this.state.data}
                  color={this.state.color}
                  highlights={this.state.highlights}   
                  highlightIdx={this.state.highlightIdx}  
                  onBrushEnd={d => this.brushEnd(d)}
              />  
            <br/>
            <ReactDataGrid
                  columns={this.parseColumns(this.state.data[0])}
                  rowGetter={i => this.state.data[i]}
                  rowsCount={500} 
                  rowSelection={{
                    showCheckbox: true,
                    enableShiftSelect: true,
                    onRowsSelected: this.onRowsSelected,
                    onRowsDeselected: this.onRowsDeselected,
                    selectBy: {
                      indexes: this.state.selectedIndexes
                    }
                  }}
                  />
             <input type="button" onClick={this.switchHighlights.bind(this)} value="Switch highlights" />&nbsp;
        </div>
    )
  }
}
 
export default Chart;