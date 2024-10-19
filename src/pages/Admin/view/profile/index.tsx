import React, { useState, ChangeEvent } from 'react';
import { Tabs, Input, Button, Avatar, Row, Col, Spin, message } from 'antd';
import { Box } from '@chakra-ui/react';
import { LoadingOutlined } from '@ant-design/icons';
import CustomCard from '../../../../components/card/Card';

// Icon loading cho Button
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// Định nghĩa kiểu dữ liệu cho user và password state
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
}

interface Passwords {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function Profile() {
  // Định nghĩa kiểu dữ liệu cho state của user và passwords
  const [user, setUser] = useState<User>({
    firstName: 'Hoàng',
    lastName: 'Võ',
    email: 'vohoang@gmail.com',
    phone: '0123456789',
    avatar:
      'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-1/276295934_1337735520036488_1639820029640532938_n.jpg?stp=c42.0.200.200a_dst-jpg_s199x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEdF-lvwTEHholNb_Oo1JTAYhFsKRcGidtiEWwpFwaJ2_9YMICvPk6QZNGOes3pwZK2AsC4czGpRrV5hG8HM5FK&_nc_ohc=mDbAlz9MA1gQ7kNvgFqQc52&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=AuEHYuGaOWGhHzGH3j-XyGP&oh=00_AYCmILRGNxh4yO5WNaZfqZM93Ql6d753jtXzjkUjofVutA&oe=66FE4E63',
  });

  const [passwords, setPasswords] = useState<Passwords>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);

  // Hàm thay đổi input của user
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Hàm thay đổi input cho password
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  // Validate form profile
  const validateProfileForm = (): boolean => {
    if (!user.firstName) {
      message.warning('Please enter your first name');
      return false;
    }

    if (!user.lastName) {
      message.warning('Please enter your last name');
      return false;
    }

    if (!user.email) {
      message.warning('Please enter your email');
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
      message.warning('Invalid email address');
      return false;
    }

    if (!user.phone) {
      message.warning('Please enter your phone');
      return false;
    }

    return true;
  };

  // Validate form change password
  const validateChangePasswordForm = (): boolean => {
    if (!passwords.currentPassword) {
      message.warning('Please enter your current password');
      return false;
    }

    if (!passwords.newPassword) {
      message.warning('Please enter a new password');
      return false;
    }
    if (passwords.newPassword.length < 6) {
      message.warning('Password must be at least 6 characters long');
      return false;
    }

    if (!passwords.confirmNewPassword) {
      message.warning('Please confirm your new password');
      return false;
    } else if (passwords.confirmNewPassword !== passwords.newPassword) {
      message.warning('Passwords do not match');
      return false;
    }

    return true;
  };

  // Xử lý cập nhật thông tin người dùng
  const handleUpdateProfile = async () => {
    if (!validateProfileForm()) {
      return;
    }

    try {
      message.success('Profile updated successfully');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi mật khẩu
  const handleChangePassword = async () => {
    if (!validateChangePasswordForm()) {
      return;
    }

    try {
      message.success('Password changed successfully');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Box
      pt={{ base: '130px', md: '80px', xl: '80px' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%"
      minH="100vh"
    >
      <CustomCard
        flexDirection={'column'}
        w="80%"
        maxW="600px"
        px="25px"
        py="20px"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Tabs
          defaultActiveKey="1"
          centered
          tabBarStyle={{
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          {/* Tab Profile */}
          <Tabs.TabPane tab="Profile" key="1">
            {/* Avatar */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Avatar size={120} src={user.avatar} />
              <h2 style={{ fontWeight: 'bold', fontSize: '22px' }}>
                {`${user.firstName} ${user.lastName}`}
              </h2>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontWeight: 'bold' }}>First Name</label>
                  <Input
                    allowClear
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                    style={{ height: '40px' }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontWeight: 'bold' }}>Last Name</label>
                  <Input
                    allowClear
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    style={{ height: '40px' }}
                  />
                </div>
              </Col>
            </Row>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold' }}>Email Address</label>
              <Input
                allowClear
                disabled
                name="email"
                value={user.email}
                onChange={handleInputChange}
                style={{ height: '40px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold' }}>Phone Number</label>
              <Input
                allowClear
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                style={{ height: '40px' }}
              />
            </div>

            <Button
              type="primary"
              onClick={handleUpdateProfile}
              style={{ width: '100%', height: '40px' }}
            >
              {loading ? <Spin indicator={loadingIcon} /> : 'Save Changes'}
            </Button>
          </Tabs.TabPane>

          {/* Tab Change Password */}
          <Tabs.TabPane tab="Change Password" key="2">
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold' }}>Current Password</label>
              <Input.Password
                allowClear
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                style={{ height: '40px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold' }}>New Password</label>
              <Input.Password
                allowClear
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                style={{ height: '40px' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 'bold' }}>Confirm New Password</label>
              <Input.Password
                allowClear
                name="confirmNewPassword"
                value={passwords.confirmNewPassword}
                onChange={handlePasswordChange}
                style={{ height: '40px' }}
              />
            </div>

            <Button
              type="primary"
              onClick={handleChangePassword}
              style={{ width: '100%', height: '40px' }}
            >
              {passwordLoading ? (
                <Spin indicator={loadingIcon} />
              ) : (
                'Change Password'
              )}
            </Button>
          </Tabs.TabPane>
        </Tabs>
      </CustomCard>
    </Box>
  );
}
