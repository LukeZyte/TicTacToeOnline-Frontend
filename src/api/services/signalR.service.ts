import * as signalR from "@microsoft/signalr";
import type { HubConnection } from "@microsoft/signalr";
import { getLocalStorageToken } from "../../utils/auth";

let connection: HubConnection | null = null;

export const connectToHub = async () => {
  const token = getLocalStorageToken();
  if (!token) {
    console.error("No token found");
    return;
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7117/BoardHub", {
      accessTokenFactory: async () => {
        return token ?? "";
      },
      transport: signalR.HttpTransportType.WebSockets,
    })

    .configureLogging(signalR.LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  console.log("token:", getLocalStorageToken());
  if (!connection) {
    console.error("Failed to create SignalR connection");
    return;
  }

  connection.on("MoveMade", (cellIndex, symbol, nextPlayerIndex) => {
    console.log("Move:", cellIndex, symbol, nextPlayerIndex);
  });

  connection.on("GameOver", (winner, finalBoard) => {
    console.log("Game over. Winner is:", winner);
    console.log("Board:", finalBoard);
  });

  connection.on("PlayerJoined", (response) => {
    const [userId, username] = response.split(":");
    console.log(`Player '${username}' (with id: ${userId}) joined the game.`);
  });

  connection.on("PlayerLeft", (login) => {
    console.log(`Player ${login} left the game.`);
  });

  await connection.start();
  console.log("Connected to Hub");
};

export const createBoard = async () => {
  return await connection?.invoke("CreateBoard");
};

export const joinBoard = async (boardCode: string) => {
  return await connection?.invoke("JoinBoard", boardCode);
};

export const makeMove = async (boardCode: string, cellIndex: number) => {
  return await connection?.invoke("MakeMove", boardCode, cellIndex);
};

export const leaveBoard = async (boardCode: string) => {
  return await connection?.invoke("LeaveBoard", boardCode);
};
