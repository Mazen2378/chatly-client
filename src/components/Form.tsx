import React, { FC } from 'react';

const Form: FC<{
	onSubmit: React.FormEventHandler;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ onSubmit, onChange }) => {
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input required type='text' name='username' onChange={onChange} />
				<label htmlFor='username'>username</label>
				<input required type='text' name='email' onChange={onChange} />
				<label htmlFor='email'>email</label>
				<input required type='password' name='password' onChange={onChange} />
				<label htmlFor='password'>password</label>
				<button type='submit'>register</button>
			</form>
		</div>
	);
};
export default Form;
