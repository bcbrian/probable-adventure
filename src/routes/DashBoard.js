/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useContext } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { UserContext } from "../firebase/auth";
import { useFirestore } from "../firebase/firestore";

import SignOut from "../components/SignOut";
import Button from "../components/Button";

// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

const RenderLineChart = ({ data }) => (
  <LineChart
    width={600}
    height={300}
    data={data}
    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
  >
    <Line type="monotone" dataKey="random" stroke="#663399" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="index" />
    <YAxis />
    <Tooltip />
  </LineChart>
);

export default function DashBoard() {
  const user = useContext(UserContext);

  const { documentSnapshots: dataDS, collectionRef: dataCF } = useFirestore(
    "data",
    {
      where: ["userId", "==", user.uid]
    }
  );

  return (
    <>
      <div
        css={css`
          position: fixed;
          top: 12px;
          right: 12px;
        `}
      >
        <SignOut />
      </div>

      <div
        css={css`
          margin: 120px auto;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        `}
      >
        {dataDS && (
          <RenderLineChart
            data={dataDS.map((docSnap, index) => ({
              index,
              ...docSnap.data()
            }))}
          />
        )}
        <Button
          onClick={() =>
            dataCF.add({
              random: Math.floor(Math.random() * 10) + 1,
              userId: user.uid
            })
          }
        >
          add data
        </Button>
      </div>
    </>
  );
}
