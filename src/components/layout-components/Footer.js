/** @jsxImportSource @emotion/react */
import React from 'react'
import { APP_NAME } from 'configs/AppConfig';
import { css } from '@emotion/react';
import { TEMPLATE, MEDIA_QUERIES, DARK_MODE, BORDER } from 'constants/ThemeConstant'
import { useSelector } from 'react-redux';

export default function Footer() {

	const currentTheme = useSelector(state => state.theme.currentTheme)

	return 
}

