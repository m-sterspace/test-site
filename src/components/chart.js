import React from 'react';    
import { rhythm } from "../utils/typography"
import { ParallelCoordinates } from "react-parcoords";    
import ReactDataGrid from 'react-data-grid';

class Chart extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
        color: this.applyColor,
        width: 1200,
        height: 350,
        dummy: false, 
        data: props.data,
        highlights: [],
        highlightIdx: [],
        selectedIndexes: []
    };
  }

  applyColor(d) { 
    if (d.HPFrac === "1"){
      return "#999"
    }
    return '#9c9ede'
  }
 
  parseColumns(columns) {
    var array = [];
    Object.keys(columns).forEach(element => {  
      array.push({ key: element, name: element })
    }); 
 
    return array;
  }
  
  parseDimensions(columns) {  
    return Object.keys(columns)
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

    rows.forEach((row) => {
        this.state.highlights.push(row.row) 
    }) 
  };

  onRowsDeselected = rows => { 
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
      )
    });
    rows.forEach((row) => { 
        this.state.highlights.splice(this.state.selectedIndexes.indexOf(row), 1) 
    }) 
  };

  render() {                 
    return (
        <div id="grid"
              style={{ 
                marginBottom: rhythm(2.5),
              }} >  

            <div
              style={{ 
                marginBottom: rhythm(1),
              }} >   
            <ParallelCoordinates
                  width={this.state.width}
                  height={this.state.height} 
                  dimensions={this.parseDimensions(this.state.data[0])}
                  data={this.state.data}
                  color={this.state.color}
                  highlights={this.state.highlights}   
                  highlightIdx={this.state.highlightIdx}  
                  onBrushEnd={d => this.brushEnd(d)} 
              />  
            </div>
            <div
              style={{ 
                marginBottom: rhythm(1),
              }} >  
            <ReactDataGrid 
                  columns={this.parseColumns(this.state.data[0])}
                  rowGetter={i => this.state.data[i]}
                  rowsCount={this.state.data.length} 
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
              </div>
        </div>
    )
  }
}
 
export default Chart;