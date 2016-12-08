import React, { Component, PropTypes } from 'react'
import { View, Text, NavigationExperimental } from 'react-native'
import Home from './Home'
import About from './About'
import Contact from './Contact'

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
} = NavigationExperimental

let styles = {}

class Header extends Component {
  render() {
    return (
      <NavigationHeader
        {...this.props}
        renderTitleComponent={this._renderTitleComponent}
        onNavigateBack={this._back}
      />
    );
  }

  _back = () => {
    this.props.pop()
  }

  _renderTitleComponent= (props) => {
    return (
      <NavigationHeader.Title>
        {props.scene.route.key}
      </NavigationHeader.Title>
    );
  }
}

class NavigationCardStackExample extends Component {
  _renderScene = (props) => {
    switch(props.scene.route.key) {
      case 'Home':
        return <Home />
      case 'About':
        return <About />
      case 'Contact':
        return <Contact />
    }
  }
  _renderHeader = (sceneProps) => {
    return (
      <Header
        pop={this.props.pop}
        {...sceneProps}
      />
    );
  }
  render() {
    const { navState } = this.props
    let direction = 'horizontal'
    if (navState.prevPushedRoute && navState.prevPushedRoute.type === 'modal') {
      direction = 'vertical'
    }
    return (
      <NavigationCardStack
        direction={direction}
        renderHeader={this._renderHeader}
        navigationState={this.props.navState}
        renderScene={this._renderScene} 
      />
    )
  }
}

styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
}

export default NavigationCardStackExample
