import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import Loading from './components/Loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Top = React.lazy(() => import('./components/Top'))
const New = React.lazy(() => import('./components/New'))
const User = React.lazy(() => import('./components/User'))
const Post = React.lazy(() => import('./components/Post'))

class App extends React.Component {
	state = {
		theme: 'light',
		toggleTheme: () => {
			this.setState(({ theme }) => ({
				theme: theme === 'light' ? 'dark' : 'light'
			}))
		}
	}

	render() {
		return (
			<React.Fragment>
				<Router>
					<ThemeProvider value={this.state} >
						<Nav />
						<React.Suspense fallback={<Loading />} >
							<Switch>
								<Route exact path='/' component={Top} />
								<Route path='/new' component={New} />
								<Route path='/user' component={User} />
								<Route path='/post' component={Post} />
							</Switch>
						</React.Suspense>
					</ThemeProvider>
				</Router>
			</React.Fragment>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('app')
)