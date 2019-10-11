import React from 'react';
import { Profile } from './profile';
import CircularProgress from '@material-ui/core/CircularProgress';

export class MyNetwork extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            submit: false,
            my_network: null
        }
        this.loadNetwork=this.loadNetwork.bind(this)
    }
    componentDidMount(){
        this.loadNetwork()
    }
    loadNetwork() {
        this.setState({submit: true});
        fetch('http://localhost:5000/my_network', { method: 'GET' })
          .then(response => {
            response.json().then(data => {
              this.setState({
                my_network: data,
                submit: false
              });
            });
          });
      }
    render(){
        const network = []
        if(this.state.submit == true){
            network.push(
            <div>
                <CircularProgress />
            </div>
            );
        }
        else if(this.state.my_network!=null){
            this.state.my_network.map(person =>{
                network.push(<Profile 
                    key={person.user.id}
                    id={person.user.id}
                    name={person.user.name}
                    url={person.user.picture_url}
                    fscore={person.fscore}/>);
            });
        }
        
        return (
            <div className="row" style={{width: "100%", margin: "0"}}>
                {network}
            </div>
            
        );
    }
}
