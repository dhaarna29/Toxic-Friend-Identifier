import React from 'react';
import { Card, Button } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { VictoryPolarAxis, VictoryTheme, VictoryChart, VictoryArea } from 'victory';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SideCol from './sideCol';

export class Profile extends React.Component {
    
    render() {
        const fscore = this.props.fscore;
        const data = [];
        for (var key in fscore) {
            data.push({ value: key, score: fscore[key] })
        }
        return (
            <div className="col-6" style={{ padding: "5px" }}>
                <Card raised={true}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                <img src={this.props.url} />
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                            </IconButton>
                        }
                        title={this.props.name}
                    />
                    <div className="row" style={{ margin: "0" }}>
                        <VictoryChart polar
                            className="col-6"
                            theme={VictoryTheme.material}
                            padding={{ left: 80, right: 80 }}
                            style={{
                                parent: {
                                    maxWidth: "30%",
                                    maxHeight: "80%",
                                    overflow: "visible"
                                }
                            }}
                        >

                            <VictoryArea data={data} x="value" y="score" style={{
                                data: {
                                    fill: '#2073d4'
                                },
                                parent: { overflow: 'visible' },
                                padding: "1em 4em",
                                margin: "1em -4em"
                            }} />
                            <VictoryPolarAxis />
                        </VictoryChart>
                        <div className="col-6">
                           <SideCol id={this.props.id} />
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}