import React from 'react';    
import { rhythm } from "../utils/typography"
import { ParallelCoordinates } from "react-parcoords";    
import ReactDataGrid from 'react-data-grid'; 

class Chart extends React.Component { 
  constructor(props) {
    super(props);

    this.state = { 
        width: 1200,
        height: 350,
        dummy: false, 
        data: props.data, 
        selectedIndexes: [],
        filteredIndexes: [],
        color: 'green' 
    };
  }
 
  parseColumns(columns) {
    var array = [];
    Object.keys(columns).forEach(element => {  
      array.push({ key: element, name: element })
    }); 
 
    return array;
  }
   
  onBrushEnd(data) {      
    this.setState({ 
      filteredIndexes: data.data, 
    });  
  }
   
  onRowsSelected = rows => {    
      console.log(rows)
      this.setState({
        selectedIndexes: this.state.selectedIndexes.concat(
          rows.map(r => r)
        ) 
      });   
    
  };

  onRowsDeselected = rows => { 
    let rowIndexes = rows.map(r => r.rowIdx);  
    this.setState({
      selectedIndexes: this.state.selectedIndexes.filter(
        i => rowIndexes.indexOf(i.rowIdx) === -1
      ) 
    }); 
  };
   
  render() {                      
    const rows = this.props.data;
    const filteredRows = this.state.filteredIndexes.length === 0 ? rows : rows.filter(
        i => this.state.filteredIndexes.indexOf(i) > -1 
    )

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
                data={this.props.data}
                color={this.state.color}
                highlights={this.state.selectedIndexes.map(r => r.row)}    
                onBrushEnd={d => this.onBrushEnd(d)}   
              />  
            </div>
            <div>  
            <ReactDataGrid 
                columns={this.parseColumns(this.props.data[0])}
                rowGetter={i => filteredRows[i]}
                rowsCount={this.state.data.length} 
                rowSelection={{
                  showCheckbox: true,
                  enableShiftSelect: true,
                  onRowsSelected: this.onRowsSelected,
                  onRowsDeselected: this.onRowsDeselected,
                  selectBy: {
                    indexes: this.state.selectedIndexes.map(r => { 
                      return r.rowIdx 
                    }) 
                  }
                }}
                /> 
            </div>           
            
            <span>Row count: {this.state.filteredIndexes.length || this.state.data.length}</span> 
        </div>
    )
  }
}
 
export default Chart;