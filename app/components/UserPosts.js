import React from 'react'
import Posts from './Posts'
import { fetchItem, fetchComments, fetchMainPosts, fetchUser, fetchPosts} from '../utils/api'

export default class UserPosts extends React.Component {

	fetcher = () => {
		const { postIds } = this.props
		return fetchPosts(postIds)
	}

	render() {
		return <Posts postsType='User' fetcher={this.fetcher} />
	}
}