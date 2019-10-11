import React from 'react';
import { VictoryPolarAxis, VictoryTheme, VictoryChart, VictoryArea } from 'victory';
import { InputLabel, Button, TextField } from '@material-ui/core';

export class TestYourself extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            fscore: null,
            submit: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        const data= {
            "text": this.state.text
        };
        this.state.submit=true;
        fetch(`http://localhost:5000/test_text`,
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => {
                response.json().then(data => {
                    this.setState({
                        fscore: data,
                        submit: false
                    })
                });
            });
        event.preventDefault()
    }
    handleChange(event) {
        this.setState({
            text: event.target.value
        })
    }
    render() {
        let graph;
        const data = [], fscore=this.state.fscore;
        if (fscore != null) {
            for (var key in fscore) {
                data.push({ value: key, score: fscore[key] })
            }
            graph = (
                <VictoryChart polar
                    theme={VictoryTheme.material}
                    padding={{ left: 80, right: 80 }}
                    style={{ parent: { maxWidth: "30%" } }}
                >

                    <VictoryArea data={data} x="value" y="score" />
                    <VictoryPolarAxis />
                </VictoryChart>
            )
        }

        return (
            <div style={{ display: "flex",padding: "5%", justifyContent: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <InputLabel htmlFor="my-input">Enter Text</InputLabel>
                    <TextField multiline rows="5" variant="outlined" name="text" style={{width: "400px"}}
                    aria-describedby="my-helper-text" onChange={this.handleChange} />
                    <Button variant="contained" label="Submit" type="submit" color="primary">
                        Check
                    </Button>
                </form>
                {graph}
            </div>
        )
    }

}