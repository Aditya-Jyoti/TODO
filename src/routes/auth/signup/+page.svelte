<script lang="ts">
	import Form from '$lib/components/Form.svelte';

	let error = '';

	async function signup(event: Event) {
		const formElem = event.target as HTMLFormElement;
		const formdata = new FormData(formElem);

		const response = await fetch(formElem.action, {
			method: 'POST',
			body: formdata
		});

		const responseData = await response.json();
		if (responseData.status === 400) {
			error = responseData.error;
		}
		formElem.reset();
	}
</script>

<div class="flex flex-col justify-center items-center w-full h-screen">
	<Form type="signup" action={signup} />
	{#if error}
		<div role="alert" class="alert alert-error text-sm w-1/4 m-2 p-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>Error! {error}</span>
		</div>
	{/if}
</div>
