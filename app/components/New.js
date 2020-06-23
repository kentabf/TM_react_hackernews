import React from 'react'
import Posts from './Posts'
import { fetchMainPosts } from '../utils/api'

export default class Top extends React.Component {

	fetcher = () => {
		return fetchMainPosts('New')
	}

	render() {
		return <Posts postsType='New' fetcher={this.fetcher} />
	}
}