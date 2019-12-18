import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';
import Progress from '@material-ui/core/CircularProgress';
import { FormatAlignCenter, FilterList } from '@material-ui/icons';
import CreatePage from '../CreatePage';
import UpdatePage from '../UpdatePage';
import Button from '../../ui-component/Button';

import * as TasksActions from '../../../actions/tasks';
import * as LoginActions from '../../../actions/login';

import './TasksPage.css';

class TasksPage extends PureComponent {
    static propTypes = {
        tasks: PropTypes.array.isRequired,
        totalCount: PropTypes.number.isRequired,
        getTasks: PropTypes.func.isRequired
    }

    state = {
        isLoading: true,
        isCreate: false,
        isUpdate: false,
        page: 0,
        task: { id: '' },
        sort_field: 'id',
        sort_direction: 'asc'
    }

    async componentDidMount() {
        await this.setState({ isLoading: true });
        await this.props.getTasks({ page: this.state.page, sort_field: this.state.sort_field, sort_direction: this.state.sort_direction });
        await this.setState({ isLoading: false });
    }

    handleChangePage = async (page) => {
        await this.setState({ isLoading: true, page: page.selected + 1 });
        await this.props.getTasks({ page: this.state.page, sort_field: this.state.sort_field, sort_direction: this.state.sort_direction });
        await this.setState({ isLoading: false });
    }

    handelLogout = async () => {
        await this.props.logout();
    }

    handleToggleCreate = async () => {
        await this.setState({ isCreate: !this.state.isCreate });
    }

    handleToggleUpdate = task => async () => {
        await this.setState({ task, isUpdate: !this.state.isUpdate });
    }


    handleSort = sort_field => async e => {
        await this.setState({
            sort_field,
            sort_direction: this.state.sort_direction === 'asc' ? 'desc' : 'asc',
            isLoading: true,
        });
        await this.props.getTasks({ page: this.state.page, sort_field, sort_direction: this.state.sort_direction });
        await this.setState({ isLoading: false });
    }

    renderHeader = () => {
        const { sort_field, sort_direction } = this.state;

        return (
            <div className={'headerWrapper'} >
                <div className={'header'} onClick={this.handleSort('id')}>
                    ID {sort_field === 'id' ?
                        <FilterList style={{
                            'transform': `rotate(${sort_direction === 'asc' ? 0 : 180}deg)`,
                            'marginLeft': '5px',
                            'width': '15px',
                            'height': '15px'
                        }} />
                        : <FormatAlignCenter style={{
                            'marginLeft': '5px',
                            'width': '15px',
                            'height': '15px'
                        }} />}
                </div>
                <div className={'header'} onClick={this.handleSort('username')}>
                    User Name {sort_field === 'username' ?
                        <FilterList style={{
                            'transform': `rotate(${sort_direction === 'asc' ? 0 : 180}deg)`,
                            'marginLeft': '5px',
                            'width': '15px',
                            'height': '15px'
                        }} />
                        : <FormatAlignCenter style={{
                            'marginLeft': '5px',
                            'width': '15px',
                            'height': '15px'
                        }} />}</div>
                <div className={'header'} onClick={this.handleSort('email')}>
                    Email {sort_field === 'email' ?
                        <FilterList style={{
                            'transform': `rotate(${sort_direction === 'asc' ? 0 : 180}deg)`,
                            'marginLeft': '5px',
                            'width': '15px',
                            'height': '15px'
                        }} />
                        : <FormatAlignCenter style={{
                            'marginLeft': '5px',
                            'width': '15px',
                            'height': '15px'
                        }} />}</div>
                <div className={classNames('header', 'notActive')}>
                    Text
                     </div>
                <div className={'header'} onClick={this.handleSort('status')}>
                    Status {sort_field === 'status' ?
                        <FilterList style={{
                            'transform': `rotate(${sort_direction === 'asc' ? 0 : 180}deg)`,
                            'marginLeft': '5px',
                            'width': '15px',
                            'height': '15px'
                        }} />
                        : <FormatAlignCenter style={{
                            'marginLeft': '5px',
                            'width': '15px',
                            'height': '15px'
                        }} />}</div>
            </div>
        )
    }
    renderTasks = () => {
        const { tasks, totalCount } = this.props;
        const { isLoading, page } = this.state;

        return (
            <div className={'pageWrapper'}>
                <div className={'taskPage'} >
                    {this.renderHeader()}
                    {isLoading ?
                        <Progress size={35} /> :
                        tasks && tasks.map(task => {
                            return (
                                <div className={'task'} key={task.id} onClick={this.handleToggleUpdate(task)}>
                                    <div className={'taskName'}>{task.id}</div>
                                    <div className={'taskName'}>{task.username}</div>
                                    <div className={'taskName'}>{task.email}</div>
                                    <div className={'taskName'}>{task.text}</div>
                                    <div className={'taskName'}>{task.status ? 'Fulfilled' : 'Unfulfilled'}</div>
                                </div>
                            )
                        })
                    }
                    <ReactPaginate
                        pageCount={Math.ceil(totalCount / 3)}
                        previousLabel={'Previous'}
                        pageRangeDisplayed={3}
                        nextLabel={'Next'}
                        onPageChange={this.handleChangePage}
                        initialPage={page}
                        pageClassName={'page'}
                        previousClassName={'button'}
                        nextClassName={'button'}
                        activeClassName={'active'}
                        breakClassName={'page'}
                        containerClassName='container'
                        disableInitialCallback={true}
                    />
                </div>
            </div>
        )
    }
    render() {
        const { isCreate, isUpdate, task, page, sort_field, sort_direction } = this.state

        return (
            <div>
                <Button style={{ 'marginBottom': '30px', 'marginRight': '30px' }} onClick={this.handelLogout}>Logout</Button>
                <Button style={{ 'marginBottom': '30px' }} onClick={this.handleToggleCreate}>{isCreate ? 'Back' : 'Create'}</Button>
                {isCreate ?
                    <CreatePage
                        handleToggleCreate={this.handleToggleCreate}
                        page={page}
                        sort_field={sort_field}
                        sort_direction={sort_direction}
                        getTasks={this.props.getTasks}
                    />
                    :
                    isUpdate ?
                        <UpdatePage
                            task={task}
                            page={page}
                            sort_field={sort_field}
                            sort_direction={sort_direction}
                            getTasks={this.props.getTasks}
                            handleToggleUpdate={this.handleToggleUpdate(task)} />
                        :
                        this.renderTasks()
                }
            </div>
        );
    }
}

export default connect(state => {
    return {
        tasks: state.tasks.tasks,
        totalCount: state.tasks.totalCount
    };
}, { ...TasksActions, ...LoginActions })(TasksPage);
