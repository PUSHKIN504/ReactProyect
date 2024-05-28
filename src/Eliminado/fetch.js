import React, { useState } from 'react';
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import userData from "assets/data/user-list.data.json";
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState(userData);
 
  const deleteRate = RateId => {
    fetch(`https://api.themoviedb.org/3/tv/${RateId}/rating`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmYwNGM4MzgzZGFiZGM5NTM5ZDE0ZWFjYWZkMTZiNyIsInN1YiI6IjY2NTU1NjFiMjc4NmEyMWIyM2JiOGEyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fxGldvIYBvyD9ha7Mqz9Ct7CTEpih3zPnCwrIsATT6o`,
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("RESPUESTA: " + JSON.stringify(data, null, 2));
      setUsers(users.filter(item => item.id !== RateId));
      message.success({ content: `Rating Eliminado Correctamente`, duration: 5 });
    })
    .catch(error => {
      console.log("ERROR: " + error);
      message.error({ content: `Error deleting Rating ${RateId}`, duration: 5 });
    });
  }

 

  const tableColumns = [
    {
      title: <div className='text-center'>Ratings</div>,
      dataIndex: 'name',
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus src={record.img} name={record.name} subTitle={record.email}/>
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: <div className='text-center'>Rol</div>,
      dataIndex: 'role',
      sorter: {
        compare: (a, b) => a.role.length - b.role.length,
      },
    },
    {
      title: <div className='text-center'>Ultima conexion</div>,
      dataIndex: 'lastOnline',
      render: date => (
        <div className="text-right d-flex justify-content-center">
          <span>{dayjs.unix(date).format("MM/DD/YYYY")} </span>
        </div>
      ),
      sorter: (a, b) => dayjs(a.lastOnline).unix() - dayjs(b.lastOnline).unix()
    },
    {
      title: <div className='text-center'>Estado</div>,
      dataIndex: 'status',
      render: status => (
        <div className="text-right d-flex justify-content-center">
          <Tag className ="text-capitalize" color={status === 'active'? 'cyan' : 'red'}>{status}</Tag>
        </div>
      ),
      sorter: {
        compare: (a, b) => a.status.length - b.status.length,
      },
    },
    {
      title: <div className='text-center'>Acciones</div>,
      dataIndex: 'actions',
      render: (_, elm) => (
        <div className="text-right d-flex justify-content-center">
          <Tooltip title="Delete">
            <Button danger icon={<DeleteOutlined />} onClick={()=> {deleteRate(elm.id)}} size="small"/>
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <Card bodyStyle={{'padding': '0px'}}>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={users} rowKey='id' />
      </div>
    </Card>
  );
}

export default UserList;
