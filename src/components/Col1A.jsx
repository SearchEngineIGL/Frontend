import React from "react";

function Col1({ fullName, setFullName, email, setEmail, password, setPassword }) {
  return (
    <div className="col1 flex flex-auto flex-col sm:space-y-3 space-y-1 ">

      <h2 className="text-lg text-person-col  ">Full Name</h2>
      <div className="w-[100%] ">
        <input
          className="bg-page-col outline-none text-item-col sm:h-11 h-7 w-[100%] rounded-md pl-3"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Abla RABIA"
        />
      </div>
      <h2 className="text-lg text-person-col ">Email</h2>
      <div className="w-[100%]">
        <input
          className="bg-page-col outline-none text-item-col sm:h-11 h-7 w-[100%] rounded-md pl-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="la_rabia@esi.dz"
        />
      </div>
      <h2 className="text-lg text-person-col ">Password</h2>
      <div className="w-[100%]">
        <input
          className="bg-page-col outline-none text-item-col sm:h-11 h-7 w-[100%] rounded-md pl-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*******************"
        />
      </div>
    </div>
  );
}

export default Col1;