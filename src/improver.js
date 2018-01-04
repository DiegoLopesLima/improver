{

	const

		compose = (...functions) => {

			functions = functions.filter(value => typeof value === 'function');

			return value => {

				for (let index = 0, size = functions.length; index < size; index++)

					value = functions[index](value);

				return value;

			};

		},

		removeFromString = expression => value => value.replace(expression, ''),

		identity = value => value,

		noop = () => {},

		testRegExp = regexp => value => regexp.test(value);

	let

		improver = {
			compose,
			removeFromString,
			identity,
			noop,
			testRegExp
		};

	((root, factory) => {

		if (typeof define === 'function' && define.amd)

			define([], factory);

		else if (typeof exports === 'object')

			module.exports = factory();

		else

			root.improver = factory();

	})(this, () => improver);

}
