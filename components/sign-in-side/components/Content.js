import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import CircuitCircle from "@/public/images/FinalCircleFinal.jpeg";

export default function Content() {
	return (
		<Stack
			sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450, display: { xs: 'none', md: 'none', lg: 'flex' } }}
		>
			<Box>
				<Image src={CircuitCircle} alt="Circuit" width={400} />
			</Box>
		</Stack>
	);
}