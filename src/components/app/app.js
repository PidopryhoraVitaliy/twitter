import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'That is good',         important: false,   like: true,     id: 1},
                {label: 'Going to learn React', important: true,    like: false,    id: 2},
                {label: 'I need break...',      important: false,   like: false,    id: 3},
            ]
        }
        this.maxId = 4;
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
    }

    deleteItem(id) {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    addItem(body) {
        this.setState(({data}) => {
            const newItem = {
                label: body,
                important: false,
                id: this.maxId++
            }
            return {
                data: [...data, newItem]
            }
        });
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            return {
                data: data.map(item => {
                    const newItem = {...item}
                    if (newItem.id === id) {
                        newItem.important = !newItem.important;
                    }
                    return newItem;
                })
            }
        });
    }

    onToggleLiked(id) {

        this.setState(({data}) => {
            return {
                data: data.map(item => {
                    const newItem = {...item}
                    if (newItem.id === id) {
                        newItem.like = !newItem.like;
                    }
                    return newItem;
                })
            }
        });

        /*this.setState(({data}) => {
            const index = data.findIndex((item) => item.id === id);
            const oldItem = data[index];
            const newItem = {...oldItem, like: !oldItem.like};
            return {
                data: [...data.slice(0, index), newItem, ...data.slice(index + 1)]
            }
        });*/

    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList
                    posts={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}

