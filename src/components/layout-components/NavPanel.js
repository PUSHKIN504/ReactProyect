import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import NavItem from './NavItem';
import ThemeConfigurator from './ThemeConfigurator';
import { DIR_RTL } from 'constants/ThemeConstant';

export const NavPanel = ({ direction, mode }) => {

	const [open, setOpen] = useState(false);

  	const showDrawer = () => {
		setOpen(true);
	};

  	const onClose = () => {
		setOpen(false);
	};
	
	return
}

export default NavPanel;