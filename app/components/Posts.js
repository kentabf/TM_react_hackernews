import React from 'react'
import { fetchItem, fetchComments, fetchMainPosts, fetchUser, fetchPosts} from '../utils/api'

export default class Posts extends React.Component {
	state = {
		posts: null,
		error: null,
	}

	componentDidMount() {
		this.loadPosts()
	}

	loadPosts = () => {
		const postsType = this.props.postsType
		if (this.state.posts === null) {
			fetchMainPosts(postsType)
				.then((posts) => {
					this.setState({ posts: posts })
				})
				.catch((error) => {
					console.warn(`Error fetching ${postsType} posts: `, error)
					this.setState({
						error: `There was an error fetching ${postsType} posts: ${error}`
					})
				})
		}
	}

	isLoading = () => {
		const { posts, error } = this.state
		return posts === null && error === null
	}

	formatPost = (post) => {
		const { id, by, time, kids, url, title, descendants} = post
		/*
		TODO: 
		- format everything here
		- make correct link attachments
		*/
		return (
			<li key={id} className=''>
				<div>
					<div dangerouslySetInnerHTML={ { __html: title }}></div>
					<div>
						by <a href={by}>{by}</a> on {time} with <a href={id}>{descendants}</a>
					</div>
				</div>
			</li>
		)
	}

	render() {

		const { posts, error } = this.state

		return (
			<React.Fragment>

				{this.isLoading() && <p>Loading</p> }
				
				{error && <p>Error: {error}</p>}

				{posts && <p>Success</p> && <ul>{posts.map(this.formatPost)}</ul>}


			</React.Fragment>
		)
	}
}