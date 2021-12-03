import React, { useState } from 'react';
import router from 'next/router';
import PropTypes from 'prop-types';
import styles from '../../styles/Homepage.module.scss';
import Disclaimer from './Disclaimer';
import { User, HomePageProps } from '../../context/interfaces';

function SignUp({ previousPage }: HomePageProps) {
	const [userInfo, setUserInfo] = useState<User>({
		username: '',
		email: '',
		password: '',
	});

	const submitHandler = (e: React.SyntheticEvent) => {
		const { username, password, email } = userInfo;
		const messageDiv: HTMLDivElement = document.querySelector('#messageDiv');

		e.preventDefault();
		fetch('/api/createUser', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
				email,
			}),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response: Response) => {
				if (response.status === 200) {
					messageDiv.innerHTML = `Welcome ${username}, you will be redirected to the dashboard shortly.`;
					setTimeout(() => router.replace('/dashboard'), 3000);
				} else throw response.json();
			})
			.catch((error) => {
				console.log(error);
				error.then((err) => {
					messageDiv.innerHTML = err.error;
				});
			});
	};

	return (
		<div className={styles.signUpComponentWrapper}>
			<p className={styles.disclaimer} name="disclaimer">
				{' '}
				Ensuring your privacy is important to us. We are serious about
				protecting our users and addressing privacy concerns. When you sign up
				or use Revis, you agree to the collection of information to enhance,
				personalize, and support your experience on the site. We do not share
				your information with third parties.
			</p>
			<h1 className={styles.signupTitle}>Sign Up</h1>

			<form onSubmit={submitHandler}>
				<div className={styles.formEntry}>
					<label htmlFor="username" className={styles.labels}>
						username:
						<input
							className={styles.userInput}
							type="text"
							onChange={(e) =>
								setUserInfo({ ...userInfo, username: e.target.value })
							}
							value={userInfo.username}
							required
							autoComplete="none"
						></input>
					</label>
				</div>

				<div className={styles.formEntry}>
					<label htmlFor="email" className={styles.labels}>
						email:
						<input
							className={styles.userInput}
							type="email"
							onChange={(e) =>
								setUserInfo({ ...userInfo, email: e.target.value })
							}
							value={userInfo.email}
							required
							autoComplete="none"
						></input>
					</label>
				</div>

				<div className={styles.formEntry}>
					<label htmlFor="password" className={styles.labels}>
						password:
						<input
							className={styles.userInput}
							type="password"
							onChange={(e) =>
								setUserInfo({ ...userInfo, password: e.target.value })
							}
							required
							autoComplete="none"
						></input>
					</label>
				</div>

				<div id="messageDiv" name="Log-in Errors"></div>

				<div className={styles.buttonWrapper}>
					<button
						className={styles.backButton}
						onClick={previousPage}
						type="button"
					>
						Back
					</button>

					<button
						className={styles.submitButton}
						type="button"
						onClick={(e) => submitHandler(e)}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

SignUp.propTypes = {
	previousPage: PropTypes.func.isRequired,
};

export default SignUp;
