/* eslint-disable */
// Link, List, ListItem, Text,
import { Flex, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
	// @ts-ignore
	let textColor = useColorModeValue('gray.400', 'white');
	// @ts-ignore
	let linkColor = useColorModeValue({ base: 'gray.400', lg: 'white' }, 'white');
	return (
		<Flex
			zIndex='3'
			flexDirection={{
				base: 'column',
				lg: 'row'
			}}
			alignItems={{
				base: 'center',
				xl: 'start'
			}}
			justifyContent='space-between'
			px={{ base: '30px', md: '0px' }}
			pb='30px'>
		</Flex>
	);
}
