import { useEffect, useMemo, useRef, useState } from "react";

type HookFunction<T, P> = (
	getState: () => T,
	setState: (newState: T) => void,
	props?: P
) => T;

function useDynamicHook<T = any, P = any>(
	hookFunction: HookFunction<T, P>,
	deps: any[] = []
): T {
	const [cachedState, setCachedState] = useState<T | null>(null);
	const stateRef = useRef<T | null>(null);

	useEffect(() => {
		stateRef.current = cachedState;
	}, [cachedState]);

	const memoizedHookFunction = useMemo(() => {
		return hookFunction(
			() => stateRef.current as T,
			(newState) => {
				setCachedState(newState);
			}
		);
	}, deps);

	return memoizedHookFunction;
}

export default useDynamicHook;
