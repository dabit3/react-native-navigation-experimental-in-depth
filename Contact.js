import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { pop, push } from './navActions'

const styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
}

const Contact = ({ pop, push }) => (
  <View style={styles.container}>
    <Text>Hello from Contact</Text>
    <Text onPress={() => pop()}>Back</Text>
    <Text onPress={() => push({ key: 'About' })}>About</Text>
  </View> 
)

function mapStateToProps () { return {} }

function mapDispatchToProps (dispatch) {
  return {
    pop: () => dispatch(pop()),
    push: (route) => dispatch(push(route))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact)