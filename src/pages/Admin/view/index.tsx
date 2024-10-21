/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay vì Redirect
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
// import DefaultAuth from 'layouts/auth/Default';
// import illustration from 'assets/img/auth/auth.png';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
// Checkbox, Form,
import { message } from 'antd';
import AuthIllustration from '../layouts/auth/Default';
import illustration from '/src/assets/admin/auth.png';

// Định nghĩa kiểu cho sự kiện form
type FormEvent = React.FormEvent<HTMLFormElement>;

const SignIn = () => {
  const [email, setEmail] = useState<string>(''); // Kiểu là string
  const [password, setPassword] = useState<string>(''); // Kiểu là string
  const [show, setShow] = useState<boolean>(false); // Kiểu boolean cho việc hiển thị mật khẩu
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const handleClick = () => setShow(!show);

  // Hàm đăng nhập, kiểu sự kiện là FormEvent
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      message.warning('Please enter your email');
      return;
    }
    if (!password) {
      message.warning('Please enter your password');
      return;
    }

    try {
      message.success('Login successful!');
      setEmail('');
      setPassword('');
      navigate('/admin'); // Điều hướng về trang chủ sau khi đăng nhập thành công
    } catch (err) {
      message.error('An error occurred. Please try again later.');
    }
  };
  // const handleSignInAdmin = async (values: any) => {
  //   console.log(values);
  //   // e.preventDefault();
  //   if (!values.email) {
  //     message.warning('Please enter your email');
  //     return;
  //   }
  //   if (!values.password) {
  //     message.warning('Please enter your password');
  //     return;
  //   }

  //   try {
  //     message.success('Login successful!');
  //     navigate('/admin'); // Điều hướng về trang chủ sau khi đăng nhập thành công
  //   } catch (err) {
  //     message.error('An error occurred. Please try again later.');
  //   }
  // };

  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  return (
    <>
      <AuthIllustration illustrationBackground={illustration} image={illustration}>
        <Flex
          maxW={{ base: '100%', md: 'max-content' }}
          w="100%"
          mx={{ base: 'auto', lg: '0px' }}
          me="auto"
          h="100%"
          alignItems="start"
          justifyContent="center"
          mb={{ base: '30px', md: '60px' }}
          px={{ base: '25px', md: '0px' }}
          mt={{ base: '40px', md: '14vh' }}
          flexDirection="column"
        >
          <Box me="auto">
            <Heading color={textColor} fontSize="36px" mb="10px">
              Sign In
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColorSecondary}
              fontWeight="400"
              fontSize="md"
            >
              Enter your email and password to sign in!
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: '100%', md: '420px' }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: 'auto', lg: 'unset' }}
            me="auto"
            mb={{ base: '20px', md: 'auto' }}
          >
            <form onSubmit={handleSignIn}>
              <FormControl>
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="email"
                  placeholder="mail@simmmple.com"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Thay đổi email
                />
                <FormLabel
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  display="flex"
                >
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? 'text' : 'password'} // Hiển thị hoặc ẩn mật khẩu
                    variant="auth"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Thay đổi password
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: 'pointer' }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye} // Đổi icon hiển thị mật khẩu
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Button
                  type="submit"
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Sign In
                </Button>
              </FormControl>
            </form>
          </Flex>
        </Flex>
      </AuthIllustration>
    </>
  );
}

export default SignIn;
