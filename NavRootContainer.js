import { connect } from 'react-redux'
import NavigationCardStack from './NavigationCardStack'

function mapStateToProps (state) {
  return {
    navState: state.navState,
  }
}

export default connect(
  mapStateToProps
)(NavigationCardStack)