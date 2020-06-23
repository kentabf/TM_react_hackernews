import React from 'react'
import Posts from './Posts'
import { fetchMainPosts } from '../utils/api'

export default class Top extends React.Component {

	fetcher = () => {
		return fetchMainPosts('top')
	}

	render() {
		return <Posts postsType='Top' fetcher={this.fetcher} />
	}
}