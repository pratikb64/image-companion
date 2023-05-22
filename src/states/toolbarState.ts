import { createStore } from "zustand/vanilla";

const toolbarState = createStore<ToolbarState>((set) => ({
	position: {
		x: "0px",
		y: "0px",
	},
	currentUrl: "",
	isVisible: false,
	setPosition: ({ x, y }) => set(() => ({ position: { x, y } })),
	setCurrentUrl: (url: string) => set(() => ({ currentUrl: url })),
	ctrlKey: false,
	inTimer: undefined,
	outTimer: undefined,
}));

export default toolbarState;

interface ToolbarState {
	position: {
		x: string;
		y: string;
	};
	currentUrl: string;
	setPosition: ({ x, y }: { x: string; y: string }) => void;
	setCurrentUrl: (url: string) => void;
	ctrlKey: boolean;
	isVisible: boolean;
	inTimer: NodeJS.Timeout | undefined;
	outTimer: NodeJS.Timeout | undefined;
}
