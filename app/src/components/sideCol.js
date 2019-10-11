import React from 'react';
import { Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

export default class SideCol extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            block: null,
            mute: null
        }
        this.handleBlock = this.handleBlock.bind(this);
    }
    componentDidMount() {
        const user = this.props.id;
        fetch(`http://localhost:5000/check_friendship?username=DhaarnaSethi&target=${user}`, { method: 'GET' })
            .then(response => {
                response.json().then(data => {
                    this.setState({
                        block: data.blocking,
                        mute: data.muting
                    })
                });
            });
    }
    handleBlock() {
        const user = this.props.id;
        fetch(`http://localhost:5000/block_user?username=${user}`, { method: 'GET' })
            .then(data => {
                    this.setState({
                        block: !this.state.block
                    })
                    console.log(this.state.block);
            });
    }
    render(){
        const block = (this.state.block == true) ? "Blocked" : "Block";
        const mute = (this.state.mute == true) ? "Muted" : "Mute";
        return(
            <div>
                <ExpansionPanel>
                <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    Latest Status
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    Hey guys
                </ExpansionPanelDetails>
                </ExpansionPanel>
                <Button variant="contained" style={{ padding: "5" }}>Unfollow</Button>
                <Button variant="contained" color="primary" style={{ padding: "5" }}>{mute}</Button>
                <Button variant="contained" onClick={this.handleBlock} color="secondary" style={{ padding: "5" }}>
                {block}
                </Button>
            </div>
        )}
}