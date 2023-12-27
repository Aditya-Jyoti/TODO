<script lang="ts">
	export let type: string;
	export let action: (event: Event) => Promise<void>;

	let loginElems = [
		['text', 'username'],
		['password', 'password']
	];
</script>

<div class="flex flex-col w-1/4">
	<div class="w-full">
		<h2 class="text-center text-2xl font-semibold w-full">{type}</h2>

		<form method="POST" on:submit|preventDefault={action} class="flex flex-col items-center p-1">
			{#each loginElems as elem}
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Enter your {elem[1]}</span>
					</div>
					<input
						type={elem[0]}
						placeholder={elem[1]}
						name={elem[1]}
						class="input input-bordered w-full h-1/2 p-1"
					/>
				</label>
			{/each}

			{#if type === 'signup'}
				<label class="form-control w-full">
					<div class="label">
						<span class="label-text">Enter your email</span>
					</div>
					<input
						type="email"
						placeholder="email"
						name="email"
						class="input input-bordered w-full h-1/2 p-1"
					/>
				</label>
			{/if}
			<button type="submit" class="btn btn-sm w-1/2 mt-4">{type}</button>
		</form>
	</div>
</div>
