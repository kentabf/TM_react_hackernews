import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import Top from './components/Top'
import User from './components/User'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
						<User id='datashrimp'/>
						<h1>Hackernews</h1>
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