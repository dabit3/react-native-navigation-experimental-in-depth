import React, { Component } from 'react'
import { View, Text, NavigationExperimental } from 'react-native'

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental

let styles = {}

const Home = ({ navigate }) => (
  <View style={styles.container}>
    <Text>Hello from Home</Text>
    <Text onPress={() => navigate('push', { title: 'About', key: 'About' })}>Go to About</Text>
  </View> 
)
const About = ({ navigate }) => (
  <View style={styles.container}>
    <Text>Hello from About</Text>
    <Text onPress={() => navigate('pop')}>Back</Text>
  </View>
) 

function reducer(state: object, action: string, route: object): object {
  if (!state) {
    return {
      index: 0,
      routes: [{ key: 'Home' }],
    };
  }
  switch (action) {
    case 'push': {
      return NavigationStateUtils.push(state, route)
      // const routes = state.routes.slice();
      // routes.push(route);
      // return {
      //   ...state,
      //   index: routes.length - 1,
      //   routes,
      // }
    }
    case 'pop': {
      return NavigationStateUtils.pop(state)
      // if (state.index <= 0) return state
      // const routes = state.routes.slice(0, -1);
      // return {
      //   ...state,
      //   index: routes.length - 1,
      //   routes,
      // }
    }
    default:
      return state
    }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this._back = this._back.bind(this);
    this._renderTitleComponent = this._renderTitleComponent.bind(this);
  }

  render() {
    return (
      <NavigationHeader
        {...this.props}
        renderTitleComponent={this._renderTitleComponent}
        onNavigateBack={this._back}
      />
    );
  }

  _back() {
    this.props.navigate('pop');
  }

  _renderTitleComponent(props) {
    return (
      <NavigationHeader.Title>
        {props.scene.route.key}
      </NavigationHeader.Title>
    );
  }
}

class NavigationCardStackExample extends Component {
  constructor() {
    super()
    this.state = {
      navState: reducer()
    }
  }
  static childContextTypes = {
    navigate: PropTypes.func,
  }
  _navigate = (action, route) => {
    const navState = reducer(this.state.navState, action, route)
    this.setState({
      navState
    })
  }
  _renderScene = ({ scene }) => {
    return <scene.route.component navigate={this._navigate} />
  }
  _renderHeader = (sceneProps) => {
    return (
      <Header
        navigate={this._navigate}
        {...sceneProps}
      />
    );
  }

  render() {
    const { navState } = this.state
    return (
      <NavigationCardStack
        renderHeader={this._renderHeader}
        navigationState={this.state.navState}
        renderScene={this._renderScene.bind(this)} 
      />
    )
  }
}

class Scene extends Component {
  static contextTypes = {
    navigate: React.PropTypes.func
  }
  render() {
    return <this.props.component navigate={this.context.navigate}  />
  }
}

styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
   scene: {
    backgroundColor: '#E9E9EF',
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    top: 0,
  },
  scrollView: {
    flex: 1,
  },
}

export default NavigationCardStackExample;
