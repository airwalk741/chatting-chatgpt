import React from "react";
import Image from "next/image";
import { BeatLoader } from "react-spinners";

type PropsType = {
  myText: string[];
  answer: string[];
};

export default function ChatTextList({ myText, answer }: PropsType) {
  return (
    <div>
      {myText.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div className='flex items-center justify-end mb-5 max-w-[95%] '>
              <div className='me-4 min-w-[25%] shadow-lg p-2 px-3 border-gray-200 border-2 rounded-lg '>
                <h1 className='text-gray-500 text-xs font-bold md:text-sm'>
                  {item}
                </h1>
              </div>
              <div>
                <Image
                  src={"/image/user.png"}
                  alt='test'
                  width={30}
                  height={10}
                />
              </div>
            </div>

            {answer[index] ? (
              <div className='flex items-center max-w-[95%] mb-5'>
                <div>
                  <Image
                    src={"/image/ChatGPT_logo.png"}
                    alt='test'
                    width={30}
                    height={10}
                  />
                </div>
                <div className='ms-4 min-w-[25%]  shadow-lg p-2 px-3 border-gray-200 border-2 rounded-lg'>
                  <h1 className='text-gray-500 text-xs md:text-sm font-bold'>
                    {answer[index]}
                  </h1>
                </div>
              </div>
            ) : (
              <div className='flex items-center mb-5'>
                <div>
                  <Image
                    src={"/image/ChatGPT_logo.png"}
                    alt='test'
                    width={30}
                    height={10}
                  />
                </div>
                <div className='ms-4 min-w-[25%] flex items-center  p-2 px-3 h-[45px] '>
                  <BeatLoader color='#848787' />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
