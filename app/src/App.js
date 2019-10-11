import './App.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MyNetwork } from './components/myNetwork';
import { SearchUser } from './components/search';
import { TestYourself } from './components/test';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: parseInt(this.props.value)
    }
  }

  render() {
    const value = this.state.tabValue;
    let tab;
    const handleChange = (event, newValue) => {
      this.setState({ tabValue: newValue })
    };
      if(value===0)
        tab = ( <MyNetwork /> )
      else if(value===1)
        tab = ( <SearchUser />)
      else
        tab = (<TestYourself />)
    return (
      <div>
        <AppBar title="Toxic Friend Identifier" position="sticky">
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="My Network" />
              <Tab label="Search" />
              <Tab label="Test Yourself" />
            </Tabs>
        </AppBar>
        {tab}
      </div>
    )

  }
}

