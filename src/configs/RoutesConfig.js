import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'login-1',
        path: `${AUTH_PREFIX_PATH}/login-1`,
        component: React.lazy(() => import('views/auth-views/authentication/login-1')),
    },
    {
        key: 'login-2',
        path: `${AUTH_PREFIX_PATH}/login-2`,
        component: React.lazy(() => import('views/auth-views/authentication/login-2')),
    },
    {
        key: 'register-1',
        path: `${AUTH_PREFIX_PATH}/register-1`,
        component: React.lazy(() => import('views/auth-views/authentication/register-1')),
    },
    {
        key: 'register-2',
        path: `${AUTH_PREFIX_PATH}/register-2`,
        component: React.lazy(() => import('views/auth-views/authentication/register-2')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    },
    {
        key: 'error-page-1',
        path: `${AUTH_PREFIX_PATH}/error-page-1`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-1')),
    },
    {
        key: 'error-page-2',
        path: `${AUTH_PREFIX_PATH}/error-page-2`,
        component: React.lazy(() => import('views/auth-views/errors/error-page-2')),
    },
]

export const protectedRoutes = [
    {
        key: 'apps.tarea1',
        path: `${APP_PREFIX_PATH}/components/data-display`,
        component: React.lazy(() => import('views/app-views/components/data-display')),
    },
    {
        key: 'apps.tarea1.axion',
        path: `${APP_PREFIX_PATH}/axion`,
        component: React.lazy(() => import('Eliminado/axion')),
    },
    {
        key: 'apps.tarea1.fetch',
        path: `${APP_PREFIX_PATH}/fetch`,
        component: React.lazy(() => import('Eliminado/fetch')),
    },


    {
        key: 'apps.tarea2',
        path: `${APP_PREFIX_PATH}/components/data-display`,
        component: React.lazy(() => import('views/app-views/components/data-display')),
    },
    {
        key: 'apps.tarea2.EstadoCivil',
        path: `${APP_PREFIX_PATH}/EstadoCivil`,
        component: React.lazy(() => import('Tarea2/EstadoCivil')),
    },
    {
        key: 'apps.tarea2.FormasPagos',
        path: `${APP_PREFIX_PATH}/FormaPago`,
        component: React.lazy(() => import('Tarea2/FormaPago')),
    },
    {
        key: 'apps.tarea2.SubCategoria',
        path: `${APP_PREFIX_PATH}/SubCategoria`,
        component: React.lazy(() => import('Tarea2/SubCategoria')),
    },


    {
        key: 'apps.tarea3',
        path: `${APP_PREFIX_PATH}/components/data-display`,
        component: React.lazy(() => import('views/app-views/components/data-display')),
    },
    {
        key: 'apps.tarea3.PersonaNatura',
        path: `${APP_PREFIX_PATH}/PersonaNatural`,
        component: React.lazy(() => import('Tarea3/PersonaNatural')),
    },
    {
        key: 'apps.tarea3.Duca',
        path: `${APP_PREFIX_PATH}/FormaPago`,
        component: React.lazy(() => import('Tarea2/FormaPago')),
    },











    {
        key: 'components.data-display',
        path: `${APP_PREFIX_PATH}/components/data-display`,
        component: React.lazy(() => import('views/app-views/components/data-display')),
    },
    {
        key: 'components.data-display.avatar',
        path: `${APP_PREFIX_PATH}/components/data-display/avatar`,
        component: React.lazy(() => import('views/app-views/components/data-display/avatar')),
    }
]