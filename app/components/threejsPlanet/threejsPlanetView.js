import React from 'react';
import PlanetSettings from './planetSettings.js';
import PlanetService from './planetService.js';
import PlanetCanvas from './planetCanvas.js';

class ThreeJSPlanetView extends React.Component {
  constructor(props) {
    super(props);
    this.planetService = new PlanetService();
    this.state = {
      selectedObject: 'Earth',
      showSettings: true,
      lightSettings: {
        x:0, 
        y:15,
        z:50
      },
      availableObjects: this.planetService.retrieveAll()
    };

    this.onToggle = this.onToggle.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }

  onToggle(showSettings){
    this.setState({
      showSettings
    });
  }

  onSelectionChange(selectedObject){
    this.setState({
      selectedObject
    });
  }


  render() {
    return (<div id='three-js-planet'>
      <PlanetSettings onToggle={this.onToggle} showSettings={this.state.showSettings} 
        lightSettings={this.state.lightSettings}
        selectedObject={this.state.selectedObject}
        availableObjects={this.state.availableObjects}
        onSelectionChange={this.onSelectionChange}
      >
      </PlanetSettings>
      <PlanetCanvas lightSettings={this.state.lightSettings}
        selectedObject={this.state.selectedObject}
        availableObjects={this.state.availableObjects} >
      </PlanetCanvas>
    </div>);
  }
}

export default ThreeJSPlanetView;