import { connect } from 'react-redux';
import Graph from './Graph'
import {
  selectXByGraph, selectYByGraph, checkEntryByGraph, selectRByGraph
} from 'redux/modules/values';

function mapStateToProps(state) {
  return {
    xChoose: state.values.xChoose,
    rChoose: state.values.rChoose,
    change: state.values.change,
    rValues: state.values.rValues,
    x: state.values.x,
    y: state.values.y,
    r: state.values.r,
    rCurrent: state.values.rCurrent,
    xValues: state.values.xValues,
    xCurrent: state.values.xCurrent,
    yMin: state.values.yMin,
    yMax: state.values.yMax,
    yCurrent: state.values.yCurrent,
    entries: state.table.entries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectXByGraph: (value) => dispatch(selectXByGraph(value)),
    selectYByGraph: (value) => dispatch(selectYByGraph(value)),
    selectRByGraph: (value) => dispatch(selectRByGraph(value)),
    checkEntryByGraph: () => dispatch(checkEntryByGraph()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Graph);
