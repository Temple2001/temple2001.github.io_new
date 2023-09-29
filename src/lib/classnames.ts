export const classNames = (...args: (string | boolean)[]) => ({
	className: args.filter((e) => e !== false).join(" "),
});
