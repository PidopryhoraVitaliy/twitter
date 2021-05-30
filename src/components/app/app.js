import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import Api from '../api';

import './app.css';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'That is good',         important: false,   like: true,     id: 1},
                {label: 'Going to learn React', important: true,    like: false,    id: 2},
                {label: 'I need break...',      important: false,   like: false,    id: 3},
            ],
            term: '',
            filter: 'all',
        }
        this.maxId = 4;
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const api = new Api();
        const newData = await api.getTodos();
        this.setState(({data}) => {
            return {
                data: newData
            }
        });
    }

    deleteItem(id) {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        });
    }

    async addItem(body) {

        const api = new Api();
        const newBody = await api.createTodo(body);

        this.setState(({data}) => {
            return {
                data: [...data, newBody]
            }
        });

        /*this.setState(({data}) => {
            const newItem = {
                label: body,
                important: false,
                id: this.maxId++
            }
            return {
                data: [...data, newItem]
            }
        });*/

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

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter(item => item.label.indexOf(term) > -1)
    }

    filterPosts(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        }
        return items
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPosts(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList
                    posts={visiblePosts}
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

