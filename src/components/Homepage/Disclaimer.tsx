import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Homepage.module.scss';
import { User, HomePageProps } from '../../context/interfaces';

function Disclaimer({ previousPage }: HomePageProps) {
	const submitHandler = (e) => {
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
			<span className={styles.disclaimer}>
				Ensuring your privacy is important to us. We are serious about
				protecting our users and addressing privacy concerns. When you sign up
				or use Revis, you agree to the collection of information to enhance,
				personalize, and support your experience on the site. We do not share
				your information with third parties.
				<div className={styles.disclaimerBtns}>
					<button
						id={styles.disclaimerBtnNo}
						type="button"
						onClick={() => setDisclaimer(false)}
					>
						No, thanks
					</button>
					<button
						id={styles.disclaimerBtnYes}
						type="button"
						onClick={submitHandler}
					>
						I accept
					</button>
				</div>
			</span>
		</div>
	);
}

export default Disclaimer;
