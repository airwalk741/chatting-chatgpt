"use client";
import React, { useEffect, useState } from "react";
import ChatInput from "@/components/ChatInput";
import ChatTextList from "@/components/ChatTextList";

type PropsType = {};

export default function ChatContainer({}: PropsType) {
  const [myText, setMyText] = useState([""]);
  const [answer, setAnswer] = useState([""]);

  useEffect(() => {
    const html = document.querySelector("html") as HTMLElement;
    html.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [myText, answer]);

  return (
    <div className='flex flex-col w-full max-w-[900px] border-gray-300 border-2  shadow-2xl min-h-[500px] py-10  px-3 md:p-10 rounded-lg'>
      <div className='grow mb-2'>
        <ChatTextList
          myText={myText.filter((item) => item)}
          answer={answer.filter((item) => item)}
        />
      </div>
      <ChatInput setMyText={setMyText} setAnswer={setAnswer} />
    </div>
  );
}
