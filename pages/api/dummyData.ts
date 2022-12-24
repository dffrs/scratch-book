import type { NextApiRequest, NextApiResponse } from "next";
export type RandomObj = {
  number: number;
};

export type Data = { arrayToRender: Array<RandomObj> };
export default function dummyData(req: NextApiRequest, res: NextApiResponse<Data>) {
  const arrayToRender: Array<RandomObj> = new Array(20).fill(null).map((_, index) => ({ number: index }));
  res.status(200).json({ arrayToRender });
}
