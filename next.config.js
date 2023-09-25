const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	reactStrictMode: true,
	swcMinify: false,
	trailingSlash: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg&/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
};

module.exports = withContentlayer(nextConfig);
