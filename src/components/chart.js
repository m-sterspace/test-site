import React from 'react';    
import { rhythm } from "../utils/typography"
import { ParallelCoordinates } from "react-parcoords";    
import ReactDataGrid from 'react-data-grid';   
import * as d3 from "d3";
import un from 'underscore'; 
import unm from "./libs/underscore-math";

class Chart extends React.Component { 
  constructor(props) {
    super(props);

    this.state = { 
        width: 900,
        height: 450,
        dummy: false, 
        data: props.data, 
        selectedIndexes: [],
        filteredIndexes: [], 
        color: [],
        isRowHovered: false
    }; 
  } 

  componentDidMount() { 
    var key = this.parseColumns(this.props.data.find((r, i) => { 
        return i === 0
      })).find((r, i) => {
        return i === 0
      })
      .key
       
    this.switchColor(key) 
    this.handleResize(); 

    window.addEventListener('resize', this.handleResize) 
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => { 
      var width = this.state.width

      if (window.innerWidth > 1500)
        width = 1200

      if (window.innerWidth > 1200)
        width = window.innerWidth - 200

      if (window.innerWidth < 1200)
        width = window.innerWidth - 50
      
      if (window.innerWidth < 900)
        width = window.innerWidth - 50
      
      if (window.innerWidth < 600)
        width = window.innerWidth - 50

      this.setState({
        width: width,
        height: 350
    });
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
      filteredIndexes: data.data 
    });  
  }
   
  onRowsSelected = rows => {     
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
    
  zcolor(col, dimension) {  
    var z = this.zscore(un(col).pluck(dimension).map(parseFloat))     
 
    var zcolorscale = d3.scaleLinear()
      .domain([-2,-0.5,0.5,2])
      .range(["red", "orange", "green", "blue"])
      .interpolate(d3.interpolateLab); 

    return function(d) { return zcolorscale(z(d[dimension])) }  
  };
 
  // color by zscore
  zscore(col) {      
      var mean = unm.mean(col), sigma = unm.stdDeviation(col);      
      return function(d) { 
        return (d - mean) / sigma;
      }
  }; 

  switchColor(color) {
    this.setState({
        color: this.zcolor(this.props.data , color),
    });
  }

  render() {                      
    const rows = this.props.data;
    const filteredRows = this.state.filteredIndexes.length === 0 ? rows : rows.filter(
        i => this.state.filteredIndexes.indexOf(i) > -1 )  
    const SelectAllRenderer = ({ props }) => { 
      return (
        <div></div>
      );
    };     
    
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
              { // JS interpolation
                typeof window !== 'undefined' && ReactDataGrid && 
              
                <ReactDataGrid  
                    columns={this.parseColumns(this.props.data.find((r, i) => { 
                          return i === 0
                        }) 
                      )}
                    rowGetter={i => filteredRows[i]}
                    rowsCount={this.state.data.length} 
                    selectAllRenderer={SelectAllRenderer}
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
              }
            </div>           
            
            <p
              style={{
                color: "#999",
                display: `block`,
                marginBottom: rhythm(.5),
                marginTop: rhythm(1),
              }} >
              Row count: {this.state.filteredIndexes.length || this.state.data.length}
            </p>   
        </div>
      )
    }
}
 
export default Chart;