


// export default function Card() {
//   const data = [
//     {
//       title: "Access & Flexibility",
//       line: "Access from anywhere",
//       desc: "Use from anywhere, anytime. Your files are always at your fingertips.",
//       image: "https://picsum.photos/seed/1/800/600?grayscale",
//     },
//     {
//       title: "Secure Sharing",
//       line: "Private & Safe",
//       desc: "Share files securely with time-based expiration links.",
//       image: "https://picsum.photos/seed/2/800/600?grayscale",
//     },
//     {
//       title: "Fast Downloads",
//       line: "One Click",
//       desc: "Download images instantly with optimized cloud delivery.",
//       image: "https://picsum.photos/seed/3/800/600?grayscale",
//     },
//     {
//       title: "Auto Expiry",
//       line: "Time controlled",
//       desc: "Links automatically expire to protect your privacy.",
//       image: "https://picsum.photos/seed/4/800/600?grayscale",
//     },
//   ];

//   return (
   


//   );
// }

// "use client";


// import { WobbleCard } from '../components/ui/wobble-card';

// export  default function WobbleCardDemo() {
//     const data = [
//     {
//       title: "Access & Flexibility",
//       line: "Access from anywhere",
//       desc: "Use from anywhere, anytime. Your files are always at your fingertips.",
//       image: "https://picsum.photos/seed/1/800/600?grayscale",
//     },
//     {
//       title: "Secure Sharing",
//       line: "Private & Safe",
//       desc: "Share files securely with time-based expiration links.",
//       image: "https://picsum.photos/seed/2/800/600?grayscale",
//     },
//     {
//       title: "Fast Downloads",
//       line: "One Click",
//       desc: "Download images instantly with optimized cloud delivery.",
//       image: "https://picsum.photos/seed/3/800/600?grayscale",
//     },
//     {
//       title: "Auto Expiry",
//       line: "Time controlled",
//       desc: "Links automatically expire to protect your privacy.",
//       image: "https://picsum.photos/seed/4/800/600?grayscale",
//     },
//   ];
//   return (
//     <div
//       className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
//       <WobbleCard
//         containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
//         className="">
//         <div className="max-w-xs">
//           <h2
//             className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
//             Gippity AI powers the entire universe
//           </h2>
//           <p className="mt-4 text-left  text-base/6 text-neutral-200">
//             With over 100,000 mothly active bot users, Gippity AI is the most
//             popular AI platform for developers.
//           </p>
//         </div>
//         <img
//           src="/linear.webp"
//           width={500}
//           height={500}
//           alt="linear demo image"
//           className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl" />
//       </WobbleCard>
//       <WobbleCard containerClassName="col-span-1 min-h-[300px]">
//         <h2
//           className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
//           No shirt, no shoes, no weapons.
//         </h2>
//         <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
//           If someone yells “stop!”, goes limp, or taps out, the fight is over.
//         </p>
//       </WobbleCard>
//       <WobbleCard
//         containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
//         <div className="max-w-sm">
//           <h2
//             className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
//             Signup for blazing-fast cutting-edge state of the art Gippity AI
//             wrapper today!
//           </h2>
//           <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
//             With over 100,000 mothly active bot users, Gippity AI is the most
//             popular AI platform for developers.
//           </p>
//         </div>
//         <img
//           src="/linear.webp"
//           width={500}
//           height={500}
//           alt="linear demo image"
//           className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl" />
//       </WobbleCard>
//     </div>
//   );
// }


"use client";

import { WobbleCard } from "../components/ui/wobble-card";

export default function WobbleCardDemo() {
const data = [
  {
    title: "Access & Flexibility",
    line: "Access from anywhere",
    desc: "Use from anywhere, anytime. Your files are always at your fingertips.",
    image: "https://picsum.photos/seed/1/800/600?grayscale",
    bg: "bg-[#FBF6F0]",
    text: "text-slate-900",
  },
  {
    title: "Secure Sharing",
    line: "Private & Safe",
    desc: "Share files securely with time-based expiration links.",
    image: "https://picsum.photos/seed/2/800/600?grayscale",
    bg: "bg-[#EFF8FF]",
    text: "text-slate-900",
  },
  {
    title: "Fast Downloads",
    line: "One Click",
    desc: "Download images instantly with optimized cloud delivery.",
    image: "https://picsum.photos/seed/3/800/600?grayscale",
    bg: "bg-[#F0FDF4]",
    text: "text-slate-900",
  },
  {
    title: "Auto Expiry",
    line: "Time controlled",
    desc: "Links automatically expire to protect your privacy.",
    image: "https://picsum.photos/seed/4/800/600?grayscale",
    bg: "bg-[#FEF2F2]",
    text: "text-slate-900",
  },
    {
    title: "Lightning Uploads",
    line: "Ultra Fast",
    desc: "Upload large files in seconds with optimized pipelines.",
    image: "   https://cdn-icons-png.flaticon.com/512/740/740845.png ",
    bg: "bg-[#F0FDFA]",
    text: "text-slate-900",
  },
  {
  title: "100% Free Service",
  line: "No Cost • No Limits",
  desc: "Enjoy all features completely free. No subscriptions, no hidden fees, no credit card required.",
  image: "https://picsum.photos/seed/free/800/600",
  bg: "bg-[#F1FFF6]",
  text: "text-slate-900",
}

];

return (
    <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
      {data.map((item, index) => (
        <WobbleCard
          key={index}
          containerClassName={`relative min-h-[320px] ${item.bg}`}
        >
          <div className={`relative z-10 max-w-sm ${item.text}`}>
            <span className="text-sm opacity-70">
              {item.line}
            </span>

            <h2 className="mt-2 text-xl lg:text-2xl font-semibold">
              {item.title}
            </h2>

            <p className="mt-3 text-sm opacity-80">
              {item.desc}
            </p>
          </div>

         
        </WobbleCard>
      ))}
    </div>
  );
}
