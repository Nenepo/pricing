import { useState } from "react";
import {
  DollarSign,
  Heart,
  Zap,
  Clock,
  RotateCw,
  Figma,
  LayoutTemplate,
} from "lucide-react";

const optionsData = [
  {
    id: "good",
    label: "Good",
    description: "Top-notch custom design",
    icon: <Heart width={16} height={16} className="" />,
  },
  {
    id: "fast",
    label: "Fast",
    description: "Delivered in days, not weeks",
    icon: <Zap width={16} height={16} className="" />,
  },
  {
    id: "cheap",
    label: "Cheap",
    description: "Tiny budget solution",
    icon: <DollarSign width={16} height={16} className="" />,
  },
];

const pricingInfo = {
  "cheap+good": {
    label: "Good & Cheap",
    price: "€2,500",
    urgency: "Not Urgent",
    tagClass: "bg-orange-100 text-orange-600",
    time: "Avg. 4 weeks turnaround",
    features: [
      { text: "Up to 2 revision rounds", icon: RotateCw },
      { text: "Figma design & interactive prototype", icon: Figma },
      { text: "Framer development", icon: LayoutTemplate },
    ],
  },
  "cheap+fast": {
    label: "Fast & Cheap",
    price: "€1,000",
    urgency: "Validate an idea",
    tagClass: "bg-orange-100 text-orange-600",
    time: "Avg. 5 days turnaround",
    features: [
      { text: "1 revision round", icon: RotateCw },
      { text: "~Figma design & interactive prototype", icon: Figma },
      { text: "Framer template customization", icon: LayoutTemplate },
    ],
  },
  "fast+good": {
    label: "Good & Fast",
    price: "€3,500",
    urgency: "Best Value",
    tagClass: "bg-red-100 text-red-600",
    time: "Avg. 1–2 weeks turnaround",
    features: [
      { text: "Up to 5 revision rounds", icon: RotateCw },
      { text: "Figma design & interactive prototype", icon: Figma },
      { text: "Framer development", icon: LayoutTemplate },
    ],
  },
};

function App() {
  const [selected, setSelected] = useState(["good", "cheap"]);

  const toggleOption = (id) => {
    setSelected((prev) => {
      const isSelected = prev.includes(id);

      // Case 1: Clicking a selected option (swap with unselected)
      if (isSelected) {
        // Find which option is NOT selected (the one to swap with)
        const unselectedId = optionsData.find(
          (option) => !prev.includes(option.id)
        )?.id;

        // Swap them (deselect current, select the unselected one)
        return prev
          .filter((item) => item !== id)
          .concat(unselectedId ? [unselectedId] : []);
      }

      // Case 2: Clicking an unselected option (replace oldest selected)
      else {
        // With exactly 2 selected, replace the oldest
        if (prev.length >= 2) {
          return [prev[1], id]; // Keep newest, add clicked
        }
        // With <2 selected, just add it
        return [...prev, id];
      }
    });
  };

  const key = selected.sort().join("+");
  const current = pricingInfo[key];

  return (
    <div className="w-full  flex justify-center items-center flex-col py-[40px]">
      <div className="w-[160px] rounded-2xl bg-amber-700/15 text-center py-1 text-xs font-semibold text-orange-600 ">
        Simple & Flexible Pricing
      </div>

      <h1 className="text-4xl font-semibold mt-4 ">
        Good, fast, cheap.
        <span className=" font-normal libre"> Pick two</span>
      </h1>
      <p className=" text-base  text-gray-500 mt-2">
        Landing page pricing to fit{" "}
        <span className="font-normal text-orange-600 libre">your</span> needs
        and priorities
      </p>

      <div className="flex flex-col md:flex-row gap-6  mt-6 h-full">
        {/* Options */}
        <div className="flex flex-col justify-center">
          <h2 className="text-base font-semibold leading-4">
            Choose what works for you
          </h2>
          <p className="text-xs  text-gray-500 font-semibold">
            You can only pick 2 options
          </p>
          <div className="flex flex-col gap-4 mt-6">
            {optionsData.map((option) => (
              <div
                key={option.id}
                className={`flex items-center justify-between cursor-pointer transition hover:bg-gray-50 p-2 rounded-md w-[300px] ${
                  selected.includes(option.id) ? "" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-[32px] h-[32px] flex items-center justify-center  rounded-full transition-colors duration-500 ease-in-out ${
                      selected.includes(option.id)
                        ? "bg-amber-700/15 text-orange-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <h3 className="font-medium leading-2 text-sm">
                      {option.label}
                    </h3>
                    <p className="text-xs text-gray-500 font-normal">
                      {option.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`w-7 h-4 rounded-lg p-[2px] flex items-center relative ${
                    selected.includes(option.id)
                      ? "bg-orange-600"
                      : "bg-gray-300"
                  }`}
                  onClick={() => toggleOption(option.id)}
                >
                  <div
                    className={`rounded-full bg-white w-3 h-3 absolute left-0.5 transition-transform duration-500 ease-in-out ${
                      selected.includes(option.id)
                        ? "translate-x-[12px]"
                        : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="shadow shadow-gray-300 w-[300px]  rounded-xl ">
          {current && (
            <div className="bg-white p-4 flex flex-col gap-4 ">
              <div className="flex justify-between items-center ">
                <p className="text-xl font-normal libre">{current.label}</p>
                <p
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-700/15 text-orange-600`}
                >
                  {current.urgency}
                </p>
              </div>
              <p className="text-4xl font-bold ">{current.price}</p>
              <ul className="text-gray-800 gap-2 flex flex-col text-xs ">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  {current.time}
                </li>
                {current.features.map((feat, idx) => {
                  const isStrikethrough = feat.text.trimStart().startsWith("~");
                  const Icon = feat.icon;
                  return (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 ${
                        isStrikethrough ? "line-through text-gray-400" : ""
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4  ${
                          isStrikethrough
                            ? "line-through text-gray-400"
                            : "text-orange-600"
                        }`}
                      />
                      {feat.text.replace("~", "")}
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-col gap-2">
               <button
  className="w-full bg-orange-600 text-white py-2 rounded-2xl font-medium text-xs
             hover:opacity-90 hover:translate-y-[1px] active:translate-y-[2px]
             transition-all duration-200 ease-in-out
             shadow-[0_1px_1px_0_#c2410c] active:shadow-[0_2px_0_0_#c2410c]"
>
  Book a call
</button>

                <p className="text-center text-xs text-gray-500">
                  No payment required. Zero commitment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
