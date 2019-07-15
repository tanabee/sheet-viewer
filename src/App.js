import React from 'react';
import List from './components/list.js'
import Navigation from './components/navigation-bar.js'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: []
    };
  }

  onSignedIn = () => {
    this.fetchAndShowList();
  };

  fetchAndShowList = () => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1-zpaIm5Xz_HgB3TqyHkf3JtvYh_JPCtPUiw0oYs9Z5Q',
      range: 'A1:Z',
    }).then(response => {
      var range = response.result;
      if (range.values.length > 0) {
        this.onFetchSheet(range.values);
      }
    });
  }

  onFetchSheet = values => {
    this.setState({values: values});
  };

  render() {
    return (
      <>
        <Navigation
          onSignedIn={() => this.onSignedIn()}
        />
        <List
          values={this.state.values}
        />
      </>
    );
  }
}
