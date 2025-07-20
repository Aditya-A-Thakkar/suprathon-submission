import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FinalCircleFinal from "@/public/images/FinalCircleFinal.jpeg";
import Image from "next/image";

export default function Content() {
	return (
		<Stack
			sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450, display: { xs: 'none', md: 'none', lg: 'flex' } }}
		>
			<Box>
				<Image src={FinalCircleFinal} alt="Circuit" width={400} />
			</Box>
		</Stack>
	);
}