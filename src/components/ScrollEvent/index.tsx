"use client";

import { useEffect } from "react";

export default function ScrollEvent() {
	useEffect(() => {
		const headerWords = document.querySelector("#headerWords");

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio <= 0) {
					(headerWords as HTMLElement).style.opacity = "1";
					console.log(headerWords);
				} else {
					(headerWords as HTMLElement).style.opacity = "0";
					console.log(headerWords);
				}
			});
		});

		const headLine = document.querySelector("#headLine");
		if (headLine) {
			observer.observe(headLine);
		}
	}, []);

	return <></>;
}
