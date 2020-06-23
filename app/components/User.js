import React from 'react'
import UserPosts from './UserPosts'
import Loading from './Loading'
import queryString from 'query-string'
import { fetchItem, fetchComments, fetchMainPosts, fetchUser, fetchPosts} from '../utils/api'

export default class User extends React.Component {

	state = {
		// id: queryString.parse(this.props.location.search.id),
		user: null,
		error: null,
	}

	componentDidMount () {
		this.loadUser()
	}

	isLoading = () => {
		const { user , error } = this.state
		return user === null && error === null
	}

	loadUser = () => {
		const { id } = this.props

		fetchUser(id)
			.then((user) => {
				this.setState({
					user: user
				})
			})
			.catch((error) => {
				console.warn(`Error fetching ${id} posts: `, error)
				this.setState({
					error: `There was an error fetching user {${id}}: ${error}`
				})
			})
	}

	userInfo = () => {
		// Assume this will be only called on once loadUser() successful
		const { created, karma, about, id, submitted } = this.state.user

		return (
			<React.Fragment>
				<div className=''>
					<h1>{id}</h1>
					joined {Date(created)} has {karma} karma
					<div dangerouslySetInnerHTML={ { __html: about }}></div>
				</div>
				<div>
					<h2>Posts</h2>
					<UserPosts postIds={submitted} />
				</div>

			</React.Fragment>
		)	
	}

	render() {
		const { user, error } = this.state
		return (
			<React.Fragment>
				
				{this.isLoading() && <Loading /> }
				
				{error && <p>Error: {error}</p>}

				{user && this.userInfo()}
			</React.Fragment>
		)
	}






}