import React from 'react';
import { Checkbox } from '@mui/material';

export const data: any = [
  {
    id: 1,
    Name: 'Logitech Mouse',
    AssetType: 'Hardware',
    Location: '---',
    UsedBy: '---',
    Department: '---',
    Impact: 'Low',
  },
  {
    id: 2,
    Name: 'Dell Monitor',
    AssetType: 'Hardware',
    Location: '---',
    UsedBy: '---',
    Department: '---',
    Impact: 'Low',
  },
  {
    id: 3,
    Name: 'Andrea’s Laptop',
    AssetType: `Hardware`,
    Location: '---',
    UsedBy: 'Andrea',
    Department: '---',
    Impact: 'Medium',
  },
];
export const columns = (
  meetingsData: any,
  setMeetingsData: any,
  meetingsMainData: any,
): any => [
  {
    accessorFn: (row: any) => row.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        checked={
          !!meetingsData.find((item: any) => item.id === info.getValue())
        }
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([
                ...meetingsData,
                meetingsMainData.find(
                  (item: any) => item.id === info.getValue(),
                ),
              ])
            : setMeetingsData(
                meetingsData.filter((item: any) => {
                  return item.id !== info.getValue();
                }),
              );
        }}
        color="primary"
        name={info.getValue()}
      />
    ),
    header: (
      <Checkbox
        checked={meetingsData.length === meetingsMainData.length}
        onChange={(e: any) => {
          e.target.checked
            ? setMeetingsData([...meetingsMainData])
            : setMeetingsData([]);
        }}
        color="primary"
        name="id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Name,
    id: 'Name',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Name
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#0AADC7',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.AssetType,
    id: 'AssetType',
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Asset Type
      </span>
    ),
    isSortable: true,
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Location,
    id: 'Location',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Location
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.UsedBy,
    id: 'UsedBy',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Used By
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Department,
    id: 'Department',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Department
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorFn: (row: any) => row.Impact,
    id: 'Impact',
    isSortable: true,
    header: (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 800,
          fontSize: '14px',
          color: '#1F305D',
        }}
      >
        Impact
      </span>
    ),
    cell: (info: any) => (
      <span
        style={{
          lineHeight: '18px',
          fontWeight: 500,
          fontSize: '14px',
          color: '#6B7280',
        }}
      >
        {info.getValue()}
      </span>
    ),
  },
];
