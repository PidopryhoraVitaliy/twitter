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

    getNewToggleData(data, id, propertyName) {
        return data.map(item => {
            const newItem = {...item}
            if (newItem.id === id) {
                newItem[propertyName] = !newItem[propertyName];
            }
            return newItem;
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            return {
                data: this.getNewToggleData(data, id, 'important')
            }
        });
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            return {
                data: this.getNewToggleData(data, id, 'like')
            }
        });
    }

    render() {
        const {data} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
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

