import React from "react";

function Details() {
  const details = [
    {
      icon: (
        <img
                src="     https://cdn-icons-png.flaticon.com/512/4904/4904233.png  "
                alt="Logo"
                className="h-8 w-8"
              />
      ),
      number: "100+",
      name: "Images Shared",
    },
    {
      icon: (
     
         <img
                src="     https://cdn-icons-png.flaticon.com/512/1077/1077012.png "
                alt="Logo"
                className="h-8 w-8"
              />
      ),
      number: "50+",
      name: "Active Users",
    },
    {
      icon: (
      <img
                src="      https://cdn-icons-png.flaticon.com/512/17429/17429619.png  "
                alt="Logo"
                className="h-8 w-8"
              />
      ),
      number: "500mb",
      name: "Storage Saved",
    },
  ];

  return (
 
      <div className="max-w-4xl mt-20  mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {details.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-gray-200 flex items-center space-x-3 transition-transform hover:translate-y-[-2px]"
            >
              <div className="p-2">{item.icon}</div>
              <div>
                <h3 className="text-xl font-medium text-gray-800">{item.number}</h3>
                <p className="text-gray-500 text-sm">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
 
  );
}

export default Details;
