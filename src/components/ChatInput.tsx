"use client";

import { REQ_PORT } from "@/service/helper";
import React, { KeyboardEvent, ChangeEvent, useRef, useState } from "react";

type PropsType = {
  setMyText: React.Dispatch<React.SetStateAction<string[]>>;
  setAnswer: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ChatInput({ setMyText, setAnswer }: PropsType) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const inputText = async () => {
    if (!text || !inputRef.current) {
      return;
    }
    setMyText((pre) => [...pre, text]);
    setText("");

    inputRef.current.disabled = true;

    const res = await REQ_PORT("/api", { text });

    const {
      message: { result },
    } = res.data;
    const { translatedText } = result;

    setAnswer((pre) => [...pre, translatedText]);
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputText(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <div className='flex items-center mt-3 '>
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        type='text'
        className=' text-xs md:text-sm font-bold me-3 px-3 py-2 text-gray-500 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
        onKeyUp={handleOnKeyPress}
      />
      <button
        onClick={inputText}
        className='text-xs md:text-sm font-bold rounded-lg p-2 px-3 bg-green-200 hover:bg-green-300 sm:text-sm text-gray-500 hover:text-gray-600'
      >
        Chat
      </button>
    </div>
  );
}
