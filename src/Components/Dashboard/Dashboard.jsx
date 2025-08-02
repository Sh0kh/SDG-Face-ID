import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@material-tailwind/react";

const data = [
  { name: "Done", value: 70 },
  { name: "Remaining", value: 30 },
];

const COLORS = ["#4CAF50", "#E0E0E0"]; // зелёный и серый

export default function Dashboard() {
  return (
    <>
      <div className="Container">
        <div className="flex items-start gap-[30px] w-full ">
          <div className="w-[23%]">
            <Card className="pt-2 mb-4 rounded-none border-t-4 border-t-MainColor">
              <div className="flex items-center justify-center gap-[30px]">
                <h2 className="text-[50px]">2</h2>
                <div className="flex items-start flex-col">
                  <p>Avgust 2025 ,</p>
                  <span className="opacity-70 text-xs">Shanba</span>
                </div>
              </div>
              <div className="w-full h-[2px] bg-[#E8E8E8]">

              </div>

              {/* 👇 Круглый Pie Chart */}
              <div className="relative   mt-[40px] mb-[50px]  w-full h-[200px] flex justify-center items-center">
                <ResponsiveContainer className={`border-[2px] rounded-full`} width={250} height={250}>
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={58}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Центр цифры */}
                <div className="absolute text-center border-[2px] border-[#E8E8E8] px-[30px] py-[10px] rounded-full ">
                  <p className="text-[50px] h-[55px]">2</p>
                  <span className="opacity-70 text-xs">Xodim</span>

                </div>
              </div>

              <div className="flex items-end justify-between">
                <button className="border-t-[5px] border-r-[2px] pb-[10px] border-[#E8E8E8] border-t-MainColor w-full flex items-center flex-col justify-center ">
                  <h3 className="text-[30px] h-[40px]">
                    0
                  </h3>
                  <span className="opacity-70 text-xs">Ishga keldi</span>
                </button>

                <button className="border-t-[5px] border-r-[2px] pb-[10px] border-[#E8E8E8] border-t-MainColor w-full flex items-center flex-col justify-center ">
                  <h3 className="text-[30px] h-[40px]">
                    2
                  </h3>
                  <span className="opacity-70 text-xs">Ishga keldi</span>
                </button>
                <button className="border-t-[5px] border-r-[2px] pb-[10px] border-[#E8E8E8] border-t-MainColor w-full flex items-center flex-col justify-center ">
                  <h3 className="text-[30px] h-[40px]">
                    0
                  </h3>
                  <span className="opacity-70 text-xs">Ishga keldi</span>
                </button>

              </div>

            </Card>
            <Card className="py-3 mb-4 rounded-[5px]">
              <div className="flex px-2 border-b-[1px] border-b-[#E8E8E8] pb-[10px] items-center justify-between">
                <h2>
                  Qurilmalar
                </h2>
                <button className="border-[#E8E8E8] border-[2px] text-[15px] text-[#a1a1a1] px-[15px] py-[2px] rounded">
                  Barcha Qurilmalar
                </button>
              </div>
              <div className="flex items-center justify-center h-[200px]">
                <h2>
                  Qurilmalar yo'q
                </h2>
              </div>
            </Card>
            <Card className="py-3 mb-4 rounded-[5px]">
              <div className="flex px-2 border-b-[1px] border-b-[#E8E8E8] pb-[10px] items-center justify-between">
                <h2>
                  Bayramlar
                </h2>
                <button className="border-[#E8E8E8] border-[2px] text-[15px] text-[#a1a1a1] px-[15px] py-[2px] rounded">
                  Barcha Qurilmalar
                </button>
              </div>
              <div className="flex items-center justify-center h-[300px]">
                <div>
                  <img className="mx-auto " src="https://online.workly.uz/images/calendar_vacation.png" alt="Foto" />
                  <h2 className="text-center mt-[20px]">
                    Here you can see the holidays and employee birthdays
                  </h2>
                </div>
              </div>
            </Card>
          </div>
          <div className="w-[77%]">
            <Card className="pt-2 mb-4 rounded-[5px]">
              <div className="flex items-center justify-between border-b-[2px] border-b-[#E8E8E8] pb-[10px] px-5">
                <h2 className="text-[16px]">Bugun Soft milk XK kompaniyasida nima sodir bo‘lmoqda :</h2>
                <button className="border-[#E8E8E8] border-[2px]  text-MainColor px-[15px] py-[2px] rounded">
                  +
                </button>
              </div>
              <div className="flex items-center justify-center">
                <img src="https://online.workly.uz/images/tmp/employee-activity-uz.png" alt="Foto" />
              </div>
              <div className="flex items-center justify-center w-full py-[20px] border-t-[2px] border-t-[#E8E8E8]">
                <p className="text-[black] text-[18px]"> Ushbu shaklda siz xodimlarning tashriflari haqidagi ma'lumotlarni ko'rasiz
                </p>
              </div>
            </Card>
            <Card className="pt-2 mb-4 rounded-[5px]">
              <div className="flex items-center justify-between border-b-[2px] border-b-[#E8E8E8] pb-[10px] px-5">
                <h2 className="text-[16px]">Kunlar bo‘yicha tashriflar statistikasi:</h2>
              </div>
              <div className="flex items-center justify-center">
                <img src="https://online.workly.uz/images/tmp/employee-report-uz.png" alt="Foto" />
              </div>
              <div className="flex items-center justify-center mt-[30px] w-full py-[20px] border-t-[2px] border-t-[#E8E8E8]">
                <p className="text-[black] text-[18px]">  Bu xodimlarning kunlik tashriflarining demo statistikasi.

                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
