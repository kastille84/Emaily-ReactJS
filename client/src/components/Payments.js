import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Payments extends Component {

    render() {

        return (
            <StripeCheckout 
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500} //amount of money we want to request from user, US cents default
                    //handleToken came from the action creator through connect
                token={token => this.props.handleToken(token)}//after we fill in form, this cb receives auth token obj from strip api, and we use it on our backend
                stripeKey={process.env.REACT_APP_STRIPE_KEY} // our publishable key
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);