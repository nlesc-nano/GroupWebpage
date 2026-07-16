<script lang="ts">
	import { group } from '$lib/content/site';

	let firstName = $state('');
	let lastName = $state('');
	let institute = $state('');
	let email = $state('');
	let message = $state('');
	let status: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');

	const endpointConfigured = !group.contactFormEndpoint.includes('REPLACE_WITH_FORM_ID');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!endpointConfigured) {
			status = 'error';
			return;
		}

		status = 'submitting';

		try {
			const response = await fetch(group.contactFormEndpoint, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new FormData(event.currentTarget as HTMLFormElement)
			});

			if (response.ok) {
				status = 'success';
				firstName = '';
				lastName = '';
				institute = '';
				email = '';
				message = '';
			} else {
				status = 'error';
			}
		} catch {
			status = 'error';
		}
	}
</script>

<form class="contact-form" onsubmit={handleSubmit}>
	<div class="form-row">
		<label>
			<span>First name</span>
			<input type="text" name="firstName" bind:value={firstName} required autocomplete="given-name" />
		</label>
		<label>
			<span>Surname</span>
			<input type="text" name="lastName" bind:value={lastName} required autocomplete="family-name" />
		</label>
	</div>
	<label>
		<span>Institute</span>
		<input type="text" name="institute" bind:value={institute} required autocomplete="organization" />
	</label>
	<label>
		<span>Your email</span>
		<input type="email" name="email" bind:value={email} required autocomplete="email" />
	</label>
	<label>
		<span>Message</span>
		<textarea name="message" bind:value={message} rows="5" required></textarea>
	</label>

	<button class="submit-button" type="submit" disabled={status === 'submitting'}>
		{status === 'submitting' ? 'Sending…' : 'Send message'}
	</button>

	{#if status === 'success'}
		<p class="form-status success" role="status">Thanks — your message has been sent.</p>
	{:else if status === 'error'}
		<p class="form-status error" role="alert">
			Something went wrong sending your message. Please try again or email
			<a href={`mailto:${group.email}`}>{group.email}</a> directly.
		</p>
	{/if}
</form>

<style>
	.contact-form {
		display: grid;
		gap: 16px;
		margin-top: 30px;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	label {
		display: grid;
		gap: 6px;
		font-size: 0.86rem;
		font-weight: 700;
		color: var(--muted);
	}

	input,
	textarea {
		border: 1px solid var(--line);
		border-radius: 10px;
		padding: 11px 13px;
		background: rgba(255, 255, 255, 0.75);
		font: inherit;
		color: var(--ink);
		resize: vertical;
	}

	input:focus-visible,
	textarea:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--teal) 45%, transparent);
		outline-offset: 2px;
	}

	.submit-button {
		justify-self: center;
		width: 100%;
		max-width: 340px;
		margin-top: 10px;
		border: none;
		border-radius: 999px;
		background: var(--ink);
		padding: 17px 32px;
		color: white;
		font-size: 1.1rem;
		font-weight: 800;
		letter-spacing: 0.01em;
		cursor: pointer;
		box-shadow: 0 16px 32px -16px rgba(23, 32, 28, 0.55);
		transition:
			transform 160ms ease,
			box-shadow 160ms ease,
			background 160ms ease;
	}

	.submit-button:hover:not(:disabled) {
		background: var(--teal);
		transform: translateY(-2px);
		box-shadow: 0 20px 36px -14px rgba(23, 110, 114, 0.55);
	}

	.submit-button:focus-visible {
		outline: 3px solid color-mix(in srgb, var(--teal) 45%, transparent);
		outline-offset: 4px;
	}

	.submit-button:disabled {
		opacity: 0.65;
		cursor: not-allowed;
		transform: none;
	}

	.form-status {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 700;
		text-align: center;
	}

	.form-status.success {
		color: var(--teal);
	}

	.form-status.error {
		color: var(--clay);
	}

	@media (max-width: 640px) {
		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
