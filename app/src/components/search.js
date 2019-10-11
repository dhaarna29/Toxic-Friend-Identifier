import React from 'react';
import { InputLabel, Button, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Profile } from './profile';

export class SearchUser extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            userId: "DhaarnaSethi",
            userData: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event){
        const user=this.state.userId;
        fetch(`http://localhost:5000/search_user?username=${user}`, { method: 'GET' })
        .then(response => {
        response.json().then(data => {
          this.setState({
            userData: data
          })
        });
      });
      event.preventDefault()
    }
    handleChange(event){
        this.setState({
            userId: event.target.value
        })
    }
    render() {
        let profile;
        if(this.state.userData != null){
            profile=(<Profile key={this.state.userData.user.id}
                              name={this.state.userData.user.name}
                              url={this.state.userData.user.picture_url}
                              fscore={this.state.userData.fscore} />)
        }
        return (
            <div>
            <div style={{ display: "flex",padding: "5%", justifyContent: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <InputLabel htmlFor="my-input">User Id</InputLabel>
                    <TextField id="my-input" aria-describedby="my-helper-text" onChange={this.handleChange}/>
                    <Button label="Submit" type="submit">
                        Search
                    </Button>
                </form>
            </div>
            <div style={{ display: "flex",padding: "5%", justifyContent: 'center'}}>
                {profile}
            </div>
            </div>
        )
    }
}