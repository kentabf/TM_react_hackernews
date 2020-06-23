import React from 'react'
import Loading from './Loading'
import PostComments from './PostComments'
import queryString from 'query-string'
import date from '../utils/date'
import { fetchItem, fetchComments, fetchMainPosts, fetchUser, fetchPosts} from '../utils/api'

export default class Post extends React.Component {

	state = {
		post: null,
		error: null,
	}

	componentDidMount () {
		this.loadPost()
	}

	isLoading = () => {
		const { post , error } = this.state
		return post === null && error === null
	}

	loadPost = () => {

		// TODO: update this with queryString.parse(this.props.location.search.id)
		const { id } = queryString.parse(this.props.location.search)

		fetchItem(id)
			.then((post) => {
				this.setState({
					post: post
				})
			})
			.catch((error) => {
				console.warn(`Error fetching Post ${id}:`, error)
				this.setState({
					error: `There was an error fetching Post {${id}}: ${error}`
				})
			})
	}

	postInfo = () => {
		// Assume this will be only called on once loadUser() successful
		const { id, by, time, kids, url, title, descendants } = this.state.post

		/*
		TODO: 
		- work on formatting
		- update the href for user id
		- update the href for comments
		- fix date
		- cutoff
		*/

		return (
			<React.Fragment>
				<div className=''>
					<a href={url}><h1>{title}</h1></a>
					by <a href={''}>{id}</a> on {date(time)} with <a href=''>{descendants}</a> comments
				</div>
				<div>
					<PostComments commentIds={kids} />
				</div>

			</React.Fragment>
		)	
	}

	render() {
		const { post, error } = this.state
		return (
			<React.Fragment>
				
				{this.isLoading() && <Loading /> }
				
				{error && <p>Error: {error}</p>}

				{post && this.postInfo()}
			</React.Fragment>
		)
	}






}