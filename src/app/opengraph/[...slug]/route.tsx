import { allDocuments } from "@/contentlayer/generated";
import { ImageResponse } from "next/og";

export async function GET(
	request: Request,
	{ params }: { params: { slug: string[] } }
) {
	const { slug } = params;
	const target = allDocuments.find((docs) => {
		return slug.join("/") === docs._raw.sourceFileDir;
	});

	const font = fetch(
		new URL(
			"https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff"
		)
	).then((res) => res.arrayBuffer());

	return new ImageResponse(
		(
			<>
				{
					// ImageResponse JSX element
				}
				<div
					style={{
						width: "1200px",
						height: "630px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "#fff",
						fontSize: 32,
					}}
				>
					<svg
						width="75"
						viewBox="0 0 75 65"
						fill="#000"
						style={{ margin: "0 75px" }}
					>
						<path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
					</svg>
					<div
						style={{
							fontSize: 48,
							marginTop: 40,
						}}
					>
						{target?.title}
					</div>
					<div
						style={{
							marginTop: 40,
						}}
					>
						{target?.description}
					</div>
				</div>
			</>
		),
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "Pretendard",
					data: await font,
					style: "normal",
				},
			],
		}
	);
}

export async function generateStaticParams() {
	const docs = allDocuments;

	return docs.map((doc) => {
		const path = doc._raw.sourceFileDir;
		return {
			slug: path.split("/"),
		};
	});
}
