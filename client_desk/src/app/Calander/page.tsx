'use client'
import React, { use } from 'react';
import './page.module.css'
import type { Dayjs } from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';



const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'Work', content: 'This is warning event.' },
        { type: 'Events', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'Work', content: 'This is warning event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'error', content: 'This is error event 1.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 100;
  }
};

const Calander: React.FC = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="size">
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };
  return  <Calendar cellRender={cellRender} />;
};

export default Calander;