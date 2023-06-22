import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

const OPEN_AI_API_KEY = process.env.OPENAI_API_KEY;
const PAPAGO_CLIENT_ID = process.env.PAPAGO_CLIENT_ID;
const PAPAGO_CLIENT_SECRET = process.env.PAPAGO_CLIENT_SECRET;

const configuration = new Configuration({
  organization: "org-jvHSazNhrIUzqimexuzjkTO2",
  apiKey: OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  // const response = await openai.listEngines();

  const body = await request.json();
  const { text } = body;

  // 한 => 영
  const res = await axios({
    url: "https://openapi.naver.com/v1/papago/n2mt",
    method: "POST",
    headers: {
      "X-Naver-Client-Id": PAPAGO_CLIENT_ID,
      "X-Naver-Client-Secret": PAPAGO_CLIENT_SECRET,
    },
    data: {
      source: "ko",
      target: "en",
      text: text,
    },
  });

  const {
    message: { result },
  } = res.data;

  // chatGPT
  const params = {
    prompt: result.translatedText,
    model: "text-davinci-003",
    max_tokens: 10,
    temperature: 0,
  };

  const response = await axios({
    url: "https://api.openai.com/v1/completions",
    headers: {
      Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      ...params,
    },
    method: "POST",
  });

  const { choices } = response.data;

  // 영 => 한
  const answer = await axios({
    url: "https://openapi.naver.com/v1/papago/n2mt",
    method: "POST",
    headers: {
      "X-Naver-Client-Id": PAPAGO_CLIENT_ID,
      "X-Naver-Client-Secret": PAPAGO_CLIENT_SECRET,
    },
    data: {
      source: "en",
      target: "ko",
      text: choices[0].text,
    },
  });

  return NextResponse.json({ data: answer.data });
}
