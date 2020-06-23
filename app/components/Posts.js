import React from 'react'
import { fetchItem, fetchComments, fetchMainPosts, fetchUser, fetchPosts} from '../utils/api'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import date from '../utils/date'

export default class Posts extends React.Component {
	state = {
		posts: null,
		error: null,
	}

	componentDidMount() {
		this.loadPosts()
	}

	loadPosts = () => {
		const { postsType, fetcher } = this.props
		if (this.state.posts === null) {
			fetcher()
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
		- color correction
		*/
		return (
			<li key={id} className=''>
				<div className='post'>
					<span>
						<a href={url}><div dangerouslySetInnerHTML={ { __html: title }}></div></a>
					</span>
					<span className='text-details-light'>
						by&nbsp;
						<Link to={{
								pathname: `/user`,
								search: `?id=${by}`,
							}}
						>
						{by}
						</Link>
						&nbsp;on {date(time)} with&nbsp;
						<Link to={{
								pathname: `/post`,
								search: `?id=${id}`
							}}
						>
						{descendants}
						</Link>
						&nbsp;comments
					</span>
				</div>
			</li>
		)
	}

	render() {

		const { posts, error } = this.state

		return (
			/*
			TODO:
			- format error
			- remove success text
			*/
			<React.Fragment>

				{this.isLoading() && <Loading /> }
				
				{error && <p>Error: {error}</p>}

				{posts && <p>Success</p> && <ul>{posts.map(this.formatPost)}</ul>}


			</React.Fragment>
		)
	}
}