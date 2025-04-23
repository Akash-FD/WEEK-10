import React from "react";

export default function Card(props: any) {
  return (
    <>
      <div>
        <div className="card w-[280px] max-lg:w-[200px] max-md:w-[140px] drop-shadow-xl hover:scale-105 transition-all duration-200">
          <img src={props.image} alt="" className="object-contain" />
          <p className="my-2 max-lg:text-sm">{props.name}</p>
          <div className="flex justify-items-start items-center gap-4 ">
            <p className="line-through text-red-500">${props.old_price}</p>
            <p>${props.old_price}</p>
          </div>
        </div>
      </div>
    </>
  );
}
