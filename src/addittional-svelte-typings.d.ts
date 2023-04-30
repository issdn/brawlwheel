declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:clickoutside'?: () => void;
	}
}
