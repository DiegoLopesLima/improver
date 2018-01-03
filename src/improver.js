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

		trimLeft = removeFromString(/^[\s\t]+/),

		trimRight = removeFromString(/[\s\t]+$/),

		trim = compose(trimLeft, trimRight),

		upperCase = value => String(value).toUpperCase(),

		identity = value => value,

		noop = () => {},

		prime = value => {

			if ((warble.is(value, 'even') && value !== 2) || warble.is(Math.sqrt(value), 'integer'))

				return false;

			for (let index = Math.floor(value / 2); index > 1; index--)

				if (value % index === 0)

					return false;

			return true;

		};

	let

		improver = {
			compose,
			removeFromString,
			trimLeft,
			trimRight,
			trim,
			upperCase,
			identity,
			noop,
			prime
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
