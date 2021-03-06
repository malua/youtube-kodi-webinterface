/**
 * Created by Frolanta on 27/01/16.
 */
import React, { Component } from 'react'
import AutoComplete from 'material-ui/lib/auto-complete';
import YoutubeUtils from 'utils/YoutubeUtils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchVideos, startSearch } from 'actions/index';
import _ from 'lodash';

const style = {
    width: '100%',
    marginBottom: '0'
};

class SearchInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: []
        };
    }

    handleUpdateInput = (input) => {

        const videoSearch = _.debounce(() => { this.getSuggestion(input) }, 500);
        videoSearch();

    };

    getSuggestion = (input) => {

        if (input.length >= 3) {
            var self = this;
            YoutubeUtils.getSuggestions(input, function (data) {
                var dataSource = [];

                data.forEach(function (array) {
                    dataSource.push(array[0]);
                });

                self.setState({dataSource: dataSource});
            });

        } else {
            this.setState({ dataSource: [] });
        }
    };

    handleNewRequest = (input) => {
        this.props.startSearch(input);
        this.props.fetchVideos(input);
    };

    render () {

        return (
            <AutoComplete
                hintText="Search"
                dataSource={this.state.dataSource}
                onUpdateInput={this.handleUpdateInput}
                onNewRequest={this.handleNewRequest}
                filter={AutoComplete.fuzzyFilter}
                style={style}
                />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchVideos, startSearch }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchInput);
