"use client"; 
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {

  const [roomId, setRoomId] = useState("");
  const router = useRouter()

  return (
    <div className={"bg-neutral-700 w-screen h-screen flex justify-center iteams-center"}>
      <div className="flex justify-center items-center">
        <input className="p-4 border-2 rounded-md" value={roomId} onChange={(e) => {
        setRoomId(e.target.value)
      }} type="text" placeholder="Roomid"></input>
      <button 
        className="p-4 border-2 rounded-md" 
        onClick={() => {
          router.push(`/room/${roomId}`)
        }}>
          Join Room
      </button>
      </div>
    </div>
  );
}
