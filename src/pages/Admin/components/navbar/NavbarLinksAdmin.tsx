// Chakra Imports
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
// Custom Components
import { SearchBar } from './searchBar/SearchBar';
import { SidebarResponsive } from '../sidebar/Sidebar';
import PropTypes from 'prop-types';
import routes from '../../../../routes';
import { useNavigate } from 'react-router-dom';
export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const ethColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
  const navigate = useNavigate();

  const onClickLogout = () => {
    navigate('/auth/sign-in');
  }
  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={() => {
          if (secondary) {
            return { base: '10px', md: 'unset' };
          }
          return 'unset';
        }}
        me="10px"
        borderRadius="30px"
      />
      <SidebarResponsive routes={routes} />

      <Menu>
        <MenuButton p="0px">
          <Avatar
            _hover={{ cursor: 'pointer' }}
            color="white"
            src={
              'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-1/276295934_1337735520036488_1639820029640532938_n.jpg?stp=c42.0.200.200a_dst-jpg_s199x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEdF-lvwTEHholNb_Oo1JTAYhFsKRcGidtiEWwpFwaJ2_9YMICvPk6QZNGOes3pwZK2AsC4czGpRrV5hG8HM5FK&_nc_ohc=mDbAlz9MA1gQ7kNvgFqQc52&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=AuEHYuGaOWGhHzGH3j-XyGP&oh=00_AYCmILRGNxh4yO5WNaZfqZM93Ql6d753jtXzjkUjofVutA&oe=66FE4E63'
            }
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, Võ Hoàng
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: 'none' }}
              _focus={{ bg: 'none' }}
              color="red.400"
              borderRadius="8px"
              px="14px"
            >
              <Text fontSize="sm" onClick={onClickLogout}>Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
