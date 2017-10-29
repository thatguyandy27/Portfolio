import React from 'react';
import THREE from 'three/three.js';
import _ from 'lodash';
import PropTypes from 'prop-types';

class PlanetCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount(){
    this.initScene();
    this.spaceObject = _.find(this.props.availableObjects, (x) => x.name === this.props.selectedObject);
    this.updateObject();
    this.animate();

  }

  componentDidUpdate(prevProps){
    if(prevProps.selectedObject !== this.props.selectedObject && this.props.selectedObject){
      this.updateObject();
    }
    else {
      console.log(this.props.selectedObject);
    }
  }

  componentWillUnmount(){
    if (this.rafid){
      window.cancelAnimationFrame(rafid);
    }
  }

  render() {
    return <canvas id='planetCanvas' ref={(canvas) => { this.planetCanvas = canvas; }} ></canvas>;
  }

  renderScene() {
    // spaceObject.rotation.y += 0.01;
    this.spaceObject.animation();
    this.renderer.render(this.scene, this.camera);
  }



  initScene(){
    this.scene = new THREE.Scene();
    this.ambientLight = new THREE.AmbientLight( 0x888888 );
    this.scene.add(this.ambientLight );
    let lightSettings = this.props.lightSettings;
    this.light  = new THREE.DirectionalLight( 0xcccccc, .5 );
    this.light.position.set(lightSettings.x,lightSettings.y,lightSettings.z);
    this.scene.add( this.light );
    this.light.castShadow    = true;
    this.light.shadowCameraNear  = 0.01;
    this.light.shadowCameraFar   = 15;
    this.light.shadowCameraFov   = 45;
    this.light.shadowCameraLeft  = -1;
    this.light.shadowCameraRight =  1;
    this.light.shadowCameraTop   =  1;
    this.light.shadowCameraBottom= -1;
    this.light.shadowBias    = 0.001;
    this.light.shadowDarkness    = 0.2;
    this.light.shadowMapWidth    = 1024 *2;
    this.light.shadowMapHeight   = 1024 *2;

    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 2.5;
    //adding y to look at rings 
    this.camera.position.y = .5;
    this.camera.lookAt(new THREE.Vector3(0,0,0));

    this.renderer = new THREE.WebGLRenderer({ canvas: this.planetCanvas,
      antialias:true
    });
    this.renderer.setSize( window.innerWidth, window.innerHeight - 55 );
    // document.getElementById('view').appendChild( renderer.domElement );

    this.controls = new THREE.OrbitControls(this.camera, this.planetCanvas);
    this.controls.addEventListener('change', this.renderScene);
  }

  updateObject(){
    if (!this.scene || !this.props.selectedObject){
      return;
    }
    if (this.spaceObject){
      this.scene.remove(this.spaceObject);
    }

    const newObject = _.find(this.props.availableObjects, (x) => x.name === this.props.selectedObject);
    this.spaceObject = newObject.createObject();
    this.scene.add(this.spaceObject);
  }

  animate(){
    this.rafid = requestAnimationFrame(this.animate);
    this.renderScene();
    this.controls.update();
  }
}

PlanetCanvas.propTypes = {
  lightSettings: PropTypes.object.isRequired,
  selectedObject: PropTypes.string.isRequired,
  availableObjects: PropTypes.array.isRequired
};

export default PlanetCanvas;
