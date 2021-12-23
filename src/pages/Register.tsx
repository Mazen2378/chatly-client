import { gql, useMutation } from '@apollo/client';
import React, { FC, useEffect, useState } from 'react';
import Form from '../components/Form';

interface registerData {
	username: string;
	email: string;
	imageURL: string;
	token: string;
}
interface variablesState {
	username: string;
	email: string;
	password: string;
}
type key = 'username' | 'email' | 'password';
const REGISTER = gql`
	mutation Register($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			username
			email
			imageURL
			token
		}
	}
`;
const Register: FC = props => {
	const [merrors, setMerrors] = useState<any>();
	const [variables, setvariables] = useState<variablesState>({
		username: '',
		email: '',
		password: '',
	});
	const [register_user, { data, loading, error }] = useMutation<
		{ register: registerData },
		variablesState
	>(REGISTER);
	const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setvariables({
			...variables,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault();
		console.log(variables);
		register_user({
			variables,
		});
	};
	useEffect(() => {
		setMerrors(error?.graphQLErrors[0].extensions.errors);
	}, [error]);
	return (
		<>
			<h1>Register</h1>
			<Form onSubmit={onSubmit} onChange={onChange} />
			<h1>
				{merrors &&
					Object.keys(merrors).map((key, index) => {
						return (
							<p key={index}>
								{key}:{merrors[key]}
							</p>
						);
					})}
				{data && data.register.email}
			</h1>
		</>
	);
};

export default Register;
