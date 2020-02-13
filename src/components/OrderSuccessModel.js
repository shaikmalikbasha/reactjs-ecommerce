import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class OrderSuccessModel extends Component {
    constructor() {
        super();
        this.state = {
            result : []
        };
    }
    componentDidMount() {
        this.setState({
            result : this.props.data
        });
    }
    render() {
        console.log(this.props);
        return(
            <div className="container" style={{marginTop:20}}>
                <div className="row justify-row-content">
                    <div className="col-md-6 offset-md-3" align="center">
                        <img src="./images/success.gif" height="350" width="100%" alt="This is Gif File" />
                    </div>
                    <div className="col-md-12" align="center" style={{marginTop:20}}>
                        <Link to ="/">
                            <button className="btn btn-lg btn-success">Continue Shopping</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default OrderSuccessModel;