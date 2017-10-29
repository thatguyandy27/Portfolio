import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function PlanetSettings(props) {

  const options = classNames('overlay options', {
    'toggle': props.showSettings
  });

  return <div className={options}>
    <div className='row'>
      <span className='two-column'>
        <span>Settings</span> 
      </span>
      <span className='two-column'>
        <button onClick={() => props.onToggle(!props.showSettings)}> {props.showSettings ? "Hide": "Show"}</button>
      </span>
    </div>
    <div className='row'>
      <span className='two-column'>
        <label>Object:</label>
      </span>
      <span className='two-column'>
        <select value={props.selectedObject} onChange={(event) => props.onSelectionChange(event.target.value)}>
          {props.availableObjects.map( x => <option key={x.name} value={x.name}>{x.name}</option> )}
        </select>
      </span>
    </div>
    <div className='row'>
      <div>
        <span>Light</span>
      </div>
      <div className='row'>
        <span className='six-column'>
          <label>X:</label>
        </span>
        <span className='six-column'>
          <input type='number' value={props.lightSettings.x} ></input>
        </span>
        <span className='six-column'>
          <label>Y:</label>
        </span>
        <span className='six-column'>
          <input type='number'value={props.lightSettings.y} ></input>
        </span>
        <span className='six-column'>
          <label>Z:</label>
        </span>
        <span className='six-column'>
          <input type='number' value={props.lightSettings.z} ></input>
        </span>
      </div>
    </div>
  </div>;
}

PlanetSettings.propTypes = {
  onToggle: PropTypes.func.isRequired,
  showSettings: PropTypes.bool.isRequired,
  lightSettings: PropTypes.object.isRequired,
  selectedObject: PropTypes.string.isRequired,
  availableObjects: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired
};

export default PlanetSettings;
