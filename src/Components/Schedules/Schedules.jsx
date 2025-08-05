import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Search, Print, CalendarToday, AddCircleOutline } from '@mui/icons-material';
import { FiSearch } from "react-icons/fi";
import { AiOutlinePrinter, AiOutlinePlusCircle } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { FiEdit2, FiUsers } from "react-icons/fi";
import { NavLink } from 'react-router-dom';

const schedules = [
  {
    id: 1,
    name: 'Default Schedule',
    type: 'MOSLASHUVCHAN',
    startDate: 'Dushanba 28.07.2025',
    days: 7,
    breakTime: '-',
    vacation: '-',
    employees: 2,
  },
];

export default function Schedules() {
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="Container">
    <div className="bg-white pb-6">
      <div className="flex items-center justify-between px-8 pt-8 pb-4">
        <h1 className="text-xl font-semibold">Ish jadvallari</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Qidiruv"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-100 w-52"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddCircleOutline />}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500, px: 2, py: 1 }}
          >
            Qo'shish
          </Button>
          <IconButton sx={{ border: '1px solid #e0e0e0', bgcolor: '#fff', ml: 1 }}>
            <AiOutlinePrinter className="text-green-500" size={20} />
          </IconButton>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white mx-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f7f7f7] text-[#757575]">
              <th className="font-medium px-6 py-4 text-left border-0">
                <div className="flex items-center gap-1">
                  Ish jadvali
                  <span className="text-[#bdbdbd] text-base ml-1"><svg 
                  xmlns="http://www.w3.org/2000/svg" width="24" 
                  height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path 
                  fill="currentColor" d="M6.293 6.293a1 1 0 0 1 1.414 0L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414m0 6a1 1 0 0 1 1.414 0L12 16.586l4.293-4.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414"/></g></svg></span>
                </div>
              </th>
              <th className="font-medium px-6 py-4 text-left border-0">
                <div className="flex items-center gap-1">
                  Ish jadvali turi
                  <span className="text-[#bdbdbd] text-base ml-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" 
                  fill-rule="evenodd"><path 
                  d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M6.293 6.293a1 1 0 0 1 1.414 0L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414m0 6a1 1 0 0 1 1.414 0L12 16.586l4.293-4.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414"/></g></svg></span>
                </div>
              </th>
              <th className="font-medium px-6 py-4 text-left border-0">Boshlanishi va oxiri</th>
              <th className="font-medium px-6 py-4 text-left border-0">Soatlar me'yori</th>
              <th className="font-medium px-6 py-4 text-left border-0">Tungi vaqt</th>
              <th className="font-medium px-6 py-4 text-left border-0">Tushlik</th>
              <th className="font-medium px-6 py-4 text-left border-0">Xodimlar</th>
              <th className="px-6 py-4 border-0"></th> 
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => (
              <tr
                key={schedule.id}
                className={`transition-all duration-200 ${
                  hoveredId === schedule.id ? "bg-[#fafaf0]" : ""
                }`}
                onMouseEnter={() => setHoveredId(schedule.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <td className="px-6 py-4 border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 bg-white text-green-500 text-2xl">
                      <BsCalendar2Date />
                    </span>
                    <NavLink to={`/schedules/${schedule.id}`}>
                    <span className="font-medium text-gray-900">{schedule.name}</span>
                    </NavLink>
                  </div>
                </td>
                <td className="px-6 py-4 border-0">
                  <span className="inline-block bg-[#f5f5f5] text-[] font-medium rounded px-3 py-1 text-xs border border-gray-300">
                    {schedule.type}
                  </span>
                </td>
                <td className="px-6 py-4 border-0">
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium text-[#424242]">{schedule.startDate.split(" ")[0]}</span>
                    <span className="text-[#424242] text-xs">{schedule.startDate.split(" ")[1]}</span>
                  </div>
                </td>
                <td className="px-6 py-4 border-0">
                  <span className="text-[#424242]">Kun : {schedule.days}</span>
                </td>
                <td className="px-6 py-4 border-0">{schedule.breakTime}</td>
                <td className="px-6 py-4 border-0">{schedule.vacation}</td>
                <td className="px-6 py-4 border-0">
                  <span className="text-green-500 font-medium cursor-pointer">{schedule.employees}</span>
                </td>
                <td className="px-6 py-4 border-0">
                  {hoveredId === schedule.id && (
                    <div className="flex gap-2">
                      <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition">
                        <FiEdit2 className="text-green-400" size={22} />
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition">
                        <FiUsers className="text-green-400" size={22} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-start px-8">
        <span className="text-[#bdbdbd] text-sm">Elementlar soni 1-1 jami 1</span>
      </div>
    </div>
    </div>
  );
}