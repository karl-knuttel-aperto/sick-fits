import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`;

class DeleteItem extends Component {
    update = (cache, payload) => {
        // manually update cache on client so it matches server
        // Read the cache
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
        // Filter the deleted item out of the page/cache
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        // Put items back
        cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
    }

    render() {
        return (
            <Mutation 
                mutation  = {DELETE_ITEM_MUTATION}
                variables = {{id: this.props.id}}
                update    = {this.update}
            >
                {(deleteItem, { error }) => (
                    <button onClick={() => {
                        if(confirm('Are you sure you want to delete this item?')) {
                            deleteItem().catch(err => {
                                alert(err.message);
                            });
                        }
                    }}>
                        {this.props.children} 
                    </button>
                )}
            </Mutation>
            
        );
    }
}

export default DeleteItem;