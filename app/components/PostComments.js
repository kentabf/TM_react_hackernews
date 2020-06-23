import React from 'react'
import { fetchItem, fetchComments, fetchMainPosts, fetchUser, fetchPosts} from '../utils/api'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import date from '../utils/date'


export default class PostComments extends React.Component {
	state = {
		comments: null,
		error: null,
	}

	componentDidMount() {
		this.loadComments()
	}

	loadComments = () => {
		if (this.state.comments === null) {
			fetchComments(this.props.commentIds)
				.then((comments) => {
					this.setState({ comments: comments })
				})
				.catch((error) => {
					console.warn(`Error fetching comments: `, error)
					this.setState({
						error: `There was an error fetching comments: ${error}`
					})
				})
		}
	}

	isLoading = () => {
		const { comments, error } = this.state
		return comments === null && error === null
	}

	formatComment = (comment) => {
		const { id, by, time, text, title} = comment
		/*
		TODO: 
		- format everything here
		- make correct link attachments
		*/
		return (
			<li key={id}>
				<div className='comment-bg-light'>
					<div className='comment'>
						<span>
							by&nbsp;
							<Link to={{
									pathname: `/user`,
									search: `?id=${by}`
								}}
							>
							{by}
							</Link>
							&nbsp;on {date(time)}
						</span>
						<span>
							<div dangerouslySetInnerHTML={ { __html: text }}></div>
						</span>
					</div>
				</div>
			</li>
		)
	}

	render() {

		const { comments, error } = this.state

		return (
			/*
			TODO:
			- format error
			*/
			<React.Fragment>

				{this.isLoading() && <Loading /> }
				
				{error && <p>Error: {error}</p>}


				{comments && <ul>{comments.map(this.formatComment)}</ul>}


			</React.Fragment>
		)
	}
}