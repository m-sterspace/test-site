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
        selectedIndexes: [],
        filteredIndexes: []
    };
  }

  applyColor(d) {  
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
    var d = data.data.map(r => r)
      
    this.setState({
      highlights: d,
      filteredIndexes: d
    });   
  }
   
  onRowsSelected = rows => {   
    this.setState({
      selectedIndexes: this.state.selectedIndexes.concat(
        rows.map(r => r.rowIdx)
      ),
      highlights: this.state.highlights.concat(
        rows.map(r => r.row)
      )
    });     
  };

  onRowsDeselected = rows => { 
    let rowIndexes = rows.map(r => r.rowIdx);
    let rowsToRemove = rows.map(r => r.row);

    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i) === -1
      ),
      highlights: this.state.highlights.filter(
        i => rowsToRemove.indexOf(i) === -1
      )
    }); 
  };

  getGridRows(rows) {        
    return this.state.filteredIndexes.length === 0 ? rows : rows.filter(
        i => this.state.filteredIndexes.indexOf(i) > -1 
    )
  }

  render() {                      
    const filteredRows = this.getGridRows(this.state.data);
    return (
        <div id="grid"
              style={{ 
                marginBottom: rhythm(2.5),
              }} >  
              
              <span>{this.state.filteredIndexes.length || this.state.data.length}</span>
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
                rowGetter={i => filteredRows[i]}
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